const { EventTypes } = require("../Util/Constants");
const BaseAction = require("./BaseAction");

class GuildMemberAdd extends BaseAction {
    constructor(client, data) {
        super(client)

        this._patch(data)
    }

    _patch(data) {
        const packet = data.d
        const guild = this.client.guilds.cache.get(packet.guild_id)
        if(guild) return this.client.emit(EventTypes.GuildMemberAdd, guild.members._add(packet, { cache: true }, { id: packet.user?.id }))
    }

}

module.exports = GuildMemberAdd