const { EventTypes, PartialsEnums } = require("../Util/Constants");
const BaseAction = require("./BaseAction");

class MessageCreate extends BaseAction {
    constructor(client, data) {
        super(client)
        this._patch(data)
    }

    async _patch(data) {
        const packet = data.d
        if(this.client.partials?.includes(PartialsEnums.Channel) && !this.client.channels.cache.has(packet.channel_id)) await this.cacher.cacheDm(packet.channel_id)
        const channel = this.client.channels.cache.get(packet.channel_id)
        const message = channel?.messages._add(packet, { cache: true }, { id: packet.id })
        return this.client.emit(EventTypes.MessageCreate, message)
    }
}

module.exports = MessageCreate