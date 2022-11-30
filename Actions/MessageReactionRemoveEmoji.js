const { PartialsEnums, EventTypes } = require("../Util/Constants");
const BaseAction = require("./BaseAction");

class MessageReactionRemoveEmoji extends BaseAction {
    constructor(data = {}, client) {
        super(client)

        this._patch(data)
    }

    async _patch(data) {
        const packet = data.d
        const channel = this.client.channels.cache.get(packet.channel_id)
        if(channel) {
            if(this.client.partials?.includes(PartialsEnums.Message) && !channel.messages.cache.has(packet.message_id)) await channel.messages.fetch(packet.message_id)
            const message = channel.messages.cache.get(packet.message_id)
            if(message) {
                const reactionId = packet.emoji?.id ?? packet.emoji?.name
                const reaction = message.reactions.cache.get(reactionId)
                if(reaction) {
                    message.reactions.cache.delete(reactionId)
                    return this.client.emit(EventTypes.MessageReactionRemoveEmoji, reaction)
                }
            }
        }
    }
}

module.exports = MessageReactionRemoveEmoji