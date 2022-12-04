const Base = require("../Base/base");
const Collection = require("../Util/Collection");

class MessageMentions extends Base {
    constructor(data = {}, guildId, client) {
        super(client)
        Object.defineProperty(this, "_content", { value: data.content })
        this.guildId = guildId ?? null
        this.members = new Collection()
        this.users = new Collection(data.mentions?.map(o => {
            this.members.set(o.id, this.guild?.members._add({ user: o, ...o.member }, { cache: true, force: true }))
            return [o.id, this.client.users._add(o, { cache: true, force: true })]
        }))
        this.roles = new Collection(data.roles?.map(o => [o, this.guild?.roles.cache.get(o)]))
        this._crossPostedChannels = new Collection(data.crossPostedChannels?.map(o => [o.id, { id: o.id, type: o.type, guildId: o.guild_id, name: o.name }]))
        this.everyone = data.everyone ?? null
        if(data.reference) {
            this.repliedUser = data.reference.message?.author ?? null
        }
    }

    get channels() {
        this._channels = new Collection()
        const content = this._content
        if(/<#\d{17,19}>/g.test(content)) {
            const matched = content.match(/<#\d{17,19}>/g)
            matched.forEach(val => {
                const id = val.match(/(\d{17,19})/)
                this._channels.set(id[1], this.client.channels.cache.get(id[1]))
            })
        }

        return this._channels
    }

    get guild() {
        return this.client.guilds.cache.get(this.guildId) ?? null
    }
}

module.exports = MessageMentions