const { EventTypes } = require("../Util/Constants");
const BaseAction = require("./BaseAction");

class IntegrationUpdate extends BaseAction {
    constructor(data = {}, client) {
        super(client)
        this._patch(data)
    }

    _patch(data) {
        const packet = data.d
        const guild = this.client.guilds.cache.get(packet.guild_id)
        if(guild) {
            const oldIntegration = guild.integrations.cache.get(packet.id)
            const newIntegration = guild.integrations._add(packet, { cache: true, force: true })
            return this.client.emit(EventTypes.IntegrationUpdate, oldIntegration, newIntegration)
        }
    }
}

module.exports = IntegrationUpdate