const Base = require("../Base/base");

class WelcomeChannel extends Base {
    constructor(data = {}, guildId, client) {
        super(client)
        this.channelId = data.channel_id ?? null
        this.description = data.description ?? null
        this.emojiId = data.emoji_id ?? null
        this.emojiName = data.emoji_name ?? null
        this.guildId = guildId ?? null
    }

    get guild() {
        return this.client.guilds.cache.get(this.guildId) ?? null
    }

    get channel() {
        return this.client.channels.cache.get(this.channelId) ?? null
    }
}

module.exports = WelcomeChannel