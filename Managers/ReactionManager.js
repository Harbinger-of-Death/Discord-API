const MessageReaction = require("../Structures/MessageReaction");
const CachedManager = require("./CachedManager");
class ReactionManager extends CachedManager {
    constructor(client, messageId, guildId, channelId, iterable) {
        super(MessageReaction, client, iterable, { guildId, channelId, messageId })
        this.guildId = guildId ?? null
        this.messageId = messageId ?? null
        this.channelId = channelId ?? null
    }

    _add(reactions, options = { cache: true, force: false }, extras = this.extras ?? {}) {
        if(!reactions) return null;
        const emojiId = typeof reactions === "string" ? reactions : reactions.emoji?.id ?? reactions.emoji?.name ?? reactions.emoji
        let reaction
        if(this.cache.has(emojiId) && !options.force) {
            reaction = this.cache.get(emojiId)
        } else {
            reaction = new MessageReaction(typeof reactions === "string" ? {
                partial: true,
                emoji: emojiId
            } : reactions, this.client, extras)
            if(options.cache) this.cache.set(emojiId, reaction)
        }

        return reaction
    }

    async removeAll() {
        await this.client.api.delete(`${this.client.root}/channels/${this.channelId}/messages/${this.messageId}/reactions`)
        return this.client.channels.cache.get(this.channelId)?.messages.cache.get(this.messageId) ?? null
    }
}

module.exports = ReactionManager