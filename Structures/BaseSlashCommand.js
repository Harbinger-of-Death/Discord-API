const { OptionTypesEnums } = require("../Util/Constants")

class BaseSlashCommand {
    constructor(data = {}) {
        this.type = data.type
        this.name = data.name
        this.nameLocalizations = data.nameLocalizations ?? data.name_localizations
        this.description = data.description
        this.descriptionLocalizations = data.descriptionLocalizations ?? data.description_localizations
    }

    isOption() {
        if(![OptionTypesEnums.SubCommand, OptionTypesEnums.SubCommandGroup].includes(this.type)) return true;
        return false;
    }

    isSubcommand() {
        if(this.type === OptionTypesEnums.SubCommand) return true;
        return false;
    }

    isSubcommandGroup() {
        if(this.type === OptionTypesEnums.SubCommandGroup) return true;
        return false;
    }
}

module.exports = BaseSlashCommand