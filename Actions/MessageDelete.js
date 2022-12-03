const { EventTypes } = require("../Util/Constants");
const BaseAction = require("./BaseAction");

class MessageDelete extends BaseAction {
    constructor(client, data) {
        super(client)
        this._patch(data)
    }

    _patch(data) {
        const packet = data.d
        const channel = this.client.channels.cache.get(packet.channel_id)
        const message = channel?.messages.cache.get(packet.id)
        if(!message) return;
        this.client.emit(EventTypes.MessageDelete, message)
        return channel?.messages.cache.delete(packet.id)
    }
}

module.exports = MessageDelete