const Base = require("../../Base/base");
class DisallowedIntents extends Base {
    constructor(client) {
        super(client)

        this._patch()
    }

    _patch() {
        this.client.debug(`[Websocket]: You are using an intent you are not allowed. https://support.discord.com/hc/en-us/articles/360040720412`)
        this.client.debug(`[Websocket]: Closing the Websocket connection and destroying process`)
        this.client.ws.destroy()
        return process.exit()
    }
}

module.exports = DisallowedIntents