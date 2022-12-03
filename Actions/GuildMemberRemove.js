const { EventTypes } = require("../Util/Constants");
const BaseAction = require("./BaseAction");

class GuildMemberRemove extends BaseAction {
    constructor(client, data) {
        super(client)

        this._patch(data)
    }

    _patch(data) {
        const packet = data.d
        const guild = this.client.guilds.cache.get(packet.guild_id)
        if(guild) {
            const member = guild.members.cache.get(packet.user?.id)
            if(member) {
                this.client.emit(EventTypes.GuildMemberRemove, member)
                return guild.members.cache.delete(packet.user?.id)
            }
        }
    }
}

module.exports = GuildMemberRemove