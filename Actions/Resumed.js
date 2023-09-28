const BaseAction = require("./BaseAction");
class Resumed extends BaseAction {
    constructor(client) {
        super(client)
        this._patch()
    }

    _patch() {
        const replayedEvents = this.client.seq - this.client.closeSequence
        return this.client.debug(`[Websocket]: Successfully resumed gateway connection. Replayed ${replayedEvents} event${replayedEvents > 1 ? "s" : ""}`)
    }
}

module.exports = Resumed