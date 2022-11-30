const Base = require("../Base/base");

class PartialChannel extends Base {
    constructor(data = {}, client) {
        super(client)
        this.name = data.name ?? null
        this.position = data.position ?? null
        this.topic = data.topic ?? null
        this.bitrate = data.bitrate ?? null
        this.userLimit = data.user_limit ?? null
        this.nsfw = data.nsfw ?? null
        this.rateLimitPerUser = data.rate_limit_per_user ?? null
        this.parentId = data.parent_id ?? null
        this.permissionOverwrites = data.permission_overwrites ?? []
        this.id = data.id ?? null
        this.type = data.type ?? null
    }
}

module.exports = PartialChannel