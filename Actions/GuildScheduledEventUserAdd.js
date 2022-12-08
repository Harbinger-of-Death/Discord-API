const { EventTypes } = require("../Util/Constants");
const BaseAction = require("./BaseAction");

class GuildScheduledEventUserAdd extends BaseAction {
    constructor(client, data) {
        super(client)
        this._patch(data)
    }

    _patch(data) {
        const packet = data.d
        const guild = this.client.guilds.cache.get(packet.guild_id)
        const event = guild.guildScheduledEvents.cache.get(packet.guild_scheduled_event_id)
        if(event) {
            const user = this.client.users.cache.get(packet.user_id) ? event.users._add({ user: packet.user_id}, { cache: true }, { id: packet.user_id }) : null
            return this.client.emit(EventTypes.GuildScheduledEventUserAdd, user)
        }
    }
}

module.exports = GuildScheduledEventUserAdd