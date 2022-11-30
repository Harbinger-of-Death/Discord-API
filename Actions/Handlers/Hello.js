const Base = require("../../Base/base");
const { OpCodes, EventTypes } = require("../../Util/Constants");
class Hello extends Base {
    constructor(data = {}, client) {
        super(client)
        this._patch(data)
    }

    _patch(data) {
        const packet = data.d
        this.client.emit(EventTypes.Debug, `[Websocket]: Received HELLO, now setting the HELLO timeout of 2000`)
        this.client.heartbeatInterval = packet?.heartbeat_interval
        this.client.emit(EventTypes.Debug, `[Websocket]: Setting the heartbeat interval to ${this.client.heartbeatInterval}ms`)
        setTimeout(() => {
            this.handleheartBeat()
        }, 2_000)
    }

    handleheartBeat() {
        this.client.ws.interval = setInterval(() => {
            this.client.heartbeatInterval = Math.floor(Math.random() * (35_000 - 20_000 + 1) + 20_000)
            this.client.ws.send({ op: OpCodes.Hearbeat, d: this.client.seq ?? null })
            this.client.emit(EventTypes.Debug, `[Heartbeat]: Successfully sent a heartbeat`)
            this.handleheartBeat()
            clearInterval(this.client.ws.interval)
        }, this.client.heartbeatInterval)
    }
}

module.exports = Hello