const { EventTypes } = require("../Util/Constants");
const BaseAction = require("./BaseAction");
class GuildRoleCreate extends BaseAction {
    constructor(client, data) {
        super(client)

        this._patch(data)
    }

    _patch(data) {
        const packet = data.d
        const guild = this.client.guilds.cache.get(packet.guild_id)
        const role = guild?.roles._add(packet.role, { cache: true, force: true })
        return this.client.emit(EventTypes.GuildRoleCreate, role)
    }
}

module.exports = GuildRoleCreate