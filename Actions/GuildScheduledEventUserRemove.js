const { EventTypes } = require("../Util/Constants");
const BaseAction = require("./BaseAction");
class GuildScheduledEventUserRemove extends BaseAction {
    constructor(data = {}, client) {
        super(client)
        this._patch(data)
    }

    _patch(data) {
        const packet = data.d
        const guild = this.client.guilds.cache.get(packet.guild_id)
        if(guild) {
            const event = guild.guildScheduledEvents.cache.get(packet.guild_scheduled_event_id)
            if(event) {
                const user = event.users.cache.get(packet.user_id)
                if(user) {
                    this.client.emit(EventTypes.GuildScheduledEventUserRemove, user)
                    return event.users.cache.delete(packet.user_id)
                }
            }
        }
    }
}

module.exports = GuildScheduledEventUserRemove