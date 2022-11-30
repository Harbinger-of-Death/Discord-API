const Base = require("../Base/base");

class MessageActivity extends Base {
    constructor(data = {}, client) {
        super(client)
        this.type = data.type ?? null
        this.partyId = data.party_id ?? null
    }
}

module.exports = MessageActivity