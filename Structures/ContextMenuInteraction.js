const CommandInteraction = require("./CommandInteraction");
const ContextMenuOptionResolver = require("./ContextMenuOptionResolver");

class ContextMenuInteraction extends CommandInteraction {
    constructor(data = {}, guildId, client) {
        super(data, guildId, client)
        this.options = new ContextMenuOptionResolver(data.data, guildId, this.channelid, this.client)
    }
}

module.exports = ContextMenuInteraction;