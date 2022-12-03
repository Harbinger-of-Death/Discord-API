const { EventTypes } = require("../Util/Constants");
const BaseAction = require("./BaseAction");

class PresenceUpdate extends BaseAction {
    constructor(client, data) {
        super(client)
        this._patch(data)
    }

    _patch(data) {
        const packet = data.d
        const guild = this.client.guilds.cache.get(packet.guild_id)
        const cachedUser = this.client.users.cache.get(packet.user?.id)
        if(!cachedUser) this.client.users._add(packet.user, { cache: true })
        if(guild) {
            const oldPresence = guild.presences.cache.get(packet.user?.id)
            const newPresence = guild.presences._add(packet, { cache: true, force: true })
            if(!oldPresence?.equals(newPresence)) {
                this.client.emit(EventTypes.PresenceUpdate, oldPresence, newPresence)
                if(packet.status === "offline") guild.presences.cache.delete(packet.user?.id)
                return;
            }
        }
    }
}

module.exports = PresenceUpdate