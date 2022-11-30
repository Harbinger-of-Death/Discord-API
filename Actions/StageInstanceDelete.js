const { EventTypes } = require("../Util/Constants");
const BaseAction = require("./BaseAction");

class StageInstanceDelete extends BaseAction {
    constructor(data = {}, client) {
        super(client)
        this._patch(data)
    }

    _patch(data) {
        const packet = data.d
        const guild = this.client.guilds.cache.get(packet.guild_id)
        const stageInstance = guild.stageInstances.cache.get(packet.id)
        if(stageInstance) {
            this.client.emit(EventTypes.StageInstanceDelete, stageInstance)
            return guild.stageInstances.cache.delete(packet.id)
        }
    }
}

module.exports = StageInstanceDelete