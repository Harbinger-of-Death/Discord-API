const Base = require("../../Base/base");
class Cacher extends Base {
    constructor(client) {
        super(client)
    }

    cacheEmojis(guild) {
        const guildId = guild.id
        for(const emoji of guild.emojis) {
            this.client.emojis._add(emoji, { cache: true }, { guildId })
        }
    }

    cacheChannels(guild) {
        const guildId = guild.id
        for(const channels of guild.channels) {
            this.client.channels._add(channels, { cache: true }, { guildId })
            for(const threads of guild.threads) {
                this.client.channels._add(threads, { cache: true }, { guildId })
            }
        }

        return;
    }

    async cacheDm(channelId) {
        const dmChannel = await this.client.api.get(`${this.client.root}/channels/${channelId}`)
        return this.client.channels._add(dmChannel, { cache: true })
    }

}

module.exports = Cacher