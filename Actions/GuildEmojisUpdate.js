const { EventTypes } = require("../Util/Constants");
const BaseAction = require("./BaseAction");

class GuildEmojisUpdate extends BaseAction {
    constructor(client, data) {
        super(client)
        this._patch(data)
    }

    _patch(data) {
        const packet = data.d
        const guild = this.client.guilds.cache.get(packet.guild_id)
        if(guild) {
            const deletion = new Map(guild.emojis.cache)
            for(const val of packet.emojis) {
                const cachedEmoji = guild.emojis.cache.get(val.id)
                if(cachedEmoji) {
                    deletion.delete(val.id)
                    if(!cachedEmoji.equals(val)) {
                        return this.client.emit(EventTypes.EmojiUpdate, cachedEmoji, this.client.emojis._add(val, { cache: true, force: true }, { guildId: packet.guild_id, id: val.id }))}
                }
                if(!cachedEmoji && val) {
                    return this.client.emit(EventTypes.EmojiCreate, this.client.emojis._add(val, { cache: true, force: true }, { guildId: packet.guild_id, id: val.id }))}
            }

            for(const key of deletion.keys()) {
                this.client.emit(EventTypes.EmojiDelete, guild.emojis.cache.get(key))
                guild.emojis.cache.delete(key)
                this.client.emojis.cache.delete(key)
            }
        }
    }
}

module.exports = GuildEmojisUpdate