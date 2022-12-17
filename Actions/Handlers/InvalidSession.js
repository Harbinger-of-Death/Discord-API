const Base = require("../../Base/base");
const { WsReadyStateCodes } = require("../../Util/Constants");
class InvalidSession extends Base {
    constructor(data = {}, client) {
        super(client)
        this._patch(data)
    }

    _patch(data) {
        const packet = data.d
        if(packet === true) {
            this.client.debug(`[Websocket]: Received an Invalid Session. Can reconnect so reconnecting.`)
            return this.client.ws.handleReconnect()
        }
        this.client.debug(`[Websocket]: Received an Invalid Session. Cannot reconnect ceasing process ${this.client.ws.readyState !== WsReadyStateCodes.Closed ? `and Websocket connection` : ""}`)
        if(this.client.ws.readyState !== WsReadyStateCodes.Closed) this.client.ws.destroy(1000)
        return process.exit()
    }
}

module.exports = InvalidSession