const Base = require("../Base/base");
const ReactionUserManager = require("../Managers/ReactionUserManager");
const EmojiResolver = require("../Util/EmojiResolver");
const ReactionEmoji = require("./ReactionEmoji");

class MessageReaction extends Base {
    constructor(data = {}, client, extras) {
        super(client)
        this.partial = data.partial ?? false
        this.userId = data.user_id ?? data.userId ?? null
        this.channelId = data.channel_id ?? extras?.channelId ?? null
        this.messageId = data.message_id ?? extras?.messageId ?? null
        this.guildId = data.guild_id ?? extras?.guildId ?? null
        this.member = this.guild?.members._add(data.member, { cache: true })
        this.count = data.count ?? null
        this.me = data.me ?? null
        this.emoji = new ReactionEmoji(data.emoji, this.guildId, this, this.client)
        this.users = new ReactionUserManager(this.channelId, this.messageId, this.emoji, this.client)
        this.messageAuthorId = data.message_author_id ?? null
        this.burst = data.count_details?.burst ?? null
        this.normal = data.count_details?.normal ?? null
        this.burstColors = data.burst_colors ?? []
    }

    isSuper() {
        return this.burst === 1 ? true : false
    }

    isNormal() {
        return this.normal === 1 ? true : false
    }

    async remove() {
        const emoji = await EmojiResolver.create(this.emoji, this.client)
        await this.client.api.delete(`${this.client.root}/channels/${this.channelId}/messages/${this.messageId}/reactions/${emoji}`)
        return;
    }

    get guild() {
        return this.client.guilds.cache.get(this.guildId) ?? null
    }

    get channel() {
        return this.guild?.channels.cache.get(this.channelId) ?? this.client.channels.cache.get(this.channelId) ?? null
    }

    get message() {
        return this.channel?.messages.cache.get(this.messageId) ?? null
    }
    
    get user() {
        return this.client.users.cache.get(this.userId) ?? null
    }

    get messageAuthor() {
        return this.client.users.cache.get(this.messageAuthorId) ?? null
    }

    equals(reaction) {
        return this.count === reaction.count
    }
}

module.exports = MessageReaction