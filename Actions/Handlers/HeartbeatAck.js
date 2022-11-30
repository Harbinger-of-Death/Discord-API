const Base = require("../../Base/base");
const { EventTypes } = require("../../Util/Constants");

class HeartbeatAck extends Base {
    constructor(client) {
        super(client)
        this._patch()
    }

    _patch() {
        return this.client.emit(EventTypes.Debug, `[Heartbeat]: Heartbeat acknowledged. Sending next heartbeat in ${this.client.heartbeatInterval}ms`)
    }
}

module.exports = HeartbeatAck