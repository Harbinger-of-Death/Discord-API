const { EventTypes } = require("../Util/Constants");
const BaseAction = require("./BaseAction");

class AutoModerationRuleUpdate extends BaseAction {
    constructor(data = {}, client) {
        super(client)
        this._patch(data)
    }
 
    _patch(data) {
        const packet = data.d
        const guild = this.client.guilds.cache.get(packet.guild_id)
        const oldRule = guild?.automoderations.cache.get(packet.id)
        const newRule = guild?.automoderations._add(packet, { cache: true, force: true }, { id: packet.id })
        return this.client.emit(EventTypes.AutoModerationRuleUpdate, oldRule, newRule)
    }
}

module.exports = AutoModerationRuleUpdate