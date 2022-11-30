const BaseInteraction = require("./BaseInteraction")

class MessageComponentInteraction extends BaseInteraction {
    constructor(data = {}, guildId, client) {
        super(data, guildId, client)
        this.componentType = data.data?.component_type ?? null
        this.customId = data.data?.custom_id ?? null
        this.message = data.message ? this.channel?.messages._add(data.message) : null
    }

    get component() {
        return this.message?.components.reduce((acc, prev) => acc = prev.components.find(o => o.customId === this.customId), {})
    }

    async update(options = {}) {
        return await this.webhook.reply(options, 7)
    }

    async deferUpdate(options = {}) {
        return await this.webhook.reply(options, 6)
    }
}

module.exports = MessageComponentInteraction