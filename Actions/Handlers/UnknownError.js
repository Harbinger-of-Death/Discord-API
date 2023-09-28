const Base = require("../../Base/base");
class UnknownError extends Base {
    constructor(client) {
        super(client)

        this._patch()
    }

    _patch() {
        this.client.debug(`[Websocket]: Encountered an Unknown Error. Reconnecting`)
        return this.client.ws.handleReconnect()
    }
}

module.exports = UnknownError