const { EventTypes } = require("../Util/Constants");
const BaseAction = require("./BaseAction");

class UserUpdate extends BaseAction {
    constructor(client, data) {
        super(client)
        this._patch(data)
    }

    _patch(data) {
        const packet = data.d
        const oldUser = this.client.users.cache.get(packet.id)
        const newUser = this.client.users._add(packet, { cache: true, force: true })
        if(oldUser?.equals(newUser)) return;
        return this.client.emit(EventTypes.UserUpdate, oldUser, newUser)
    }
}

module.exports = UserUpdate