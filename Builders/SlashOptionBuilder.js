const { OptionTypesEnums } = require("../Util/Constants")

class SlashOptionBuilder {
    constructor(data = {}) {
        this.type = data.type ?? 3
        this.name = data.name
        this.nameLocalizations = data.nameLocalizations ?? data.name_localizations
        this.description = data.description
        this.descriptionLocalizations = data.descriptionLocalizations ?? data.description_localizations
        this.required = data.required
        this.choices = data.choices?.map(o => SlashOptionBuilder.transformChoices(o)) ?? []
        this.channelTypes = (data.channelTypes ?? data.channel_types)?.map(o => o) ?? []
        this.minValue = data.minValue ?? data.min_value
        this.maxValue = data.maxValue ?? data.max_value
        this.minLength = data.minLength ?? data.min_length
        this.maxLength = data.maxLength ?? data.max_length
        this.autocomplete = data.autocomplete
    }

    setType(type) {
        this.type = type
        return this;
    }

    setName(name) {
        this.name = name
        return this;
    }

    setNameLocalizations(nameLocalizations) {
        this.nameLocalizations = nameLocalizations
        return this;
    }

    setDescription(description) {
        this.description = description
        return this;
    }

    setDescriptionLocalizations(descriptionLocalizations) {
        this.descriptionLocalizations = descriptionLocalizations
        return this;
    }

    setRequired(required) {
        this.required = required
        return this;
    }

    addChoices(...choices) {
        if(Array.isArray(choices[0])) {
            choices[0].map(o => this.choices.push(SlashOptionBuilder.transformChoices(o)))
        } else {
            choices.map(o => this.choices.push(SlashOptionBuilder.transformChoices(o)))
        }

        return this;
    }

    setChoices(...choices) {
        if(Array.isArray(choices[0])) {
            this.choices = choices[0].map(o => SlashOptionBuilder.transformChoices(o))
        } else {
            this.choices = choices.map(o => SlashOptionBuilder.transformChoices(o))
        }

        return this;
    }

    addChannelTypes(channelTypes) {
        channelTypes.map(o => this.channelTypes.push(o))
        return this;
    }

    setMinValue(minValue) {
        this.minValue = minValue
        return this;
    }

    setMaxValue(maxValue) {
        this.maxValue = maxValue
        return this;
    }

    setMinLength(minLength) {
        this.minLength = minLength
        return this;
    }

    setMaxLength(maxLength) {
        this.maxLength = maxLength
        return this;
    }

    setAutocomplete(autocomplete) {
        this.autocomplete = autocomplete
        return this;
    }

    static transformChoices(choices = {}) {
        return {
            name: choices.name,
            name_localizations: choices.nameLocalizations ?? choices.name_localizations,
            value: choices.value
        }
    }


    validation() {
        if(!Object.values(OptionTypesEnums).filter(o => o === this.type)?.length) throw new RangeError(`Invalid Option type`)
        if(!this.name || !this.description) throw new RangeError(`Missing name and description`)
        if(this.name?.length > 32 || this.name?.length < 1) throw new RangeError(`Name must be between 1-32 in length`)
        if(this.description?.length > 100 || this.description?.length < 1) throw new RangeError(`Description must be between 1-100 in length`)
        if(this.choices?.length > 25 && this.choices) throw new RangeError(`Choices must be less than 25`)
        if(this.channelTypes?.length > 0 && this.type !== OptionTypesEnums.Channel) throw new RangeError(`Slash Option type must be Channel to use channelTypes`)
        if((this.minValue || this.maxValue) && ![OptionTypesEnums.Integer, OptionTypesEnums.Number].includes(this.type)) throw new RangeError(`Slash Option type must be Integer or Number to set minValue or maxValue`)
        if((this.minLength || this.maxLength) && this.type !== OptionTypesEnums.String) throw new RangeError(`Slash Option type must be String to set minLength and maxLength`)
        if(((this.minLength > 6000 || this.minLength < 0) && this.minLength)) throw new RangeError(`minLength must be between 0-6000`)
        if(this.maxLength > 6000 || this.maxLength < 1) throw new RangeError(`maxLength must be between 1-6000`)
        if(typeof this.name !== "string" || typeof this.description !== "string") throw new TypeError(`Name and Description must be string`)
        if(typeof this.required !== "boolean" && this.required) throw new TypeError(`Required must be boolean`)
        if(typeof (this.minValue || this.maxValue) !== "number" && (this.minValue || this.maxValue)) throw new TypeError(`minValue and maxValue must be number`)
        if(typeof (this.minLength || this.maxLength) !== "number" && (this.minLength || this.maxLength)) throw new TypeError(`minLength and maxLength must be number`)
        if(typeof this.autocomplete !== "boolean" && this.autocomplete) throw new TypeError(`Autocomplete must be boolean`)
        for(const [index, value] of this.choices.entries()) {
            if(!(value.name || value.value)) throw new RangeError(`Field[${index}]: name and value are required`)
            if(typeof value.value !== "string" && this.type === OptionTypesEnums.String) throw new TypeError(`Field[${index}]: value must be string`)
            if(typeof value.value !== "number" && ![OptionTypesEnums.Number, OptionTypesEnums.Integer].includes(this.type)) throw new TypeError(`Field[${index}]: value must be number`)
        }
        return;
    }

    toJSON() {
        this.validation()
        return {
            type: this.type,
            name: this.name,
            name_localizations: this.nameLocalizations,
            description: this.description,
            description_localizations: this.descriptionLocalizations,
            required: this.required,
            choices: this.choices,
            channel_types: this.channelTypes ?? this.channel_types,
            min_value: this.minValue,
            max_value: this.maxValue,
            min_length: this.minLength,
            max_length: this.maxLength,
            autocomplete: this.autocomplete
        }
    }
}

module.exports = SlashOptionBuilder