const { ComponentTypesEnums } = require("../Util/Constants");
const BaseInteraction = require("./BaseInteraction");
class ModalSubmitInteraction extends BaseInteraction {
    constructor(data = {}, guildId, client) {
        super(data, guildId, client)
        Object.defineProperty(this,  "_message", { value: data.message })
    }

    get customId() {
        return this.data?.custom_id ?? null
    }

    get fields() {
        return this.data?.components.reduce((acc, prev) => acc.concat(prev.components?.map(o => ModalSubmitInteraction.parseComponents(o))), []) ?? []
    }

    get message() {
        return this.channel?.messages._add(this._message) ?? null
    }

    getTextInputValue(customId, required = false) {
        if(this.fields?.length) {
            const modal = this.fields.find(o => o.customId === customId)
            if(modal) {
                if(modal.type !== ComponentTypesEnums.InputText) throw new RangeError(`Expected Component type to be 4. Received=${modal.type}`)
                return modal.value ?? null
            }

            if(required) throw new RangeError(`Modal has no customId ${customId}`)
            return null;
        }

        return null;
    }

    async update(options = {}) {
        return await this.webhook.reply(options, 7)
    }

    async deferUpdate(options = {}) {
        return await this.webhook.reply(options, 6)
    }

    isFromMessage() {
        const Message = require("../Structures/Message");
        return this.message instanceof Message
    }

    static parseComponents(components = {}) {
        return { 
            value: components.value,
            type: components.type,
            customId: components.custom_id   
        }
    }
}

module.exports = ModalSubmitInteraction;