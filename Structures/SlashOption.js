const BaseSlashCommand = require("./BaseSlashCommand")

class SlashOption extends BaseSlashCommand {
    constructor(data = {}) {
        super(data)
        this.required = data.required
        this.choices = data.choices?.map(o => SlashOptionBuilder.transformChoices(o)) ?? []
        this.channelTypes = (data.channelTypes ?? data.channel_types)?.map(o => o) ?? []
        this.minValue = data.minValue ?? data.min_value
        this.maxValue = data.maxValue ?? data.max_value
        this.minLength = data.minLength ?? data.min_length
        this.maxLength = data.maxLength ?? data.max_length
        this.autocomplete = data.autocomplete
    }

    static transformChoices(choices = {}) {
        return {
            name: choices.name,
            name_localizations: choices.nameLocalizations ?? choices.name_localizations,
            value: choices.value
        }
    }
}

module.exports = SlashOption