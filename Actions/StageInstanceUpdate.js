const { EventTypes } = require("../Util/Constants");
const BaseAction = require("./BaseAction");

class StageInstanceUpdate extends BaseAction {
    constructor(client, data) {
        super(client)
        this._patch(data)
    }

    _patch(data) {
        const packet = data.d
        const guild = this.client.guilds.cache.get(packet.guild_id)
        const oldStageInstance = guild.stageInstances.cache.get(packet.id)
        const newStageInstance = guild.stageInstances._add(packet, { cache: true, force: true })
        if(oldStageInstance?.equals(newStageInstance)) return;
        return this.client.emit(EventTypes.StageInstanceUpdate, oldStageInstance, newStageInstance)
    }
}

module.exports = StageInstanceUpdate