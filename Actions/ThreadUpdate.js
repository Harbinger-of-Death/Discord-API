const { EventTypes } = require("../Util/Constants");
const BaseAction = require("./BaseAction");

class ThreadUpdate extends BaseAction {
    constructor(data = {}, client) {
        super(client)
        this._patch(data)
    }

    _patch(data) {
        const packet = data.d
        const oldThread = this.client.channels.cache.get(packet.id)
        const newThread = this.client.channels._add(packet, { cache: true, force: true })
        this.client.channels.cache.get(packet.parent_id)?.threads._add(packet, { cache: true, force: true })
        if(oldThread?.equals(newThread)) return;
        return this.client.emit(EventTypes.ThreadUpdate, oldThread, newThread)
    }
}

module.exports = ThreadUpdate