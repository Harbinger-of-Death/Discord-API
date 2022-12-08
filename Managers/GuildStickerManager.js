const FormData = require("form-data");
const Sticker = require("../Structures/Sticker");
const { SnowflakeRegex } = require("../Util/Constants");
const DataResolver = require("../Util/DataResolver");
const Util = require("../Util/Util");
const CachedManager = require("./CachedManager");
class GuildStickerManager extends CachedManager {
    constructor(guildId, client, iterable) {
        super(Sticker, client, iterable, { guildId })
        this.guildId = guildId ?? null
    }

    async fetch(sticker, options) {
        if(sticker instanceof Sticker || typeof sticker === "string") return this._fetchId(sticker, options)
        if(typeof sticker === "object" && !options) options = sticker
        const { cache = true, force = false } = options ?? {}
        const stickers = await this.client.api.get(`${this.client.root}/guilds/${this.guildId}/stickers`)
        return new this.cache.constructor(stickers?.map(o => [o.id, this._add(o, { cache, force })]))
    }

    async _fetchId(sticker, options = {}) {
        const { cache = true, force = false } = options
        const stickerId = sticker instanceof Sticker ? sticker.id : sticker
        if(!SnowflakeRegex.test(stickerId)) throw new RangeError(`Invalid Sticker`)
        if(this.cache.has(stickerId) && !force) return this.cache.get(stickerId)
        sticker = await this.client.api.get(`${this.client.root}/guilds/${this.guildId}/stickers/${stickerId}`)
        return this._add(sticker, { cache, force: true })
    }

    async create(options = {}) {
        const { reason, file } = options
        const body = new FormData()
        const resolveFile = await DataResolver.resolveFile(file)
        for(const [key, val] of Object.entries(options)) {
            if(!val || ["file", "reason"].includes(key)) continue;
            body.append(key, val)
        }

        body.append("file", resolveFile.buffer, resolveFile.filename)
        
        const sticker = await this.client.api.post(`${this.client.root}/guilds/${this.guildId}/stickers`, { reason, body })
        return this._add(sticker, { cache: true })
    }

    async edit(sticker, options = {}) {
        const stickerId = sticker instanceof Sticker ? sticker.id : sticker
        if(!this.cache.has(stickerId)) throw new RangeError(`Invalid Sticker`)
        const { reason, name, description, tags } = options
        const body = { name, description, tags }
        sticker = await this.client.api.patch(`${this.client.root}/guilds/${this.guildId}/stickers/${stickerId}`, { reason, body })
        return this._add(sticker)
    }

    async delete(sticker, reason) {
        const stickerId = sticker instanceof Sticker ? sticker.id : sticker
        if(!SnowflakeRegex.test(stickerId)) throw new RangeError(`Invalid Sticker`)
        sticker = this.cache.get(stickerId)
        await this.client.api.delete(`${this.client.root}/guilds/${this.guildId}/stickers/${stickerId}`, { reason })
        return sticker ?? null
    }
}

module.exports = GuildStickerManager;