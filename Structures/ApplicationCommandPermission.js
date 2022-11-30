const Base = require("../Base/base");
const Collection = require("../Util/Collection");

class ApplicationCommandPermission extends Base {
    constructor(data = {}, client, extras) {
        super(client)
        this.partial = data.partial ?? false
        this.commandId = data.id ?? extras?.commandId ?? null
        this.applicationId = data.application_id ?? null
        this.guildId = data.guild_id ?? extras?.guildId ?? null
        this.permissions = new Collection(data.permissions?.map(o => [o.id, ApplicationCommandPermission.parsePermissions(o)]))
    }

    get guild() {
        return this.client.guilds.cache.get(this.guildId) ?? null
    }

    get command() {
        return this.guild?.commands.cache.get(this.commandId) ?? null
    }

    static parsePermissions(permissions = {}) {
        return {
            id: permissions.id,
            type: permissions.type,
            permission: permissions.permission
        }
    }

}

module.exports = ApplicationCommandPermission