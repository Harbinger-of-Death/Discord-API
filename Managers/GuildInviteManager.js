const Invite = require("../Structures/Invite");
const CachedManager = require("./CachedManager");
class GuildInviteManager extends CachedManager {
    constructor(guildId, client) {
        super(Invite, client, [])
        this.guildId = guildId
    }

    _add(invites, options = { cache: true, force: false }) {
        if(!invites) return null;
        const inviteCode = typeof invites === "string" ? invites : invites.code
        let invite
        if(this.cache.has(inviteCode) && !options.force) {
            invite = this.cache.get(inviteCode)
        } else {
            invite = new Invite(typeof invites === "string" ? {
                partial: true,
                code: inviteCode
            } : invites, this.client)

            if(options.cache) this.cache.set(inviteCode, invite)
        }

        return invite
    }

    async fetch(options = {}) {
        const { cache = true, force = false } = options
        const invites = await this.client.api.get(`${this.client.root}/guilds/${this.guildId}/invites`)
        return new this.cache.constructor(invites?.map(o => [o.code, this._add(o, { cache, force })]))
    }

    async delete(code, reason) {
        if(typeof code === "string") code = code.slice(code.lastIndexOf("/")+1)
        else code = code.code
        const invite = await this.client.api.delete(`${this.client.root}/invites/${code}`, { reason })
        return this._add(invite, { cache: false })
    }
}

module.exports = GuildInviteManager