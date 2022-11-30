const DmBasedChannels = require("./DMBasedChannels");

class GroupDMChannel extends DmBasedChannels {
    constructor(data = {}, client) {
        super(data, client)
        this.applicationId = data.application_id ?? null
        this.icon = data.icon ?? null
        this.ownerId = data.owner_id ?? null
    }

    async fetchOwner(options = {}) {
        return await this.client.users.fetch(this.ownerId, options)
    }

    iconURL(options = {}) {
        if(!this.icon) return null;
        return this.client.cdn.ApplicationIcon(this.icon, options.extension, options.size, this.applicationId)
    }
}

module.exports = GroupDMChannel