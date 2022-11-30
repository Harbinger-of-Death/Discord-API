const { EventTypes } = require("../Util/Constants");
const BaseAction = require("./BaseAction");

class GuildStickersUpdate extends BaseAction {
    constructor(data = {}, client) {
        super(client)
        this._patch(data)
    }

    _patch(data) {
        const packet = data.d
        const guild = this.client.guilds.cache.get(packet.guild_id)
        const manager = guild.stickers
        const deletion = new Map(guild?.stickers.cache)
        for(const val of packet.stickers) {
            const sticker = manager.cache.get(val.id)
            if(sticker) {
                deletion.delete(val.id)
                if(!sticker?.equals(val)) return this.client.emit(EventTypes.StickersUpdate, sticker, manager._add(val, { cache: true, force: true }))
            } else if(!sticker && val) return this.client.emit(EventTypes.StickersCreate, manager._add(val, { cache: true }))
        }

        for(const key of deletion.keys()) {
            this.client.emit(EventTypes.StickersDelete, manager.cache.get(key))
            manager.cache.delete(key)
        }

    }
}

module.exports = GuildStickersUpdate