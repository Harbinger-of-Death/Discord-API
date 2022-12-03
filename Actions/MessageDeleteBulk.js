const Collection = require("../Util/Collection");
const { EventTypes } = require("../Util/Constants");
const BaseAction = require("./BaseAction");

class MessageDeleteBulk extends BaseAction {
    constructor(client, data) {
        super(client)
        this._patch(data)
    }

    _patch(data) {
        const packet = data.d
        const channel = this.client.channels.cache.get(packet.channel_id)
        const messages = new Collection(packet.ids?.map(o => [o, channel?.messages._add(o, { cache: false })]))
        this.client.emit(EventTypes.MessageDeleteBulk, messages)
        for(const key of channel?.messages.cache.keys()) {
            channel?.messages.cache.delete(key)
        }
        return;
    }
}

module.exports = MessageDeleteBulk