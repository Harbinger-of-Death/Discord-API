const SlashOptionBuilder = require("./SlashOptionBuilder");
class SlashSubCommandBuilder {
    constructor(data = {}) {
        this.name = data.name
        this.nameLocalizations = data.nameLocalizations ?? data.name_localizations
        this.description = data.description
        this.descriptionLocalizations = data.descriptionLocalizations ?? data.description_localizations
        this.options = data.options?.map(o => new SlashOptionBuilder(o).toJSON()) ?? []
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

    addOptions(...options) {
        if(Array.isArray(options[0])) {
            options[0].map(o => this.options.push(new SlashOptionBuilder(o).toJSON()))
        } else {
            options.map(o => this.options.push(o))
        }

        return this;
    }

    setOptions(...options) {
        if(Array.isArray(options[0])) {
            this.options = options[0].map(o => new SlashOptionBuilder(o).toJSON())
        } else {
            this.options = options.map(o => new SlashOptionBuilder(o).toJSON())
        }

        return this;
    }

    validation() {
        if(!this.name?.length || !this.description?.length) throw new RangeError(`Slash Sub Command name and description are required`)
        if(this.options?.length > 25) throw new RangeError(`Slash Sub Command option must be less than 25`)
        if(typeof this.name !== "string" || typeof this.description !== "string") throw new TypeError(`Slash Sub Command name and description must be string`)
        return;
    }

    toJSON() {
        this.validation()
        return {
            type: 1,
            name: this.name,
            name_localizations: this.nameLocalizations,
            description: this.description,
            description_localizations: this.descriptionLocalizations,
            options: this.options
        }
    }
}

module.exports = SlashSubCommandBuilder