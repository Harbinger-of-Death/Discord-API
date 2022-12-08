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
        const { data, files } = await DataPayload.create(options.message)
        const body = { data: {...options, message: data }, files }
        const post = await this.client.api.post(`${this.client.root}/channels/${this.channelId}/threads`, { body, reason })
        return this._add(post, { cache: true })
    }

}

module.exports = GuildForumThreadManager