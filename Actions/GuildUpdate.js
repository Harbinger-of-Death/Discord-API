const { EventTypes } = require("../Util/Constants");
const BaseAction = require("./BaseAction");
class GuildUpdate extends BaseAction {
    constructor(client, data) {
        super(client)

        this._patch(data)
    }

    _patch(data) {
        const packet = data.d
        const oldGuild = this.client.guilds.cache.get(packet.id)
        const newGuild = this.client.guilds._add(packet, { cache: true, force: true }, { id: packet.id })
        if(oldGuild?.equals(newGuild)) return;
        return this.client.emit(EventTypes.GuildUpdate, oldGuild ?? null, newGuild)
    }
}

module.exports = GuildUpdate