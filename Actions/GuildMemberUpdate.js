const { EventTypes } = require("../Util/Constants");
const BaseAction = require("./BaseAction");

class GuildMemberUpdate extends BaseAction {
    constructor(data = {}, client) {
        super(client)

        this._patch(data)
    }

    _patch(data) {
        const packet = data.d
        const guild = this.client.guilds.cache.get(packet.guild_id)
        if(guild) {
            const oldMember = guild.members.cache.get(packet.user?.id)
            const newMember = guild.members._add(packet, { cache: true, force: true }, { id: packet.user?.id })
            if(oldMember?.equals(newMember)) return;
            return this.client.emit(EventTypes.GuildMemberUpdate, oldMember, newMember)
        }
    }
}

module.exports = GuildMemberUpdate