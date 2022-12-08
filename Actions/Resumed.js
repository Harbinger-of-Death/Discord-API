const BaseAction = require("./BaseAction");
class Resumed extends BaseAction {
    constructor(client) {
        super(client)
        this._patch()
    }

    _patch() {
        return this.client.debug(`[Websocket]: Successfully resumed gateway connection`)
    }
}

module.exports = Resumed