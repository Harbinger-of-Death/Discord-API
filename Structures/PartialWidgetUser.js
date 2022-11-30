const Base = require("../Base/base");

class PartialWidgetUser extends Base {
    constructor(data = {}, client) {
        super(client)
        this.id = data.id ?? null
        this.username = data.username ?? null
        this.avatar = data.avatar ?? null
        this.status = data.status ?? null
        this.avatarURL = data.avatar_url ?? null
    }
}

module.exports = PartialWidgetUser;