const { EventTypes } = require("../Util/Constants");
const BaseAction = require("./BaseAction");

class GuildIntegrationsUpdate extends BaseAction {
    constructor(client, data) {
        super(client)
        this._patch(data)
    }

    _patch(data) {
        const packet = data.d
        const guild = this.client.guilds.cache.get(packet.guild_id)
        if(guild) return this.client.emit(EventTypes.GuildIntegrationsUpdate, guild)
    }
}

module.exports = GuildIntegrationsUpdate