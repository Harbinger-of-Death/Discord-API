const { EventTypes } = require("../Util/Constants");
const BaseAction = require("./BaseAction");

class MessageUpdate extends BaseAction {
    constructor(data = {}, client) {
        super(client)
        this._patch(data)
    }

    _patch(data) {
        const packet = data.d
        const channel = this.client.channels.cache.get(packet.channel_id)
        const oldMessage = channel?.messages.cache.get(packet.id)
        const newMessage = channel?.messages._add(packet, { cache: true, force: true })
        return this.client.emit(EventTypes.MessageUpdate, oldMessage, newMessage)
    }
}

module.exports = MessageUpdate