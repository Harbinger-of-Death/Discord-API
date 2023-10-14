const { EventTypes } = require("../Util/Constants");
const BaseAction = require("./BaseAction");

class VoiceChannelStatusUpdate extends BaseAction {
    constructor(client, data) {
        super(client)
        this._patch(data)
    }

    _patch(data) {
        const packet = data.d
        const oldChannel = this.client.channels.cache.get(packet.id)
        const newChannel = this.client.channels._add({
            ...oldChannel,
            status: packet.status
        }, { cache: true, force: true }, { guildId: packet.guild_id })
        if(oldChannel?.equals(newChannel)) return;
        return this.client.emit(EventTypes.VoiceChannelStatusUpdate, oldChannel, newChannel)
    }
}

module.exports = VoiceChannelStatusUpdate