const Base = require("../../Base/base");
class UnknownOpcode extends Base {
    constructor(client) {
        super(client)

        this._patch()
    }

    _patch() {
        this.client.debug(`[Websocket]: Encountered an Unknown Opcode. Reconnecting.`)
        return this.client.ws.handleReconnect()
    }
}

module.exports = UnknownOpcode