const BaseInteraction = require("./BaseInteraction")

class MessageComponentInteraction extends BaseInteraction {
    constructor(data = {}, guildId, client) {
        super(data, guildId, client)
        this.componentType = data.data?.component_type ?? null
        this.customId = data.data?.custom_id ?? null
        this.message = data.message ? this.channel?.messages._add(data.message) : null
    }

    get component() {
        if(this.message) return this.message.components.flatMap(o => o.components).find(component => component.customId === this.customId)
        return null
    }

    async update(options = {}) {
        return await this.webhook.reply(options, 7)
    }

    async deferUpdate(options = {}) {
        return await this.webhook.reply(options, 6)
    }
}

module.exports = MessageComponentInteraction