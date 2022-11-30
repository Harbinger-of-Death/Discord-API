const ChatInputCommandInteractionOptionResolver = require("./ChatInputCommandInteractionOptionResolver");
const CommandInteraction = require("./CommandInteraction");
class ChatInputCommandInteraction extends CommandInteraction {
    constructor(data = {}, guildId, client) {
        super(data, guildId, client)
        this.options = new ChatInputCommandInteractionOptionResolver(data.data, this.guildId, this.client)
    }
}

module.exports = ChatInputCommandInteraction;