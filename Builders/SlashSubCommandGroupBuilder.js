const SlashSubCommandBuilder = require("./SlashSubCommandBuilder");
class SlashSubCommandGroupBuilder {
    constructor(data = {}) {
        this.name = data.name
        this.nameLocalizations = data.nameLocalizations ?? data.name_localizations
        this.description = data.description
        this.descriptionLocalizations = data.descriptionLocalizations ?? data.description_localizations
        this.options = data.options?.map(o => new SlashSubCommandBuilder(o).toJSON()) ?? []
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

    addSubcommands(subcommands = []) {
        subcommands.map(o => this.options.push(new SlashSubCommandBuilder(o).toJSON()))
        return this;
    }

    validation() {
        if(!this.name?.length || !this.description?.length) throw new RangeError(`Subcommand Group must have a name and description`)
        if(this.options?.length > 25) throw new RangeError(`Subcommand Group can only have 25 Sub commands`)
        return;
    }

    toJSON() {
        this.validation()
        return {
            type: 2,
            name: this.name,
            name_localizations: this.nameLocalizations,
            description: this.description,
            description_localizations: this.descriptionLocalizations,
            options: this.options
        }
    }
}

module.exports = SlashSubCommandGroupBuilder