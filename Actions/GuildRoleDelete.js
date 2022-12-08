const { EventTypes } = require("../Util/Constants");
const BaseAction = require("./BaseAction");
class GuildRoleDelete extends BaseAction {
    constructor(client, data) {
        super(client)
        this._patch(data)
    }

    _patch(data) {
        const packet = data.d
        const guild = this.client.guilds.cache.get(packet.guild_id)
        const role = guild.roles.cache.get(packet.role_id)
        if(role) {
            this.client.emit(EventTypes.GuildRoleDelete, role)
            guild.roles.cache.delete(packet.role_id)
        }
    }
}

module.exports = GuildRoleDelete