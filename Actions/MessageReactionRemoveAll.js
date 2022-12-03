const { PartialsEnums, EventTypes } = require("../Util/Constants");
const BaseAction = require("./BaseAction");

class MessageReactionRemoveAll extends BaseAction {
    constructor(client, data) {
        super(client)
        this._patch(data)
    }

    async _patch(data) {
        const packet = data.d
        const channel = this.client.channels.cache.get(packet.channel_id)
        if(channel) {
            if(this.client.partials?.includes(PartialsEnums.Message)) await channel.messages.fetch(packet.message_id)
            let message = channel.messages.cache.get(packet.message_id)
            if(message) {
                message.reactions.cache.clear()
                return this.client.emit(EventTypes.MessageReactionRemoveAll, message)
            }
        }
    }
}

module.exports = MessageReactionRemoveAll