const ApplicationCommandManager = require("./ApplicationCommandManager");
const GuildApplicationCommandPermissionsManager = require("./GuildApplicationCommandPermissionsManager");
class GuildApplicationCommandManager extends ApplicationCommandManager {
    constructor(guildId, client) {
        super(client, { guildId })
        this.guildId = guildId ?? null
        this.permissions = new GuildApplicationCommandPermissionsManager(this.guildId, null, this.client)
    }
}

module.exports = GuildApplicationCommandManager