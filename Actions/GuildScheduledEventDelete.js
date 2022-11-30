const { EventTypes } = require("../Util/Constants");
const BaseAction = require("./BaseAction");
class GuildScheduledEventDelete extends BaseAction {
    constructor(data = {}, client) {
        super(client)
        this._patch(data)
    }

    _patch(data) {
        const packet = data.d
        const manager = this.client.guilds.cache.get(packet.guild_id)?.guildScheduledEvents
        const scheduledEvent = manager.cache.get(packet.id)
        if(scheduledEvent) {
            this.client.emit(EventTypes.GuildScheduledEventDelete, scheduledEvent)
            return manager.cache.delete(packet.id)
        }
    }
}

module.exports = GuildScheduledEventDelete;