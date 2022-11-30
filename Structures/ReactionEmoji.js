const Base = require("../Base/base");

class ReactionEmoji extends Base {
    constructor(data = {}, guildId, reaction, client) {
        super(client)
        this.id = data.id ?? null
        this.name = data.name ?? null
        this.animated = data.animated ?? null
        this.guildId = guildId ?? null
        this.reaction = reaction ?? null
    }

    get emoji() {
        return this.guild?.emojis.cache.get(this.id) ?? null
    }

    get guild() {
        return this.client.guilds.cache.get(this.guildId) ?? null
    }
}

module.exports = ReactionEmoji