const Interaction = require("./Interaction");

class AutoCompleteInteraction extends Interaction {
    constructor(data = {}, guildId, client) {
        super(data, guildId, client)
        this.commandId = this.data?.id ?? null
        this.commandType = this.data?.type ?? null
        this.commandName = this.data?.name ?? null
    }

    async respond(choices = []) {
        choices = choices?.map(o => AutoCompleteInteraction.parseChoices(o))
        if(choices?.length) return await this.webhook.reply(choices, 8)
    }

    getFocused(required = false) {
        const options = this.data.options
        if(options?.length) {
            const filter = options.find(o => o.focused)
            if(filter) return filter.value
            if(required) throw new RangeError(`No focused option found in the AutoComplete`)
            return null;
        }

        return null;
    }

    static parseChoices(choices = {}) {
        return { 
            name: choices.name,
            name_localizations: choices.nameLocalizations,
            value: choices.value
        }
    }
}

module.exports = AutoCompleteInteraction