const Base = require("../Base/base");

class GuildBan extends Base {
    constructor(data = {}, client, extras) {
        super(client)
        this.partial = data.partial ?? false
        this.reason = data.reason ?? null
        this.user = this.client.users._add(data.user, { cache: true }) ?? null
        this.guildId = extras?.guildId ?? null
    }

    get guild() {
        return this.client.guilds.cache.get(this.guildId) ?? null
    }

    async fetch(options = {}) {
        return await this.guild?.bans.fetch(this.user, options)
    }

    async remove(reason) {
        return await this.guild?.bans.remove(this.user, reason)
    }

}

module.exports = GuildBan