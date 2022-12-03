const Collection = require("../Util/Collection");
const { EventTypes } = require("../Util/Constants");
const BaseAction = require("./BaseAction");

class ThreadMembersUpdate extends BaseAction {
    constructor(client, data) {
        super(client)
        this._patch(data)
    }

    _patch(data) {
        const packet = data.d
        const thread = this.client.channels.cache.get(packet.id)
        if(thread) {
            const addedMembers = new Collection()
            const removedMembers = new Collection()
            if(packet.added_members?.length) {
                for(const val of packet.added_members) {
                    addedMembers.set(val.user_id, thread.members._add(val, { cache: true }))
                }
            }

            if(packet.removed_member_ids?.length) {
                for(const member of packet.removed_member_ids) {
                    const cachedMember = thread.members.cache.get(member)
                    if(cachedMember) {
                        removedMembers.set(member, cachedMember)
                        thread.members.cache.delete(member)
                    }
                }
            }

            return this.client.emit(EventTypes.ThreadMembersUpdate, addedMembers, removedMembers)
        }
    }
}

module.exports = ThreadMembersUpdate