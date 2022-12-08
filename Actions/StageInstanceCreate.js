const { EventTypes } = require("../Util/Constants");
const BaseAction = require("./BaseAction");

class StageInstanceCreate extends BaseAction {
    constructor(client, data) {
        super(client)
        this._patch(data)
    }

    _patch(data) {
        const packet = data.d
        const guild = this.client.guilds.cache.get(packet.guild_id)
        if(!guild) return;
        const stageInstance = guild.stageInstances._add(packet, { cache: true })
        return this.client.emit(EventTypes.StageInstanceCreate, stageInstance)
    }
}

module.exports = StageInstanceCreate