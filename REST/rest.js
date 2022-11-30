const { Agent } = require("node:https");
const FormData = require("form-data");
const fetch = require("node-fetch");
const DiscordAPIError = require("../Errors/DiscordAPIError");
const { EventTypes } = require("../Util/Constants");
const collection = new (require("../Util/Collection"));
const { setTimeout: wait } = require("timers/promises")
class REST {
    constructor(client) {
        this.client = client
        this.ratelimitBucket = null
    }

    setToken(token) {
        this.token = token
        return this;
    }

    async _make(url, options = {}) {
        const agent = new Agent({ keepAlive: true })
        const controller = new AbortController()
        let timeout = setTimeout(() => controller.abort(), this.client?.restRequestTimeout ?? 5000).unref()
        let headers = {
            authorization: `Bot ${this.client?.token ?? this.token}`
        }

        if(options.tokenType) headers["authorization"] = `${options.tokenType} ${options.authorization}`
        if(typeof options["reason"] === "string") headers["X-Audit-Log-Reason"] = options["reason"]
        let body
        const oldURL = url
        if(options.body) {
            let form = new FormData()
            if(Array.isArray(options.body.files) && options.body.files?.length) {
                let attachment
                for(const [index, value] of options.body.files.entries()) {
                    if("data" in options.body.data) attachment = options.body.data.data?.attachments
                    else attachment = options.body.data?.attachments ?? options.body.data?.message.attachments
                    attachment.push({
                        id: index,
                        filename: value.filename,
                        description: value.description
                    })

                    form.append(`files[${index}]`, value.buffer, value.filename)
                }
                form.append("payload_json", JSON.stringify(options.body.data))
                body = form
            } else {
                if(options.body.data?.type === "sticker") {
                    delete options.body.data["type"]
                    for(const [key, val] of Object.entries(options.body.data)) {
                        if(!val) continue;
                        form.append(key, val)
                    }
    
                    form.append(`file`, options.body.files?.buffer, options.body.files?.filename)
                    body = form
                } else {
                    if("data" in options.body) body = typeof options.body.data === "string" ? options.body.data : JSON.stringify(options.body.data)
                    else body = typeof options.body === "string" ? options.body : JSON.stringify(options.body)
                }
            }
            if(body instanceof FormData || body.constructor?.name === "FormData") headers = Object.assign(headers, form.getHeaders())
            else headers["content-type"] = "application/json"
        }

        if(options.query) {
            const urlSearchParams = new URLSearchParams()
            for(const [key, val] of Object.entries(options.query)) { 
                if(!val) continue;
                if(Array.isArray(val)) urlSearchParams.append(key, val.join(","))
                else urlSearchParams.append(key, val)
            }

            if([...urlSearchParams.values()].length > 0) url = url.concat(`?${decodeURIComponent(urlSearchParams)}`)
        }

        if("auth" in options) {
            delete headers["authorization"]
            const params = new URLSearchParams()
            for(const [key, val] of Object.entries(options.auth)) {
                if(!val) continue;
                params.append(key, val)
            }

            headers["content-type"] = "application/x-www-form-urlencoded"
            
            body = params.toString()
        }

        if(typeof options["contentType"] === "string") headers["content-type"] = options["contentType"]
        if(collection.has(this.ratelimitBucket)) {
            const rateLimit = collection.get(this.ratelimitBucket)
            if(rateLimit.route === oldURL) {
                if(rateLimit.ratelimited) return this.handleRatelimit(oldURL, options)
            }
        }
        const request = await fetch(url, { method: options.method, agent, signal: controller.signal, headers, body }).finally(() => clearTimeout(timeout))
        if(request.status === 204) return this.client.emit(EventTypes.Ratelimit, `[REST]: REST request return 204`)
        this.ratelimitBucket = request.headers.get("X-RateLimit-Bucket")
        const remaining = parseInt(request.headers.get("X-RateLimit-Remaining"))
        const reset = Math.floor((request.headers.get("X-RateLimit-Reset") * 1000) - Date.now())
        const limit = parseInt(request.headers.get("X-RateLimit-Limit"))
        if(this.ratelimitBucket) {
            if(collection.has(this.ratelimitBucket)) {
                const ratelimit = collection.get(this.ratelimitBucket)
                if(ratelimit.ratelimited) return;
                ratelimit.remaining = remaining
                if(ratelimit.remaining <= 1) ratelimit.ratelimited = true 
            } else {
                collection.set(this.ratelimitBucket, { remaining, reset, limit, route: url, ratelimited: remaining <= 1, method: options.method, bucket: this.ratelimitBucket })
            }
        }
        const response = await request.json().catch(err => err.type === "invalid-json" ? undefined : console.error(err))
        if(request.status === 429) return await this.handleRatelimit(oldURL, options)
        if(![201, 200].includes(request.status)) throw new DiscordAPIError({
            message: response.message ?? response.error_description ?? request.statusText,
            method: options.method,
            code: response.code,
            httpError: request.status,
            path: url,
            rawError: response.errors ?? {},
            requestBody: options.auth ?? options.body,
        })
        if(collection.size > 0) this.clearCollection(reset)
        return response
    }

    async get(url, options = {}) {
        return await this._make(url, {
            method: "GET",
            ...options
        })
    }

    async post(url, options = {}) {
        return await this._make(url, {
            method: "POST",
            ...options
        })
    }

    async delete(url, options = {}) {
        return await this._make(url, {
            method: "DELETE",
            ...options
        })
    }

    async put(url, options = {}) {
        return await this._make(url, {
            method: "PUT",
            ...options
        })
    }

    async patch(url, options = {}) {
        return await this._make(url, {
            method: "PATCH",
            ...options
        })
    }
    
    async handleRatelimit(oldUrl, options) {
        const ratelimitData = collection.get(this.ratelimitBucket)
        if(ratelimitData) {
            this.client.emit(EventTypes.Ratelimit, ratelimitData)
            await wait(ratelimitData.reset)
            ratelimitData.ratelimited = false
            return await this._make(oldUrl, options)
        }
        return;
    }

    clearCollection(resetAfter) {
        return setTimeout(() => collection.clear(), resetAfter)
    }
}

module.exports = REST