const { PartialsEnums, EventTypes } = require("../Util/Constants");
const BaseAction = require("./BaseAction");
class MessageReactionRemove extends BaseAction {
    constructor(data = {}, client) {
        super(client)

        this._patch(data)
    }

    async _patch(data) {
        const packet = data.d
        const channel = this.client.channels.cache.get(packet.channel_id)
        if(channel) {
            const oldMessage = channel.messages.cache.get(packet.message_id)
            if(this.client.partials?.includes(PartialsEnums.Message) && !oldMessage) await channel.messages.fetch(packet.message_id)
            const message = channel.messages.cache.get(packet.message_id)
            if(message) {
                const reactionId = packet.emoji?.id ?? packet.emoji?.name
                const user = this.client.users.cache.get(packet.user_id ?? packet.member.user?.id)
                let reaction = message.reactions.cache.get(reactionId)
                if(reaction) {
                    if(reaction.count !== 0 && oldMessage) reaction.count--
                    reaction.users.cache.delete(user?.id)
                    this.client.emit(EventTypes.MessageReactionRemove, reaction, user)
                    if(reaction.count <= 0) {
                        reaction.users.cache.clear()
                        return message.reactions.cache.delete(reactionId)
                    }
                }
            }
        }
    }   
}

module.exports = MessageReactionRemove