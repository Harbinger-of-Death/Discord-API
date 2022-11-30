const { EventTypes } = require("../Util/Constants");
const BaseAction = require("./BaseAction");

class GuildBanAdd extends BaseAction {
    constructor(data = {}, client) {
        super(client)
        this._patch(data)
    }

    _patch(data) {
        const packet = data.d
        const guild = this.client.guilds.cache.get(packet.guild_id)
        if(guild) {
            const ban = guild.bans._add(packet, { cache: true })
            return this.client.emit(EventTypes.GuildBanAdd, ban)
        }
    }
}

module.exports = GuildBanAdd