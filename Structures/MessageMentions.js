const Base = require("../Base/base");
const Collection = require("../Util/Collection");

class MessageMentions extends Base {
    constructor(data = {}, guildId, client) {
        super(client)
        Object.defineProperties(this, {
            _content: { value: data.content },
            _mentions: { value: data.mentions },
            _roles: { value: data.roles },
        })
        this.guildId = guildId ?? null
        this._crossPostedChannels = new Collection(data.crossPostedChannels?.map(o => [o.id, { id: o.id, type: o.type, guildId: o.guild_id, name: o.name }]))
        this.everyone = data.everyone ?? null
        if(data.reference) {
            this.repliedUser = data.reference.message?.author ?? null
        }
    }

    get members() {
        this._members = new Collection()
        if(this._mentions?.length) this._mentions.map(o => this._members.set(o.id, this.guild?.members._add({ user: o, ...o.member }, { cache: true })))

        return this._members
    }

    get users() {
        this._users = new Collection()
        if(this._mentions?.length) this._mentions.map(o => this._users.set(o.id, this.client.users._add(o)))
        return this._users
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