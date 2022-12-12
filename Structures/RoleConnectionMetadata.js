const Base = require("../Base/base");

class RoleConnectionMetadata extends Base {
    constructor(data = {}, client) {
        super(client)
        this.type = data.type ?? null
        this.key = data.key ?? null
        this.name = data.name ?? null
        this.nameLocalizations = data.name_localizations ?? null
        this.description = data.description ?? null
        this.descriptionLocalizations = data.description_localizations ?? null
    }
}

module.exports = RoleConnectionMetadata