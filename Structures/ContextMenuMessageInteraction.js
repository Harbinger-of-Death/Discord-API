const ContextMenuInteraction = require("./ContextMenuInteraction");

class ContextMenuMessageInteraction extends ContextMenuInteraction {
    constructor(data = {}, guildId, client) {
        super(data, guildId, client)
    }
}

module.exports = ContextMenuMessageInteraction;