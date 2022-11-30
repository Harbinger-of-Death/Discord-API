class DiscordAPIError extends Error {
    constructor(data = {}) {
        super(data.message)
        this.name = `DiscordAPIError[${data.code ?? data.httpError}]`
        this.method = data.method
        this.code = data.code ?? null
        this.httpError = data.httpError
        this.path = data.path
        this.requestBody = data.requestBody ?? {}
        this.rawError = data.rawError ?? null
    }
}

module.exports = DiscordAPIError