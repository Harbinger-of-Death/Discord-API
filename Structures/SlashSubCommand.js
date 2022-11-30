const Collection = require("../Util/Collection");
const BaseSlashCommand = require("./BaseSlashCommand");
const SlashOption = require("./SlashOption");
class SlashSubCommand extends BaseSlashCommand {
    constructor(data = {}) {
        super(data)
        this.options = new Collection(data.options?.map(o => [o.name, new SlashOption(o)]))
    }
}

module.exports = SlashSubCommand