const Base = require("../../Base/base");

class Heartbeat extends Base {
    constructor(client) {
        super(client)
        this._patch()
    }

    _patch() {
        this.client.emit(EventTypes.Debug, `[Websocket]: Discord asked for heartbeat therefore sending one`)
        this.client.ws.send({
            op: OpCodes.Hearbeat,
            d: this.client.seq
        })
    }
}

module.exports = Heartbeat