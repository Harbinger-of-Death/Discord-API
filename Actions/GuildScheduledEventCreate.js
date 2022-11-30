const { EventTypes } = require("../Util/Constants");
const BaseAction = require("./BaseAction");

class GuildScheduledEventCreate extends BaseAction {
    constructor(data = {}, client) {
        super(client)
        this._patch(data)
    }
    
    _patch(data) {
        const packet = data.d
        const manager = this.client.guilds.cache.get(packet.guild_id)?.guildScheduledEvents
        const scheduledEvent = manager._add(packet, { cache: true }, { id: packet.id })
        return this.client.emit(EventTypes.GuildScheduledEventCreate, scheduledEvent)
    }
}

module.exports = GuildScheduledEventCreate;