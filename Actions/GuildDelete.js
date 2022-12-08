const { EventTypes } = require("../Util/Constants");
const BaseAction = require("./BaseAction");

class GuildDelete extends BaseAction {
    constructor(client, data) {
        super(client)

        this._patch(data)
    }

    _patch(data) {
        const packet = data.d
        const guild = this.client.guilds.cache.get(packet.id)
        if(guild) {
            if(guild.unavailable) this.client.emit(EventTypes.GuildUnavailable, guild)
            else this.client.emit(EventTypes.GuildDelete, guild)
            for(const key of guild.channels.cache.keys()) this.client.channels.cache.delete(key)
            return this.client.guilds.cache.delete(packet.id)
        }
    }
}

module.exports = GuildDelete