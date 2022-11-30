const { EventTypes, WebsocketEvents } = require("../Util/Constants");
const BaseAction = require("./BaseAction");
class GuildCreate extends BaseAction {
    constructor(data = {}, client) {
        super(client)
        this._patch(data)
    }

    _patch(data) {
        const packet = data.d
        const guild = this.client.guilds._add(packet, { cache: true }, { id: packet.id })
        if(packet.unavailable) return this.client.emit(EventTypes.GuildUnavailable, guild)
        this.cacher.cacheChannels(packet)
        this.cacher.cacheEmojis(packet)
        if(this.client.ws.status === WebsocketEvents.Ready) return this.client.emit(EventTypes.GuildCreate, guild)
    }
}

module.exports = GuildCreate