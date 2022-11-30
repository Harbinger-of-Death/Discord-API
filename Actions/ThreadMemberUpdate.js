const { EventTypes } = require("../Util/Constants");
const BaseAction = require("./BaseAction");

class ThreadMemberUpdate extends BaseAction {
    constructor(data = {}, client) {
        super(client)
        this._patch(data)
    }

    _patch(data) {
        const packet = data.d
        const channel = this.client.channels.cache.get(packet.id)
        if(channel) {
            const oldMember = channel.members.cache.get(packet.user_id)
            const newMember = channel.members._add(packet, { cache: true, force: true })
            return this.client.emit(EventTypes.ThreadMemberAdd, oldMember, newMember)
        }
    }
}

module.exports = ThreadMemberUpdate