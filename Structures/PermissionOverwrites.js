const Base = require("../Base/base");
const Permissions = require("../Util/Permissions");

class PermissionOverwrites extends Base {
    constructor(data = {}, client, extras) {
        super(client)

        this.id = data.id ?? null
        this.type = data.type ?? null
        this.allow = new Permissions(data.allow ? BigInt(data.allow) : 0n).freeze()
        this.deny = new Permissions(data.deny ? BigInt(data.deny) : 0n).freeze()
        this.channelId = extras?.channelId ?? null
    }

    get channel() {
        return this.client.channels.cache.get(this.channelId) ?? null
    }

    async edit(permissions, reason) {
        return await this.channel?.permissionOverwrites.edit(this.id, { type: this.type, permissions, reason })
    }

    async delete(reason) {
        return await this.channel?.permissionOverwrites.delete(this.id, reason)
    }

    equals(overwrites) {
        return this.allow.bitfield === overwrites?.allow.bitfield &&
        this.deny.bitfield === overwrites?.deny.bitfield
    }
}

module.exports = PermissionOverwrites