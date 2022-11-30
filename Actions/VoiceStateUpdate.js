const { EventTypes } = require("../Util/Constants");
const BaseAction = require("./BaseAction");

class VoiceStateUpdate extends BaseAction {
    constructor(data = {}, client) {
        super(client)
        this._patch(data)
    }

    _patch(data) {
        const packet = data.d
        const guild = this.client.guilds.cache.get(packet.guild_id)
        if(guild) {
            const oldState = guild.voiceStates.cache.get(packet.user_id)
            const newState = guild.voiceStates._add(packet, { cache: true, force: true })
            if(oldState?.equals(newState)) return;
            if(packet.channel_id === null) guild.voiceStates.cache.delete(packet.user_id)
            return this.client.emit(EventTypes.VoiceStateUpdate, oldState ?? null, newState)
        }
    }
}

module.exports = VoiceStateUpdate