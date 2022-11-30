const Base = require("../Base/base");
class PartialInviteChannel extends Base {
    constructor(data = {}, client) {
        super(client)
        this.id = data.id ?? null
        this.name = data.name ?? null
        this.type = data.type ?? null
    }
}

module.exports = PartialInviteChannel