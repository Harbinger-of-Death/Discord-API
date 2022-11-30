const Base = require("../Base/base");
const Collection = require("../Util/Collection");

class MessageMentions extends Base {
    constructor(data = {}, guildId, client) {
        super(client)
        this.guildId = guildId ?? null
        this.users = new Collection(data.mentions?.map(o => [o.id, this.client.users._add(o, { cache: true }, { id: o.id })]))
        this.members = new Collection(data.mentions?.map(o => [o.id, this.guild?.members._add(o.member, { cache: true }, { id: o.id })]))
        this.roles = new Collection(data.roles?.map(o => [o, this.guild?.roles.cache.get(o)]))
        this.channels = new Collection(data.channels?.map(o => {
            const channelId = o.replace(/[^\d]+/gi, "")
            return [channelId, this.client.channels.cache.get(channelId)]
        }))
        this._crossPostedChannels = new Collection(data.crossPostedChannels?.map(o => [o.id, { id: o.id, type: o.type, guildId: o.guild_id, name: o.name }]))
        this.everyone = data.everyone ?? null
        if(data.reference) {
            this.repliedUser = data.reference.message?.author ?? null
        }
    }


    get guild() {
        return this.client.guilds.cache.get(this.guildId) ?? null
    }
}

module.exports = MessageMentions