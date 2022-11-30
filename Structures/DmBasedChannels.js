const MessageManager = require("../Managers/MessageManager");
const Collection = require("../Util/Collection");
const Channel = require("./Channel");
class DMBasedChannels extends Channel {
    constructor(data = {}, client) {
        super(data, client, null)
        this.lastMessageId = data.last_message_id ?? null
        this.lastPinnedAt = data.last_pin_timestamp ? new Date(data.last_pin_timestamp) : null
        this.lastPinnedTimestamp = this.lastPinnedAt?.getTime() ?? null
        this.recipients = new Collection(data.recipients?.map(o => [o.id, this.client.users._add(o, { cache: true })]))
        this.messages = new MessageManager(this.id, null, this.client)
    }

    async send(options = {}) {
        return await this.messages.send(options)
    }

    async sendTyping() {
        return await this.client.channels.sendTyping(this)
    }

    async bulkDelete(messages, options = {}) {
        return await this.messages.bulkDelete(messages, options)
    }
} 

module.exports = DMBasedChannels