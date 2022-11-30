const ThreadChannel = require("../Structures/ThreadChannel");
const DataPayload = require("../Util/DataPayload");
const Util = require("../Util/Util");
const CachedManager = require("./CachedManager");
class GuildForumThreadManager extends CachedManager {
    constructor(guildId, channelId, client, iterable) {
        super(ThreadChannel, client, iterable, { guildId, channelId })
        this.guildId = guildId ?? null
        this.channelId = channelId ?? null
    }

    _add(threads, options = { cache: true, force: false }) {
        if(threads instanceof ThreadChannel) threads = threads.toJSON()
        return super._add(threads, options)
    }

    async fetchArchiveThreads(options = {}) {
        const query = { before: options.before ? Util.generateDateISOString(options.before) : undefined, limit: options.limit }
        const threads = await this.client.api.get(`${this.client.root}/channels/${this.channelId}/threads/archived${options.private ? `/private` : `/public`}`, { query })
        return new FetchedThreads(threads, this.client)
    }

    async createPost(options = {}) {
        const { reason } = options
        const payload = await DataPayload.create(options.message)
        const body = { data: { name: options.name, auto_archive_duration: options.autoArchiveDuration, rate_limit_per_user: options.rateLimitPerUser, message: payload.data, applied_tags: options.appliedTags?.map(o => typeof o === "string" ? o : o.id) }, files: payload.files}
        const thread = await this.client.api.post(`${this.client.root}/channels/${this.channelId}/threads`, { body, reason })
        return this.client.channels._add(thread)
    }

}

module.exports = GuildForumThreadManager