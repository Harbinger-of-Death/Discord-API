const Base = require("../Base/base");
const Permissions = require("../Util/Permissions");
class PartialRole extends Base {
    constructor(data = {}, client) {
        super(client)
        this.id = data.id ?? null
        this.name = data.name ?? null
        this.color = data.color ?? null
        this.hoist = data.hoist ?? null
        this.permissions = new Permissions(data.permissions ? BigInt(data.permissions) : 0n).freeze()
        this.mentionable = data.mentionable ?? null
    }
}

module.exports = PartialRole