const { EventTypes } = require("../Util/Constants");
const BaseAction = require("./BaseAction");

class ThreadCreate extends BaseAction {
    constructor(client, data) {
        super(client)
        this._patch(data)
    }

    _patch(data) {
        const packet = data.d
        this.client.guilds.cache.get(packet.guild_id)?.channels._add(packet, { cache: true })
        const thread = this.client.channels._add(packet, { cache: true})
        this.client.channels.cache.get(packet.parent_id)?.threads._add(packet, { cache: true })
        return this.client.emit(EventTypes.ThreadCreate, thread)
    }
}

module.exports = ThreadCreate