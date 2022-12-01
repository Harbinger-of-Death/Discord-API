const Emoji = require("../Structures/Emoji");
const CachedManager = require("./CachedManager");
class EmojiManager extends CachedManager {
    constructor(client, iterable, extras) {
        super(Emoji, client, iterable, extras)
    }

    _add(emojis, options = { cache: true, force: false }, extras = {}) {
        if(!emojis) return null;
        const emojiId = typeof emojis === "string" ? emojis : emojis.id
        let emoji
        if(this.cache.has(emojiId) && !options.force) {
            emoji = this.cache.get(emojiId)
        } else {
            emoji = new Emoji(typeof emojis === "string" ? {
                partial: true,
                id: emojiId
            } : emojis, this.client, extras)
            if(options.cache) {
                //Only for when creating and updating
                if(extras.guildId) this.client.guilds.cache.get(extras.guildId)?.emojis.cache.set(emojiId, emoji)
                this.cache.set(emojiId, emoji)
            }
        }

        return emoji
    }
}

module.exports = EmojiManager