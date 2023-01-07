const Base = require("../Base/base");

class RoleConnectionsMetadata extends Base {
    constructor(data = {}, client) {
        super(client)
        this._patch(data)
    }

    _patch(data) {
        if("type" in data) this.type = data.type
        if("key" in data) this.key = data.key
        if("name" in data) this.name = data.name
        if("name_localizations" in data) this.nameLocalizations = data.name_localizations
        if("description" in data) this.description = data.description
        if("description_localizations" in data) this.descriptionLocalizations = data.description_localizations
    }

    toJSON() {
        return {
            type: this.type.toString(),
            name: this.name,
            description: this.description,
            key: this.key,
            name_localizations: this.nameLocalizations,
            description_localizations: this.descriptionLocalizations
        }
    }
}

module.exports = RoleConnectionsMetadata