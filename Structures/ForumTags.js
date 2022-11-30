const Base = require("../Base/base");

class ForumTags extends Base {
    constructor(data = {}, guildId, client) {
        super(client)
        this.id = data.id ?? null
        this.name = data.name ?? null
        this.moderated = data.moderated ?? null
        this.guildId = guildId ?? null
        this.emojiId = data.emoji_id ?? data.emojiId ?? null
        this.emojiName = data.emoji_name ?? data.emojiName ?? null
    }

    get guild() {
        return this.client.guilds.cache.get(this.guildId) ?? null
    }

    get emoji() {
        return this.guild?.emojis.cache.get(this.emojiId) ?? null
    }

    equals(tags) {
        return this.name === tags.name &&
        this.emojiId === tags.emojiId &&
        this.emojiName === tags.emojiName &&
        this.moderated === tags.moderated
    }
}

module.exports = ForumTags