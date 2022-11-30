const Collection = require("../Util/Collection");
const BaseSlashCommand = require("./BaseSlashCommand");
const SlashSubCommand = require("./SlashSubCommand");
class SlashSubCommandGroup extends BaseSlashCommand {
    constructor(data = {}) {
        super(data)
        this.options = new Collection(data.options?.map(o => [o.name, new SlashSubCommand(o)]))
    }
}

module.exports = SlashSubCommandGroup