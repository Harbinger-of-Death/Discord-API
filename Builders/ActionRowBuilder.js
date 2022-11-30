const { ComponentTypes, ComponentTypesEnums } = require("../Util/Constants")
const ButtonBuilder = require("./ButtonBuilder");
const InputTextBuilder = require("./InputTextBuilder");
const SelectMenuBuilder = require("./SelectMenuBuilder");

class ActionRowBuilder {
    constructor(data = {}) {
        this.type = ComponentTypesEnums.ActionRow
        this.components = data.components?.map(o => ActionRowBuilder.transformComponents(o)) ?? []
    }

    addComponents(...components) {
        if(Array.isArray(components[0])) {
            components[0].map(o => this.components.push(ActionRowBuilder.transformComponents(o)))
        } else {
            components.map(o => this.components.push(ActionRowBuilder.transformComponents(o)))
        }

        return this;
    }

    setComponents(...components) {
        if(Array.isArray(components[0])) {
            this.components = components[0].map(o => ActionRowBuilder.transformComponents(o))
        } else {
            this.components = components.map(o => ActionRowBuilder.transformComponents(o))
        }

        return this;
    }

    static transformComponents(components = {}) {
        let component
        switch(components.type) {
            case ComponentTypesEnums.Button:
                component = new ButtonBuilder(components)
                break;
            case ComponentTypesEnums.ChannelSelect:
            case ComponentTypesEnums.MentionableSelect:
            case ComponentTypesEnums.RoleSelect:
            case ComponentTypesEnums.StringSelect:
            case ComponentTypesEnums.UserSelect:
                component = new SelectMenuBuilder(components)
                break;
            case ComponentTypesEnums.InputText:
                component = new InputTextBuilder(components)
                break;

        }

        if(component) return component.toJSON()
        throw new RangeError(`Invalid Component Type`)
    }

    toJSON() {
        return {
            type: this.type,
            components: this.components
        }
    }

    static from(row) {
        if(row) {
            if(row.type !== ComponentTypesEnums.ActionRow) throw new TypeError(`Invalid Action Row Type`)
            return new ActionRowBuilder(row)
        }

        throw new RangeError(`Please specify a valid Component Type`)
    }
}

module.exports = ActionRowBuilder