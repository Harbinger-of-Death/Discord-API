const { EventTypes } = require("../Util/Constants");
const BaseAction = require("./BaseAction");
class AutoModerationRuleCreate extends BaseAction {
    constructor(data = {}, client) {
        super(client)
        this._patch(data)
    }
 
    _patch(data) {
        const packet = data.d
        const guild = this.client.guilds.cache.get(packet.guild_id)
        const rule = guild?.automoderations._add(packet, { cache: true })
        return this.client.emit(EventTypes.AutoModerationRuleCreate, rule)
    }
}

module.exports = AutoModerationRuleCreate