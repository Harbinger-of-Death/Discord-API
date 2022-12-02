const GuildForumThreadManager = require("../Managers/GuildForumThreadManager");
const ChannelFlags = require("../Util/ChannelFlags");
const Collection = require("../Util/Collection");
const ForumTags = require("./ForumTags");
const GuildChannel = require("./GuildChannel");
class ForumChannel extends GuildChannel {
    constructor(data = {}, client, extras) {
        super(data, client, extras)
        this.availableTags = new Collection(data.available_tags?.map(o => [o.id, new ForumTags(o, this.guildId, this.client)]))
        this.nsfw = data.nsfw ?? null
        this.flags = new ChannelFlags(data.flags).freeze()
        this.threads = new GuildForumThreadManager(this.guildId, this.id, this.client, [...this.client.channels.cache.filter(o => o.parentId === this.id)?.values()])
        this.defaultThreadRateLimitPerUser = data.default_thread_rate_limit_per_user ?? null
        this.defaultReactionEmoji = data.default_reaction_emoji ? { emojiId: data.default_reaction_emoji.emoji_id, emojiName: data.default_reaction_emoji.emoji_name } : null
        this.defaultSortOrder = data.default_sort_order ?? null
        this.defaultForumLayout = data.default_forum_layout ?? null
        this.rateLimitPerUser = data.rate_limit_per_user ?? null
        this.defaultAutoArchiveDuration = data.default_auto_archive_duration ?? null
    }

    async setAvailableTags(availableTags, reason) {
        return await this.edit({ availableTags, reason })
    }

    async setDefaultReactionEmoji(defaultReactionEmoji, reason) {
        return await this.edit({ defaultReactionEmoji, reason })
    }

    async setDefaultSortOrder(defaultSortOrder, reason) {
        return await this.edit({ defaultSortOrder, reason })
    }

    async setFlags(flags, reason) {
        return await this.edit({ flags, reason })
    }

    equals(channel) {
        return super.equals(channel) &&
        this.availableTags.size === channel.availableTags.size &&
        this.availableTags.every(tags => tags.equals(channel.availableTags.get(tags.id))) &&
        this.flags.bitfield === channel.flags.bitfield &&
        (this.defaultReactionEmoji === channel.defaultReactionEmoji || this.defaultReactionEmoji?.emojiId === channel.defaultReactionEmoji?.emojiId && this.defaultReactionEmoji?.emojiName === channel.defaultReactionEmoji?.emojiName) &&
        this.defaultThreadRateLimitPerUser === channel.defaultThreadRateLimitPerUser &&
        this.rateLimitPerUser === channel.rateLimitPerUser &&
        this.nsfw === channel.nsfw &&
        this.defaultAutoArchiveDuration === channel.defaultAutoArchiveDuration &&
        this.defaultSortOrder === channel.defaultSortOrder &&
        this.defaultForumLayout === channel.defaultForumLayout
    }
    
}

module.exports = ForumChannel