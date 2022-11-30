const { EventTypes } = require("../Util/Constants");
const BaseAction = require("./BaseAction");

class GuildRoleUpdate extends BaseAction {
    constructor(data = {}, client) {
        super(client)

        this._patch(data)
    }

    _patch(data) {
        const packet = data.d
        const guild = this.client.guilds.cache.get(packet.guild_id)
        const oldRole = guild.roles.cache.get(packet.role?.id)
        const newRole = guild.roles._add(packet.role, { cache: true, force: true }, { id: packet.role?.id })
        if(oldRole?.equals(newRole)) return;
        return this.client.emit(EventTypes.GuildRoleUpdate, oldRole, newRole)
    }
}

module.exports = GuildRoleUpdate