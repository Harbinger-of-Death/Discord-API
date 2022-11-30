const Base = require("../Base/base");
const ThreadMemberFlags = require("../Util/ThreadMemberFlags");

class ThreadMember extends Base {
    constructor(data = {}, client, extras) {
        super(client)
        this.partial = data.partial ?? false
        this.threadId = data.id ?? extras?.threadId ?? null
        this.userId = data.user_id ?? data.userId ?? null
        this.guildId = data.guild_id ?? extras?.guildId ?? null
        this.joinedAt = data.join_timestamp ? new Date(data.join_timestamp) : null
        this.joinedTimestamp = this.joinedAt?.getTime() ?? null
        this.flags = new ThreadMemberFlags(data.flags).freeze()
    }

    get channel() {
        return this.client.channels.cache.get(this.threadId) ?? null
    }

    get guild() {
        return this.client.guilds.cache.get(this.guildId) ?? null
    }

    get user() {
        return this.client.users.cache.get(this.userId) ?? null
    }

    get member() {
        return this.guild?.members.cache.get(this.userId) ?? null
    }
}

module.exports = ThreadMember