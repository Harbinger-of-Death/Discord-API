const { EventTypes } = require("../Util/Constants");
const BaseAction = require("./BaseAction");

class GuildScheduledEventUpdate extends BaseAction {
    constructor(data = {}, client) {
        super(client)
        this._patch(data)
    }

    _patch(data) {
        const packet = data.d
        const manager = this.client.guilds.cache.get(packet.guild_id)?.guildScheduledEvents
        const oldScheduledEvent = manager.cache.get(packet.id)
        const newScheduledEvent = manager._add(packet, { cache: true, force: true })
        if(oldScheduledEvent?.equals(newScheduledEvent)) return;
        return this.client.emit(EventTypes.GuildScheduledEventUpdate, oldScheduledEvent, newScheduledEvent)
    }
}

module.exports = GuildScheduledEventUpdate;