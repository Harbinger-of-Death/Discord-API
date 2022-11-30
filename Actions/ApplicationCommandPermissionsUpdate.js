const { EventTypes, PartialsEnums } = require("../Util/Constants");
const BaseAction = require("./BaseAction");

class ApplicationCommandPermissionsUpdate extends BaseAction {
    constructor(data, client) {
        super(client)
        this._patch(data)
    }

    async _patch(data) {
        const packet = data.d
        const guild = this.client.guilds.cache.get(packet.guild_id)
        if(guild) {
            if(this.client.partials?.includes(PartialsEnums.ApplicationCommand)) await guild.commands.fetch(packet.id)
            const command = guild.commands.cache.get(packet.id)
            if(command) {
                const oldPermission = command.permissions.cache.get(packet.id)
                const newPermission = command.permissions._add(packet, { cache: true, force: true })
                return this.client.emit(EventTypes.ApplicationCommandPermissionsUpdate, oldPermission, newPermission)
            }
        }
    }
}

module.exports = ApplicationCommandPermissionsUpdate