const ThreadChannel = require("../Structures/ThreadChannel");
const FetchedThreads = require("../Structures/FetchedThreads");
const Message = require("../Structures/Message");
const { RegExes, ChannelTypesEnums } = require("../Util/Constants");
const CachedManager = require("./CachedManager");
class ThreadManager extends CachedManager {
    constructor(guildId, channelId, client, iterable) {
        super(ThreadChannel, client, iterable, { guildId, channelId })
        this.guildId = guildId ?? null
        this.channelId = channelId ?? null
    }

    _add(threads, options = { cache: true, force: false }) {
        if(threads instanceof ThreadChannel) threads = threads.toJSON()
        return super._add(threads, options)
    }

    async create(message, options) {
        if(message instanceof Message || typeof message === "string") return this.createThreadFromMessage(message, options)
        if(typeof message === "object" && !options) options = message
        const body = { name: options?.name, auto_archive_duration: options?.autoArchiveDuration, type: options?.type ?? ChannelTypesEnums.PublicThread, invitable: options?.invitable, rate_limit_per_user: options?.rateLimitPerUser }
        const thread = await this.client.api.post(`${this.client.root}/channels/${this.channelId}/threads`, { body })
        return this._add(thread, { cache: true })
    }

    async createThreadFromMessage(message, options = {}) {
        const messageId = message instanceof Message ? message.id : message
        if(!RegExes.SnowflakeRegExp.test(messageId) && !this.client.channels.cache.get(this.channelId)?.messages.cache.has(messageId)) throw new RangeError(`Invalid Message`)
        const body = { name: options.name, auto_archive_duration: options.autoArchiveDuration, type: options.type ?? ChannelTypesEnums.PublicThread, invitable: options.invitable, rate_limit_per_user: options.rateLimitPerUser }
        const channel = await this.client.api.post(`${this.client.root}/channels/${this.channelId}/messages/${messageId}/threads`, { body })
        return this._add(channel, { cache: true })
    }

    async fetchArchiveThreads(options = {}) {
        const query = { before: options.before ? Util.generateDateISOString(options.before) : undefined, limit: options.limit }
        const threads = await this.client.api.get(`${this.client.root}/channels/${this.channelId}/threads/archived${options.private ? `/private` : `/public`}`, { query })
        return new FetchedThreads(threads, this.client)
    }

    async fetchJoinedThreads({ before, limit } = {}) {
        const query = before ? { before: Util.generateDateISOString(before), limit } : { limit }
        const threads = await this.client.api.get(`${this.client.root}/channels/${this.channelId}/users/@me/threads/archived/private`, { query })
        return new FetchedThreads(threads, this.client)
    }
}

module.exports = ThreadManager