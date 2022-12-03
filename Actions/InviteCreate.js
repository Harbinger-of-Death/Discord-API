const { EventTypes } = require("../Util/Constants");
const BaseAction = require("./BaseAction");

class InviteCreate extends BaseAction {
    constructor(client, data) {
        super(client)
        this._patch(data)
    }

    _patch(data) {
        const packet = data.d
        const guild = this.client.guilds.cache.get(packet.guild_id)
        if(guild) {
            const invite = guild.invites._add(packet, { cache: true })
            return this.client.emit(EventTypes.InviteCreate, invite)
        }
    }
}

module.exports = InviteCreate