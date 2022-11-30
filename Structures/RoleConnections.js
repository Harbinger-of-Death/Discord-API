const Base = require("../Base/base");
class RoleConnections extends Base {
    constructor(data = {}, client) {
        super(client)
        this.platformName = data.platform_name ?? null
        this.platformUsername = data.platform_username ?? null
        this.metadata = data.metadata ? {} : null
        if(this.metadata) {
            if("key" in data.metadata) this.metadata.key = data.metadata.key
            if("name" in data.metadata) this.metadata.name = data.metadata.name
            if("type" in data.metadata) this.metadata.type = data.metadata.type
            if("description" in data.metadata) this.metadata.description = data.metadata.description
            if("name_localizations" in data.metadata) this.metadata.nameLocalizations = data.metadata.name_localizations
            if("description_localizations" in data.metadata) this.metadata.descriptionLocalizations = data.metadata.description_localizations
        }
    }
}

module.exports = RoleConnections