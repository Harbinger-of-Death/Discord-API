class DiscordAPIError extends TypeError {
    constructor(data = {}) {
        super(data.message)
        this.name = `DiscordAPIError[${data.code ?? data.httpError}]`
        this.message = Object.values(data.rawError ?? {}).length ? `${data.message}${data.rawError ? `\n${this.parseErrorObject(data.rawError)}` : ""}` : data.message
        this.method = data.method
        this.code = data.code ?? 0
        this.httpError = data.httpError
        this.path = data.path
        this.requestBody = data.requestBody ?? {}
        this.rawError = data.rawError ?? null
    }

    parseErrorObject(errObj, parentKey = '') {
        let result = '';
        for(const key in errObj) {
            if(typeof errObj[key] === "object" && errObj[key] !== null) {
                result += this.parseErrorObject(errObj[key], parentKey ? `${parentKey}.${key}` : key)
            } else {
                if(key === "code" && errObj["message"]){
                    const errMessage = `${parentKey ? `${parentKey}${key !== "code" ? `.${key}` : ""}` : key}[${errObj[key]}]: ${errObj["message"]}`
                    result  += errMessage
                }
            }

            result += `\n`
        }

        return result.replace(/\._errors\.0/g, "").trim()
    }
}

module.exports = DiscordAPIError