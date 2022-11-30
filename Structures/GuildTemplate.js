const Base = require("../Base/base");
const PartialGuild = require("./PartialGuild");

class GuildTemplate extends Base {
    constructor(data = {}, guildId, client) {
        super(client)
        this.partial = data.partial ?? false
        this.code = data.code ?? null
        this.name = data.name ?? null
        this.description = data.description ?? null
        this.usageCount = data.usage_count ?? null
        this.guildId = guildId ?? null
        this.creatorId = data.creator_id ?? null
        this.creator = this.client.users._add(data.creator, { cache: false })
        this.createdAt = data.created_at ? new Date(data.created_at) : null
        this.createdTimestamp = this.createdAt?.getTime() ?? null
        this.updatedAt = data.updated_at ? new Date(data.updated_at) : null
        this.updatedTimestamp = this.updatedAt?.getTime() ?? null
        this.sourceGuildId = data.source_guild_id ?? guildId ?? null
        this.serializedSourceGuild = data.serialized_source_guild ? new PartialGuild(data.serialized_source_guild, this.client) : null
        this.dirty = data.is_dirty ?? null
    }

    get guild() {
        return this.client.guilds.cache.get(this.guildId) ?? null
    }

    async fetch() {
        return await this.guild?.templates.fetch(this)
    }

    async edit(options = {}) {
        return await this.guild?.templates.edit(this, options)
    }

    async delete() {
        return await this.guild?.templates.delete(this)
    }

    async setName(name) {
        return await this.edit({ name })
    }

    async setDescription(description) {
        return await this.edit({ description })
    }

    async createGuild(options = {}) {
        return await this.guild?.templates.createGuildFromTemplate(this, options)
    }

    async sync() {
        return await this.guild?.templates.syncTemplate(this)
    }
}

module.exports = GuildTemplate;