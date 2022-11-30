const Base = require("../Base/base");

class GuildScheduledEventUser extends Base {
    constructor(data = {}, client, extras) {
        super(client)
        this.partial = data.partial ?? false
        this.guildScheduledEventId = data.guild_scheduled_event_id ?? extras?.scheduledEventId ?? null
        this.guildId = extras?.guildId ?? null
        this.user = this.client.users._add(data.user, { cache: true })
        if(data.member) {
            data.member["user"] = data.user
            this.member = this.guild?.members._add(data.member, { cache: true })
        } else this.member = null
    }

    get guild() {
        return this.client.guilds.cache.get(this.guildId) ?? null
    }
    
    get guildScheduledEvent() {
        return this.guild?.guildScheduledEvents.cache.get(this.guildScheduledEventId) ?? null
    }
}

module.exports = GuildScheduledEventUser