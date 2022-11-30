const Base = require("../Base/base");
const Collection = require("../Util/Collection");

class Emoji extends Base {
    constructor(data = {}, client, extras) {
        super(client)
        Object.defineProperty(this, "_roles", { value: data.roles })
        this.partial = data.partial ?? false 
        this.id = data.id ?? null
        this.name = data.name ?? null
        this.guildId = data.guild_id ?? extras?.guildId ?? null
        this.requireColons = data.require_colons ?? null
        this.managed = data.managed ?? null
        this.animated = data.animated ?? null
        this.available = data.available ?? null
        this.user = this.client.users._add(data.user, { cache: true })
    }


    get roles() {
        return new Collection(this._roles?.map(o => [o, this.guild?.roles.cache.get(o)]))
    }

    get guild() {
        return this.client.guilds.cache.get(this.guildId) ?? null
    }

    async fetch(options = {}) {
        return await this.guild?.emojis.fetch(this, options)
    }

    async edit(options = {}) {
        return await this.guild?.emojis.edit(this, options)
    }

    async delete(reason) {
        return await this.guild?.emojis.delete(this, reason)
    }

    async setName(name, reason) {
        return await this.edit({ name, reason })
    }

    async setRoles(roles, reason) {
        return await this.edit({ roles, reason })
    }

    toString() {
        return `<${this.animated ? `a` : ""}:${this.name}:${this.id}>`
    }

    imageURL(options = {}) {
        if(!this.id) return null;
        return this.client.cdn.EmojiImage(this, options.extension, options.size, options.forceStatic)
    }

    equals(emoji) {
        return this.name === emoji.name && this.roles?.every(o => emoji.roles?.includes(o?.id))
    }

}

module.exports = Emoji