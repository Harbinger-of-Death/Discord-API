const { EventTypes } = require("../Util/Constants");
const BaseAction = require("./BaseAction");

class GuildBanAdd extends BaseAction {
    constructor(client, data) {
        super(client)
        this._patch(data)
    }

    _patch(data) {
        const packet = data.d
        const guild = this.client.guilds.cache.get(packet.guild_id)
        if(guild) {
            const ban = guild.bans._add(packet, { cache: true }, { id: packet.user?.id })
            return this.client.emit(EventTypes.GuildBanAdd, ban)
        }
    }
}

module.exports = GuildBanAdd