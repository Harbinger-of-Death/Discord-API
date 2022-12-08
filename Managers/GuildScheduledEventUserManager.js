const GuildMember = require("../Structures/GuildMember");
const GuildScheduledEventUser = require("../Structures/GuildScheduledEventUser");
const User = require("../Structures/User");
const CachedManager = require("./CachedManager");
class GuildScheduledEventUserManager extends CachedManager {
    constructor(guildId, scheduledEventId, client) {
        super(GuildScheduledEventUser, client, [], { guildId, scheduledEventId })
        this.guildId = guildId ?? null
        this.scheduledEventId = scheduledEventId ?? null
    }

    _add(users, options = { cache: true, force: false}, extras = {}) {
        return super._add(users, options, Object.assign(this.extras, extras))
    }

    async fetch(options = {}) {
        const { cache = true, force = false, limit = 100, withMember = false, before, after } = options
        const query = { limit, with_member: withMember, before: before instanceof User || before instanceof GuildMember ? before.id : before, after: after instanceof User || after instanceof GuildMember ? after.id : after }
        const users = await this.client.api.get(`${this.client.root}/guilds/${this.guildId}/scheduled-events/${this.scheduledEventId}/users`, { query })
        return new this.cache.constructor(users?.map(o => [o.user?.id, this._add(o, { cache, force }, { id: o.user?.id })]))
    }
}

module.exports = GuildScheduledEventUserManager