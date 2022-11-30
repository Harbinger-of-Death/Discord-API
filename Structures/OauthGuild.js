const Base = require("../Base/base");
const Permissions = require("../Util/Permissions");
const Snowflake = require("../Util/Snowflake");

class OauthGuild extends Base {
    constructor(data = {}, client) {
        super(client)
        this.id = data.id ?? null
        this.name = data.name ?? null
        this.icon = data.icon ?? null
        this.owner = data.owner ?? null
        this.permissions = new Permissions(data.permissions ? BigInt(data.permissions) : 0n).freeze()
        this.features = data.features ?? []
        this.createdAt = data.id ? Snowflake.deconstruct(data.id).createdAt : null
        this.createdTimestamp = this.createdAt?.getTime() ?? null
    }

    iconURL(options = {}) {
        if(!this.icon) return null;
        return this.client.cdn.GuildIcon(this.icon, options.extension, options.size, options.forceStatic, this.id)
    }
}

module.exports = OauthGuild