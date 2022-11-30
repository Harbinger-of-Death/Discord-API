const ContextMenuInteraction = require("./ContextMenuInteraction");

class ContextMenuUserInteraction extends ContextMenuInteraction {
    constructor(data = {}, guildId, client) {
        super(data, guildId, client)
    }
}

module.exports = ContextMenuUserInteraction