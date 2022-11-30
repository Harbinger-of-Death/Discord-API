const { ComponentTypesEnums, ChannelTypesEnums } = require("../Util/Constants");

class SelectMenuBuilder {
    constructor(data = {}) {
        this.type = data.type ?? ComponentTypesEnums.StringSelect
        this.customId = data.customId ?? data.custom_id
        this.options = data.options?.map(o => SelectMenuBuilder.transformOptions(o)) ?? []
        this.placeholder = data.placeholder
        this.minValues = data.minValues ?? data.min_values
        this.maxValues = data.maxValues ?? data.max_values
        this.channelTypes = data.channel_types ?? data.channelTypes ?? []
        this.disabled = data.disabled
    }

    setType(type) {
        this.type = type
        return this;
    }

    setCustomId(customId) {
        this.customId = customId
        return this;
    }

    addOptions(...options) {
        if(Array.isArray(options[0])) {
            options[0].map(o => this.options.push(SelectMenuBuilder.transformOptions(o)))
        } else {
            options.map(o => this.options.push(SelectMenuBuilder.transformOptions(o)))
        }

        return this;
    }

    setOptions(...options) {
        if(Array.isArray(options[0])) {
            this.options = options[0].map(o => SelectMenuBuilder.transformOptions(o))
        } else {
            this.options = options.map(o => SelectMenuBuilder.transformOptions(o))
        }

        return this;
    }

    setPlaceholder(placeholder) {
        this.placeholder = placeholder
        return this;
    }

    setMinValues(minValues) {
        this.minValues = minValues
        return this;
    }

    setMaxValues(maxValues) {
        this.maxValues = maxValues
        return this;
    }

    setDisabled(disabled) {
        this.disabled = disabled
        return this;
    }

    addChannelTypes(...types) {
        if(Array.isArray(types[0])) {
            types[0].map(o => this.channelTypes.push(o))
        } else {
            types.map(o => this.channelTypes.push(o))
        }

        return this;
    }

    setChannelTypes(...types) {
        if(Array.isArray(types[0])) {
            this.channelTypes = types[0]
        } else {
            this.channelTypes = types
        }

        return this;
    }

    static transformOptions(options = {}) {
        return {
            label: options.label,
            value: options.value,
            description: options.description,
            emoji: options.emoji,
            default: options.default
        }
    }

    validation() {
        if([ComponentTypesEnums.ActionRow, ComponentTypesEnums.Button, ComponentTypesEnums.InputText].includes(this.type)) throw new RangeError(`Invalid Type`)
        if(!this.customId) throw new RangeError(`Custom Id is required`)
        if(this.customId.length > 100) throw new RangeError(`Custom Id must be less than 100 characters`)
        if(!this.options?.length && this.type === ComponentTypesEnums.StringSelect) throw new RangeError(`Select Menu Options is required`)
        if(this.options?.length > 25) throw new RangeError(`Option must be less than 25`)
        if(this.placeholder?.length > 150 && this.placeholder) throw new RangeError(`Placeholder must be less than 150 characters`)
        if((this.minValues > 25 && this.minValues < 0) && this.minValues) throw new RangeError(`minimum value must be between 0 and 25`)
        if((this.maxValues > 25 && this.maxValues < 1) && this.maxValues) throw new RangeError(`maximum value must be between 1 and 25`)
        if(this.channelTypes?.length > 0 && this.type !== ComponentTypesEnums.ChannelSelect)
        for(const [index, value] of this.options?.entries()) {
            if(!(value.label && value.value)) throw new RangeError(`Field[${index}]: label and value are required`)
            if(value.label?.length > 100 && value.value?.length > 100) throw new RangeError(`Field[${index}]: label and value must be less than 100 characters`)
            if(value.description?.length > 100 && value.description) throw new RangeError(`Field[${index}]: description must be less than 100 characters`)
            if(!(value.emoji?.id || value.emoji?.name) && value.emoji) throw new RangeError(`Field[${index}]: emoji id or name is required`)
            if(typeof value.label !== "string" || typeof value.value !== "string") throw new TypeError(`Field[${index}]: label and value must be string`)
            if(typeof value.description !== "string" && value.description) throw new TypeError(`Field[${index}]: description must be string`)
            if(typeof (value.emoji?.id ?? value.emoji?.name) !== "string" && value.emoji) throw new TypeError(`Field[${index}]: emoji id or name must be string`)
            if(typeof value.default !== "boolean" && value.default) throw new TypeError(`Field[${index}]: default must be boolean`)
        }
        if(typeof this.customId !== "string") throw new TypeError(`Custom Id must be string`)
        if(typeof this.placeholder !== "string" && this.placeholder) throw new TypeError(`Placeholder must be string`)
        if(typeof this.minValues !== "number" && this.minValues) throw new TypeError(`Minimum value field must be number`)
        if(typeof this.maxValues !== "number" && this.maxValues) throw new TypeError(`Maximum value field must be number`)
        if(typeof this.disabled !== "boolean" && this.disabled) throw new TypeError(`Disabled field must be boolean`)
        if(this.channelTypes?.length) {
            const channelTypeFilter = Object.values(ChannelTypesEnums)
            for(const [index, value] of this.channelTypes.entries()) {
                if(!channelTypeFilter.includes(value)) throw new TypeError(`Field[${index}]: Invalid Channel Type`)
            }
        }
        return;
    }

    toJSON() {
        this.validation()
        return {
            type: this.type,
            custom_id: this.customId,
            options: this.options,
            placeholder: this.placeholder,
            min_values: this.minValues,
            max_values: this.maxValues,
            channel_types: this.channelTypes,
            disabled: this.disabled
        }
    }

    static from(menu) {
        if(menu) {
            if([ComponentTypesEnums.ActionRow, ComponentTypesEnums.Button, ComponentTypesEnums.InputText].includes(menu.type)) throw new TypeError(`Invalid Select Menu type`)
            return new SelectMenuBuilder(menu)
        }

        throw new RangeError(`Please specify a valid Component Type`)
    }
}

module.exports = SelectMenuBuilder