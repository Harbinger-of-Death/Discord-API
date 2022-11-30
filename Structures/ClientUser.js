const { OpCodes } = require("../Util/Constants");
const User = require("./User");
class ClientUser extends User {
    constructor(data = {}, client) {
        super(data, client)
    }

    async edit(options = {}) {
        return await this.client.users.edit(options)
    }

    async setUsername(username) {
        return await this.edit({ username })
    }

    async setAvatar(avatar) {
        return await this.edit({ avatar })
    }

    setPresence(presence = {}) {
        return this.client.ws.send({
            op: OpCodes.PresenceUpdate,
            d: this.client.ws.parsePresence(presence)
        })
    }
}

module.exports = ClientUser