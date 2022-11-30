const { ComponentTypesEnums } = require("../Util/Constants");
const Button = require("./Button");
const SelectMenu = require("./SelectMenu");

class Component {
    constructor(data = {}) {
        this.type = data.type ?? null
        this.components = data.components?.map(o => Component.parseComponents(o)) ?? []
    }

    static parseComponents(components = {}) {
        switch(components.type) {
            case ComponentTypesEnums.Button:
                return new Button(components)
            case ComponentTypesEnums.ChannelSelect:
            case ComponentTypesEnums.MentionableSelect:
            case ComponentTypesEnums.RoleSelect:
            case ComponentTypesEnums.StringSelect:
            case ComponentTypesEnums.UserSelect:
                return new SelectMenu(components)
        }
    }
}

module.exports = Component

