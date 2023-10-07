const { Agent } = require("node:https");
const FormData = require("form-data");
const fetch = require("node-fetch");
const DiscordAPIError = require("../Errors/DiscordAPIError");
const { EventTypes } = require("../Util/Constants");
const Collection = require("../Util/Collection");
const { setTimeout: wait } = require("timers/promises")
class REST {
    constructor(options = {}, client) {
        Object.defineProperty(this, "token", { value: options.token ?? client?.token, writable: true })
        this.client = client
        this.ratelimitBucket = null
        this.hashCollection = new Collection()
        this.version = client?.version ?? options.version ?? 10
        this.tokenType = options.tokenType === `User` ? "" : `Bot `
    }

    get root() {
        return `https://discord.com/api/v${this.version}`
    }

    setTokenType(type = this.tokenType) {
        this.tokenType = type
        return this;
    }

    setVersion(version = 10) {
        this.version = version
        return this;
    }

    setToken(token) {
        this.token = token
        return this;
    }

    async _make(url, options = {}) {
        const agent = new Agent({ keepAlive: true })
        const controller = new AbortController()
        let timeout = setTimeout(() => controller.abort(), this.client?.rest.restRequestTimeout ?? 5000).unref()
        let headers = {
            authorization: `${this.tokenType}${this.client?.token ?? this.token}`
        }
        if(options.tokenType) headers["authorization"] = `${options.tokenType} ${options.authorization}`
        if(typeof options["reason"] === "string") headers["X-Audit-Log-Reason"] = options["reason"]
        const oldURL = url
        let body = options.body
        if(body) {
            let json
            if("data" in body) json = typeof body.data === "string" ? body.data : JSON.stringify(body.data)
            else json = typeof body === "string" ? body : JSON.stringify(body)
            headers["content-type"] = "application/json"
            if(body.files?.length) {
                const form = new FormData()
                for(const [index, val] of body.files?.entries()) {
                    if(!val) continue;
                    form.append(`files[${index}]`, val.buffer, val.filename)
                }

                form.append("payload_json", json, { contentType: "application/json" })
                body = form
            }
            
            if(body instanceof URLSearchParams) {
                headers["content-type"] = "application/x-www-form-urlencoded"
                for(const [key, val] of body.entries()) {
                    if(val === "undefined") body.delete(key);
                }

                body = body.toString()
            }
            if(body instanceof FormData || body.constructor.name === "FormData") Object.assign(headers, body.getHeaders())
            if(headers["content-type"] === "application/json") body = json
        }
        if(options.query) {
            const urlSearchParams = new URLSearchParams()
            for(const [key, val] of Object.entries(options.query)) { 
                if(!val) continue;
                if(Array.isArray(val)) urlSearchParams.append(key, val.join(","))
                else urlSearchParams.append(key, val)
            }

            if([...urlSearchParams.values()].length) url = url.concat(`?${decodeURIComponent(urlSearchParams)}`)
        }

        if(this.hashCollection.has(`${this.ratelimitBucket}:${oldURL}`)) {
            const ratelimitData = this.hashCollection.get(`${this.ratelimitBucket}:${oldURL}`)
            if(ratelimitData.ratelimited) return this.handleRatelimit(oldURL, options)
        }
        const request = await fetch(url, { method: options.method, agent, signal: controller.signal, headers, body }).finally(() => clearTimeout(timeout))
        this.ratelimitBucket = request.headers.get("X-RateLimit-Bucket")
        const limit = +request.headers.get("X-RateLimit-Limit")
        const remaining = +request.headers.get("X-RateLimit-Remaining")
        const reset = Math.floor((request.headers.get("X-RateLimit-Reset") * 1000) - Date.now())
        const response = request.headers.get("content-type")?.includes("application/json") ? await request.json() : null
        const scope = request.headers.get("x-ratelimit-scope")
        if(!this.hashCollection.has(`${this.ratelimitBucket}:${oldURL}`)) {
            if(remaining <= 1) this.hashCollection.set(`${this.ratelimitBucket}:${oldURL}`, { limit, remaining, reset, bucket: this.ratelimitBucket, method: options.method, route: oldURL, ratelimited: true })
        }

        if(request.status === 429) {
            switch(scope) {
                case "shared":
                    this.hashCollection.set(`${this.ratelimitBucket}:${oldURL}`, { retryAfter: Math.floor(response.retry_after * 1000), global: response.global, ratelimited: true })
                    return this.handleRatelimit(oldURL, options)
                case "user":
                    return this.handleRatelimit(oldURL, options)
            }
        }
        if(!request.ok) throw new DiscordAPIError({
            message: response?.message ?? response.error_description ?? request.statusText,
            method: options.method,
            code: response?.code,
            httpError: request.status,
            path: url,
            rawError: response?.errors ?? {},
            requestBody: options.auth ?? options.body,
        })

        if(this.hashCollection.size) this.hashSweeper(reset)

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
        const ratelimitData = this.hashCollection.get(`${this.ratelimitBucket}:${oldUrl}`)
        if(ratelimitData) {
            this.client?.emit(EventTypes.Ratelimit, ratelimitData)
            await wait(ratelimitData.reset ?? ratelimitData.retryAfter)
            ratelimitData.ratelimited = false
            this.hashCollection.delete(`${this.ratelimitBucket}:${oldUrl}`)
            return await this._make(oldUrl, options)
        }
        return;
    }

    hashSweeper(resetAfter) {
        return setTimeout(() => this.hashCollection.clear(), resetAfter)
    }
}

module.exports = REST