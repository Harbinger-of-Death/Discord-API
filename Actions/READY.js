const { EventTypes, WebsocketStatus } = require("../Util/Constants");
const { setTimeout } = require("timers/promises");
const BaseAction = require("./BaseAction");
const ClientUser = require("../Structures/ClientUser");
const ClientApplication = require("../Structures/ClientApplication");
const ClientPresence = require("../Structures/ClientPresence");
class Ready extends BaseAction {
    constructor(client, data) {
        super(client)

        this._patch(data)
    }

    async _patch(data) {
        const packet = data.d
        this.client.user = new ClientUser(packet.user, this.client)
        this.client.application = new ClientApplication(packet.application, this.client)
        if(this.client.presence) this.client.presence = new ClientPresence(this.client.presence, this.client)
        await setTimeout(this.client.rest?.restReadyTimeout)
        this.client.debug(`[Client]: Global cache size of ${this.client.users.cache.size + this.client.guilds.cache.size + this.client.channels.cache.size + this.client.emojis.cache.size}`)
        this.client.readyAt = new Date()
        this.client.readyTimestamp = this.client.readyAt?.getTime() ?? null
        this.client.sessionId = packet.session_id
        this.client.resumeGatewayURL = `${packet.resume_gateway_url}?v=${this.client.version}&encoding=${this.client.encoding}`
        this.client.ws.status = WebsocketStatus.Ready
        return this.client.emit(EventTypes.Ready, () => {})
    }
}

module.exports = Ready