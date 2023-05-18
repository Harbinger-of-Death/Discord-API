const Base = require("../Base/base");
const RoleConnectionsMetadata = require("./RoleConnectionsMetadata");
class RoleConnections extends Base {
    constructor(data = {}, client) {
        super(client)
        this.platformName = data.platform_name ?? null
        this.platformUsername = data.platform_username ?? null
        this.metadata = new RoleConnectionsMetadata(data.metadata, this.client)
    }
}

module.exports = RoleConnections