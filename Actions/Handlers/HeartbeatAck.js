const Base = require("../../Base/base");
class HeartbeatAck extends Base {
    constructor(client) {
        super(client)
        this._patch()
    }

    _patch() {
        return this.client.debug(`[Heartbeat]: Heartbeat acknowledged. Sending next heartbeat in ${this.client.heartbeatInterval}ms`)
    }
}

module.exports = HeartbeatAck