const FetchedThreads = require("../Structures/FetchedThreads");
const Invite = require("../Structures/Invite");
const { RegExes } = require("../Util/Constants");
const ChannelManager = require("./ChannelManager");
class GuildChannelManager extends ChannelManager {
    constructor(guildId, client, iterable) {
        super(client, iterable, { guildId })
        this.guildId = guildId
    }
    
    async fetch(channel, options) {
        if(typeof channel?.id !== "undefined" || typeof channel === "string") return this._fetchId(channel, options)
        if(typeof channel === "object" && !options) options = channel
        const { cache = true, force = false } = options ?? {}
        const channels = await this.client.api.get(`${this.client.root}/guilds/${this.guildId}/channels`)
        return new super.cache.constructor(channels?.map(o => [o.id, this._add(o, { cache, force })]))
    }

    async _fetchId(channel, options = {}) {
        const channelId = typeof channel === "string" ? channel : channel?.id
        const { cache = true, force = false } = options
        if(!RegExes.SnowflakeRegExp.test(channelId)) throw new RangeError(`Invalid Channel`)
        if(this.cache.has(channelId) && !force) return this.cache.get(channelId)
        channel = await this.client.api.get(`${this.client.root}/channels/${channelId}`)
        if(this.guildId !== channel.guild_id) throw new RangeError(`Invalid Channel not in Guild`)
        return this._add(channel, { cache, force: true })
    }

    async create(options = {}) {
        const body = this.constructor.transformPayload(options)
        const { reason } = options
        const channel = await this.client.api.post(`${this.client.root}/guilds/${this.guildId}/channels`, { body, reason })
        return this._add(channel, { cache: true })
    }

    async modifyPositions(options = [{}]) {
        const body = options.map(o => {
            const channelId = typeof o.channel === "string" ? o.channel : o.channel?.id
            const parentId = typeof o.parent === "string" ? o.parent : o.parent?.id
            if(!this.cache.has(channelId)) throw new RangeError(`Invalid Channel`)
            if(!this.cache.has(parentId) && o.parent) throw new RangeError(`Invalid Parent Channel`)
            if(!o.position) throw new RangeError(`Channel position is required`)
            return {
                id: channelId,
                position: o.position,
                lock_permissions: o.lockPermissions,
                parent_id: parentId
            }
        })
        await this.client.api.patch(`${this.client.root}/guilds/${this.guildId}/channels`, { body })
        return new super.cache.constructor(body.map(o => [o.id, this._add(o)]))
    }

    async fetchActiveThreads() {
        const threads = await this.client.api.get(`${this.client.root}/guilds/${this.guildId}/threads/active`)
        return new FetchedThreads(threads, this.client)
    }

    async edit(channel, options = {}) {
        const channelId = typeof channel === "string" ? channel : channel?.id
        if(!this.cache.has(channelId) && !RegExes.SnowflakeRegExp.test(channelId)) throw new RangeError(`Invalid Channel`)
        const body = this.constructor.transformPayload(options)
        const { reason } = options
        channel = await this.client.api.patch(`${this.client.root}/channels/${channelId}`, { body, reason })
        return this._add(channel, { cache: true, force: true })
    } 

    async delete(channel, reason) {
        const channelId = typeof channel === "string" ? channel : channel?.id
        if(!RegExes.SnowflakeRegExp.test(channelId) && !this.cache.has(channelId)) throw new RangeError(`Invalid Channel`)
        channel = this.cache.get(channelId)
        await this.client.api.delete(`${this.client.root}/channels/${channelId}`, { reason })
        return channel ?? null
    }

    async createInvite(channel, options = {}) {
        const channelId = typeof channel === "string" ? channel : channel?.id
        if(!this.cache.has(channelId)) throw new RangeError(`Invalid Channel`)
        const { reason } = options
        const body = {
            max_age: options.maxAge,
            max_uses: options.maxUses,
            temporary: options.temporary,
            unique: options.unique,
            target_type: options.targetType,
            target_user_id: typeof options.targetUser === "string" ? options.targetUser : options.targetUser?.id,
            target_application_id: typeof options.targetApplication === "string" ? options.targetApplication : options.targetApplication?.id
        }

        const invite = await this.client.api.post(`${this.client.root}/channels/${channelId}/invites`, { body, reason })
        return new Invite(invite, this.client)
    }

    async fetchInvites(channel) {
        const channelId = typeof channel === "string" ? channel : channel?.id
        if(!this.cache.has(channelId)) throw new RangeError(`Invalid Channel`)
        const invites = await this.client.api.get(`${this.client.root}/channels/${channelId}/invites`)
        return new this.cache.constructor(invites?.map(o => [o.code, new Invite(o, this.client)]))
    }

    async follow(channel, webhookChannel) {
        const channelId = typeof channel === "string" ? channel : channel?.id
        const webhookChannelId = typeof webhookChannel === "string" ? webhookChannel : webhookChannel.id
        if(!this.cache.has(channelId) || !this.cache.has(webhookChannelId)) throw new RangeError(`Invalid Channel`)
        const body = { webhook_channel_id: webhookChannelId }
        channel = await this.client.api.post(`${this.client.root}/channels/${channelId}/followers`, { body })
        return this.cache.get(channel.channel_id)
    }

    async fetchThreads(channel, options = {}) {
        const channelId = typeof channel === "string" ? channel : channel?.id
        if(!this.cache.has(channelId)) throw new RangeError(`Invalid Channel`)
        const { before, limit = 25 } = options
        const query = {
            before: before ? Util.generateDateISOString(before) : undefined,
            limit
        }

        const fetchedThreads = await this.client.api.get(`${this.client.root}/channels/${channelId}/threads/archived${options.private ? `/private` : `/public`}`, { query })
        return new FetchedThreads(fetchedThreads, this.client)
    }

    async sendTyping(channel) {
        const channelId = typeof channel === "string" ? channel : channel?.id
        if(!this.cache.has(channelId) && !RegExes.SnowflakeRegExp.test(channelId)) throw new RangeError(`Invalid Channel`)
        await this.client.api.post(`${this.client.root}/channels/${channelId}/typing`)
        return this.cache.get(channelId)
    }

    async clone(channel, reason) {
        channel = this.cache.get(typeof channel === "string" ? channel : channel?.id)
        if(!channel) throw new RangeError(`Invalid Channel`)
        const obj = { ...channel, permissionOverwrites: [...channel.permissionOverwrites.cache.values()], parent: channel.parentId, reason }
        return await this.create(obj)
    }

    async lockPermissions(channel, reason) {
        channel = this.cache.get(typeof channel === "string" ? channel : channel?.id)
        if(!channel) throw new RangeError(`Invalid Channel`)
        let parent = channel.parent
        if(!parent) throw new RangeError(`This Channel has no parent`)  
        const parentOverwrites = parent.permissionOverwrites.cache
        if(parentOverwrites.size > 0) {
            if(!parentOverwrites.every(o => {
                const overwrite = channel.permissionOverwrites.cache.get(o.id)
                return (overwrite) 
                && overwrite.type === o.type 
                && overwrite.allow?.bitfield === o.allow?.bitfield 
                && overwrite.deny?.bitfield === o.deny?.bitfield
                && parentOverwrites.size === channel.permissionOverwrites.cache.size
            })) return await this.edit(channel, { permissionOverwrites: parentOverwrites, reason })
        }

        return null;
    }

}

module.exports = GuildChannelManager