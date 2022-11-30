const Base = require("../Base/base");

class MessageInteraction extends Base {
    constructor(data = {}, guildId, client) {
        super(client)
        this.type = data.type ?? null
        this.id = data.id ?? null
        this.name = data.name ?? null
        this.guildId = guildId ?? null
        this.user = this.client.users._add(data.user)
        this.member = this.guild?.members._add({ id: data.user?.id, ...data.member })
    }

    get guild() {
        return this.client.guilds.cache.get(this.guildId) ?? null
    }
}

module.exports = MessageInteraction