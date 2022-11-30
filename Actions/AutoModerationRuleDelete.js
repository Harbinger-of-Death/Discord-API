const { EventTypes } = require("../Util/Constants");
const BaseAction = require("./BaseAction");

class AutoModerationRuleDelete extends BaseAction {
    constructor(data = {}, client) {
        super(client)
        this._patch(data)
    }
 
    _patch(data) {
        const packet = data.d
        const guild = this.client.guilds.cache.get(packet.guild_id)
        this.client.emit(EventTypes.AutoModerationRuleDelete, guild?.automoderations.cache.get(packet.id) ?? null)
        return guild?.automoderations.cache.delete(packet.id)
    }
}

module.exports = AutoModerationRuleDelete