const { ComponentTypesEnums, InputTextStyleEnums } = require("../Util/Constants")

class InputTextBuilder {
    constructor(data = {}) {
        this.type = ComponentTypesEnums.InputText
        this.customId = data.custom_id ?? data.customId ?? null
        this.style = data.style ?? null
        this.label = data.label ?? null
        this.minLength = data.min_length ?? data.minLength ?? null
        this.maxLength = data.max_length ?? data.maxLength ?? null
        this.required = data.required ?? null
        this.value = data.value ?? null
        this.placeholder = data.placeholder ?? null
    }

    setCustomId(customId) {
        this.customId = customId
        return this;
    }

    setStyle(style) {
        this.style = style
        return this;
    }

    setLabel(label) {
        this.label = label
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

    setRequired(required) {
        this.required = required
        return this;
    }

    setValue(value) {
        this.value = value
        return this;
    }

    setPlaceholder(placeholder) {
        this.placeholder = placeholder
        return this;
    }

    static from(inputText) {
        if(inputText.type !== ComponentTypesEnums.InputText) throw new TypeError(`Expected Component Type 4. Received=${inputText.type}`)
        return new InputTextBuilder(inputText)
    }

    validation() {
        if(!this.customId || !this.style || !this.label) throw new RangeError(`Input Text must have customId, style and a label`)
        if(this.customId?.length > 100) throw new RangeError(`Custom Id must be less than 100 in length`)
        if(!Object.values(InputTextStyleEnums).includes(this.style)) throw new RangeError(`Invalid Style`) 
        if(this.label?.length > 45) throw new RangeError(`Input Text Label must be less than 45 in length`)
        if((this.minLength > 4000 || this.minLength < 1) && this.minLength) throw new RangeError(`Input Text minimum input length must be between 0-4000`)
        if((this.maxLength > 4000 || this.maxLength <= 1) && this.maxLength) throw new RangeError(`Input Text maximum input length must be between 1-4000`)
        if(this.value?.length > 4000 && this.value) throw new RangeError(`Input Text pre-filled value must be less than 4000 in length`)
        if(this.placeholder?.length > 100 && this.placeholder) throw new RangeError(`Input Text placeholder must be less than 100 in length`)
        if(typeof this.customId !== "string") throw new TypeError(`Custom Id must be string. Received=${typeof this.customId}`)
        if(typeof this.label !== "string") throw new TypeError(`Label must be string. Received=${typeof this.label}`)
        if(typeof this.minLength !== "number" && this.minLength) throw new TypeError(`Minimum input length value must be number. Received=${typeof this.minLength}`)
        if(typeof this.maxLength !== "number" && this.maxLength) throw new TypeError(`Maximum input length value must be number. Received=${typeof this.maxLength}`)
        if(typeof this.required !== "boolean" && this.required) throw new TypeError(`Input Text required value must be booelean. Received=${typeof this.required}`)
        if(typeof this.value !== "string" && this.value) throw new TypeError(`Input Text pre-filled value must be string. Received=${typeof this.value}`)
        if(typeof this.placeholder !== "string" && this.placeholder) throw new TypeError(`Input Text placeholder must be string. Received=${typeof this.placeholder}`)
        return;
    }

    toJSON() {
        this.validation()
        return {
            type: 4,
            custom_id: this.customId,
            style: this.style,
            label: this.label,
            min_length: this.minLength,
            max_length: this.maxLength,
            required: this.required,
            value: this.value,
            placeholder: this.placeholder
        }
    }

    static from(textInput) {
        if(textInput) {
            return new InputTextBuilder(textInput)
        }

        throw new RangeError(`Please specify a valid component`)
    }
}

module.exports = InputTextBuilder