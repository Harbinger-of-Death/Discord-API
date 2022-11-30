const Base = require("../../Base/base");
const { EventTypes } = require("../../Util/Constants");
class InvalidSession extends Base {
    constructor(data = {}, client) {
        super(client)
        this._patch(data)
    }

    _patch(data) {
        const packet = data.d
        if(packet === true) {
            this.client.emit(EventTypes.Debug, `[Websocket]: Received an Invalid Session. Can reconnect so reconnecting.`)
            return this.client.ws.handleReconnect()
        }
        this.client.emit(EventTypes.Debug, `[Websocket]: Received an Invalid Session. Cannot reconnect ceasing process`)
        return process.exit()
    }
}

module.exports = InvalidSession