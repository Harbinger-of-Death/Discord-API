class WebsocketError extends Error {
    constructor(data = {}) {
        super(data.message)
        this.code = data.code
        this.name = `WebsocketError[${this.code}]`
    }
}

module.exports = WebsocketError