const Base = require("../Base/base");
const GuildIntegration = require("./GuildIntegration");

class OauthUserConnections extends Base {
    constructor(data = {}, client) {
        super(client)
        this.id = data.id ?? null
        this.name = data.name ?? null
        this.type = data.type ?? null
        this.revoked = data.revoked ?? null
        this.integrations = data.integrations?.map(o => [o.id, new GuildIntegration(o, this.client)]) ?? []
        this.verified = data.verified ?? null
        this.friendSync = data.friend_sync ?? null
        this.shownActivity = data.shown_activity ?? null
        this.twoWayLink = data.two_way_link ?? null
        this.visibility = data.visibility ?? null
    }
}

module.exports = OauthUserConnections