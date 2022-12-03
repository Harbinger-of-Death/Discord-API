const { EventTypes } = require("../Util/Constants");
const BaseAction = require("./BaseAction");

class InviteDelete extends BaseAction {
    constructor(client, data) {
        super(client)
        this._patch(data)
    }

    _patch(data) {
        const packet = data.d
        const guild = this.client.guilds.cache.get(packet.guild_id)
        if(guild) {
            const invite = guild.invites.cache.get(packet.code)
            if(invite) {
                this.client.emit(EventTypes.InviteDelete, invite)
                return guild.invites.cache.delete(packet.code)
            }
        }
    }


}

module.exports = InviteDelete