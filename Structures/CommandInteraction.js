const BaseInteraction = require("./BaseInteraction")
class CommandInteraction extends BaseInteraction {
    constructor(data = {}, guildId, client) {
        super(data, guildId, client)
        this.commandType = data.data?.type ?? null
        this.commandId = data.data?.id ?? null
        this.commandName = data.data?.name ?? null
    }
}

module.exports = CommandInteraction