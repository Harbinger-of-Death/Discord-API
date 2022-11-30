const { ButtonStylesEnums, ComponentTypesEnums } = require("../Util/Constants")

class ButtonBuilder {
    constructor(data = {}) {
        this.type = ComponentTypesEnums.Button
        this.style = data.style
        this.label = data.label
        this.emoji = data.emoji
        this.customId = data.customId ?? data.custom_id
        this.url = data.url
        this.disabled = data.disabled
    }

    setStyle(style) {
        this.style = style
        return this;
    }

    setLabel(label) {
        this.label = label
        return this;
    }

    setEmoji(emoji) {
        if(typeof emoji === "string") this.emoji = { id: emoji }
        else this.emoji = { id: emoji.id, name: emoji.name, animated: emoji.animated }
        return this;
    }

    setCustomId(customId) {
        this.customId = customId
        return this;
    }

    setUrl(url) {
        this.url = url
        return this;
    }

    setDisabled(disabled) {
        this.disabled = disabled
        return this;
    }

    validation() {
        if(!Object.values(ButtonStylesEnums).includes(this.style)) throw new RangeError(`Invalid Button Styles`)
        if(this.label?.length > 80 && this.label) throw new RangeError(`Label must be less than 80`)
        if(!(this.emoji?.id || this.emoji?.name) && this.emoji) throw new RangeError(`Emoji id or name is required`)
        if(!this.customId) throw new RangeError(`Custom Id is required`)
        if(this.customId.length > 100) throw new RangeError(`Custom id must be less than 100`)
        if(this.url?.length && this.style !== ButtonStylesEnums.Link) throw new RangeError(`Url must be only set for Link style Buttons`)
        if(!this.url?.length && this.style === ButtonStylesEnums.Link) throw new RangeError(`Link styled Buttons must have a URL set`)
        if(typeof this.label !== "string" && this.label) throw new TypeError(`Button Label must be string`)
        if(typeof this.customId !== "string") throw new TypeError(`Custom Id must be a string`)
        if(typeof this.url !== "string" && this.style === ButtonStylesEnums.Link) throw new TypeError(`URL must be string`)
        if(typeof this.disabled !== "boolean" && this.disabled ) throw new TypeError(`The Disabled field must be boolean`)
        return;
    }

    toJSON() {
        this.validation()
        return {
            type: this.type,
            style: this.style,
            label: this.label,
            emoji: this.emoji,
            custom_id: this.customId,
            url: this.url,
            disabled: this.disabled
        }
    }

    static from(button) {
        if(button) {
            if(button.type !== 2) throw new TypeError(`Invalid Component type`)
            return new ButtonBuilder(button)
        }

        throw new RangeError(`Please specify a valid Button Component`)
    }
}

module.exports = ButtonBuilder