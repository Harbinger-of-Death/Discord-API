const DmBasedChannels = require("./DMBasedChannels");
class DMChannel extends DmBasedChannels {
    constructor(data = {}, client) {
        super(data, client)
        this.recipientId = this.recipients.first()?.id ?? null
    }
}

module.exports = DMChannel