const MessageReaction = require("../Structures/MessageReaction");
const { PartialsEnums, EventTypes } = require("../Util/Constants");
const BaseAction = require("./BaseAction");
class MessageReactionAdd extends BaseAction {
    constructor(client, data) {
        super(client)

        this._patch(data)
    }

    async _patch(data) {
        const packet = data.d
        const channel = this.client.channels.cache.get(packet.channel_id)
        if(channel) {
            const reactionId = packet.emoji?.id ?? packet.emoji?.name
            const oldMessage = channel.messages.cache.get(packet.message_id)
            if(this.client.partials?.includes(PartialsEnums.Message) && !oldMessage) await channel.messages.fetch(packet.message_id)
            const message = channel.messages.cache.get(packet.message_id)
            const user = this.client.users.cache.get(packet.user_id)
            if(message) {
                let reaction = message.reactions.cache.get(reactionId)
                if(reaction) {
                    if(reaction.count && oldMessage) reaction.count += 1
                    if(this.client.user.id === user?.id) reaction.me = true
                    reaction.users._add(user, { cache: true })
                    return this.client.emit(EventTypes.MessageReactionAdd, reaction, user)
                } else {
                    const newReaction = message.reactions._add({ count: 1, me: this.client.user.id === user?.id, ...packet }, { cache: true })
                    newReaction.users._add(user, { cache: true })
                    return this.client.emit(EventTypes.MessageReactionAdd, newReaction, user)
                }
            }
        }
    }   
}

module.exports = MessageReactionAdd