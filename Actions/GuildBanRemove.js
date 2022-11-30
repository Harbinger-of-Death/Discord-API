const { EventTypes } = require("../Util/Constants");
const BaseAction = require("./BaseAction");

class GuildBanRemove extends BaseAction {
    constructor(data = {}, client) {
        super(client)
        this._patch(data)
    }

    _patch(data) {
        const packet = data.d
        const guild = this.client.guilds.cache.get(packet.guild_id)
        if(guild) {
            const ban = guild.bans.cache.get(packet.user?.id)
            if(ban) {
                this.client.emit(EventTypes.GuildBanRemove)
                return guild.bans.cache.delete(packet.user?.id)
            }
        }
    }
}

module.exports = GuildBanRemove