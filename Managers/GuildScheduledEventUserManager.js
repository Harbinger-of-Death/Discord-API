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

    _add(users, options = { cache: true, force: false}) {
        if(!users) return null;
        const userId = typeof users === "string" ? users : users.user?.id ?? users
        let user
        if(this.cache.has(userId) && !options.force) {
            user = this.cache.get(userId)
        } else {
            user = new GuildScheduledEventUser(typeof users === "string" ? {
                partial: true,
                user: userId,
            } : users, this.client, this.extras)

            if(options.cache) this.cache.set(userId, user)
        }

        return user
    }

    async fetch(options = {}) {
        const { cache = true, force = false, limit = 100, withMember = false, before, after } = options
        const query = { limit, with_member: withMember, before: before instanceof User || before instanceof GuildMember ? before.id : before, after: after instanceof User || after instanceof GuildMember ? after.id : after }
        const users = await this.client.api.get(`${this.client.root}/guilds/${this.guildId}/scheduled-events/${this.scheduledEventId}/users`, { query })
        return new this.cache.constructor(users?.map(o => [o.user?.id, this._add(o, { cache, force })]))
    }
}

module.exports = GuildScheduledEventUserManager