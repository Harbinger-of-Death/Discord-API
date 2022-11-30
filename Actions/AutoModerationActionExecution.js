const AutoModerationRuleAction = require("../Structures/AutoModerationRuleAction");
const { EventTypes } = require("../Util/Constants");
const BaseAction = require("./BaseAction");

class AutoModerationActionExecution extends BaseAction {
    constructor(data = {}, client) {
        super(client)
        this._patch(data)
    }

    _patch(data) {
        const packet = data.d
        const action = new AutoModerationRuleAction(packet, packet.guild_id, this.client)
        return this.client.emit(EventTypes.AutoModerationActionExecution, action)
    }
}

module.exports = AutoModerationActionExecution