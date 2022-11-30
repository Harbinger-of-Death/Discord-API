const { EventTypes } = require("../Util/Constants");
const BaseAction = require("./BaseAction");

class ChannelDelete extends BaseAction {
    constructor(data = {}, client) {
        super(client)

        this._patch(data)
    }

    _patch(data) {
        const packet = data.d
        const channel = this.client.channels.cache.get(packet.id)
        if(channel) {
            this.client.emit(EventTypes.ChannelDelete, channel)
            if(packet.guild_id) this.client.guilds.cache.get(packet.guild_id)?.channels.cache.delete(packet.id)
            return this.client.channels.cache.delete(packet.id)
        }
    }
}

module.exports = ChannelDelete