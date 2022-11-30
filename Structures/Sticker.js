const Base = require("../Base/base");
const Snowflake = require("../Util/Snowflake");

class Sticker extends Base {
    constructor(data = {}, client, extras) {
        super(client)
        this.partial = data.partial ?? false
        this.id = data.id ?? null
        this.packId = data.pack_id ?? null
        this.name = data.name ?? null
        this.description = data.description ?? null
        this.createdAt = data.id ? Snowflake.deconstruct(data.id).createdAt : null
        this.createdTimestamp = this.createdAt?.getTime() ?? null
        this.tags = data.tags ?? null
        this.type = data.type ?? null
        this.formatType = data.format_type ?? null
        this.available = data.available ?? null
        this.guildId = data.guild_id ?? extras?.guildId ?? null
        this.user = this.client.users._add(data.user, { cache: false })
        this.sortValue = data.sort_value ?? null
    }

    get guild() {
        return this.client.guilds.cache.get(this.guildId) ?? null
    }

    async fetch(options = {}) {
        return this.guild?.stickers.fetch(this, options)
    }

    async fetchPack() {
        return this.packId ? (await this.client.fetchPremiumStickerPack()).get(this.packId) : null
    }

    async edit(options = {}) {
        return await this.guild?.stickers.edit(this, options)
    }

    async delete(reason) {
        return await this.guild?.stickers.delete(this, reason)
    }

    async setName(name, reason) {
        return await this.edit({ name, reason })
    }

    async setDescription(description, reason) {
        return await this.edit({ description, reason })
    }

    async setTags(tags, reason) {
        return await this.edit({ tags, reason })
    }

    imageURL(options = {}) {
        return this.client.cdn.StickerImage(this.id, options.extension, options.size)
    }

    equals(sticker) {
        return this.tags === sticker.tags &&
        this.name === sticker.name &&
        this.description === sticker.description
    }
}

module.exports = Sticker;