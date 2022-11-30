const Base = require("../Base/base");

class MessageReference extends Base {
    constructor(data = {}, client) {
        super(client)
        Object.defineProperty(this, "_data", { value: data })
        this.messageId = data.message_reference?.message_id ?? null
        this.channelId = data.message_reference?.channel_id ?? null
        this.guildId = data.message_reference?.guild_id ?? null
        this.failIfNotExists = data.message_reference?.fail_if_not_exists ?? null
        this.message = this.channel?.messages._add(data.message ?? this.messageId, { cache: true }) ?? null
    }

    get channel() {
        return this.client.channels.cache.get(this.channelId) ?? null
    }
}

module.exports = MessageReference