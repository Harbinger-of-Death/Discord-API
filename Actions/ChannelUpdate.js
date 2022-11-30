const { EventTypes } = require("../Util/Constants");
const BaseAction = require("./BaseAction");

class ChannelUpdate extends BaseAction {
    constructor(data = {}, client) {
        super(client)

        this._patch(data)
    }

    _patch(data) {
        const packet = data.d
        const oldChannel = this.client.channels.cache.get(packet.id)
        const newChannel = this.client.channels._add(packet, { cache: true, force: true }, { guildId: packet.guild_id, id: packet.id })
        if(oldChannel?.equals(newChannel)) return;
        return this.client.emit(EventTypes.ChannelUpdate, oldChannel, newChannel)
    }
}

module.exports = ChannelUpdate