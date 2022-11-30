const { EventTypes } = require("../Util/Constants");
const BaseAction = require("./BaseAction");

class ChannelCreate extends BaseAction {
    constructor(data = {}, client) {
        super(client)

        this._patch(data)
    }

    _patch(data) {
        const packet = data.d
        const channel = this.client.channels._add(packet, { cache: true }, { guildId: packet.guild_id, id: packet.id })
        return this.client.emit(EventTypes.ChannelCreate, channel)
    }
}

module.exports = ChannelCreate