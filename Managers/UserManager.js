const ClientUser = require("../Structures/ClientUser");
const OauthUser = require("../Structures/OauthUser");
const OauthUserConnections = require("../Structures/OauthUserConnections");
const User = require("../Structures/User");
const { SnowflakeRegex, ChannelTypesEnums } = require("../Util/Constants");
const Util = require("../Util/Util");
const CachedManager = require("./CachedManager");
class UserManager extends CachedManager {
    constructor(client) {
        super(User, client)
    }

    _add(users, options = { cache: true, force: false }) {
        if(this.client.user.id === users?.id) this.holds = ClientUser
        else this.holds = User
        return super._add(users, options)
    }

    async fetch(user, options = {}) {
        const { cache = true, force = false } = options
        let userId = user instanceof User ? user.id : user.id ?? user
        if(!SnowflakeRegex.test(userId)) throw new RangeError(`Invalid User`)
        if(this.cache.has(userId) && !force) return this.cache.get(userId)
        if(userId === this.client.user.id) userId = `@me`
        user = await this.client.api.get(`${this.client.root}/users/${userId}`)
        return this._add(user, { cache, force: true })
    }

    async edit(options = {}) {
        const body = { username: options.username, avatar: await Util.generateDataURI(options.avatar) }
        const user = await this.client.api.patch(`${this.client.root}/users/@me`, { body })
        return this._add(user)
    }

    async createDm(user, options = {}) {
        const userId = user instanceof User ? user.id : user
        if(!SnowflakeRegex.test(userId)) throw new RangeError(`Invalid User`)
        const { cache = true, force = false } = options
        if(this.dmChannel(userId) && !force) return this.dmChannel(userId)
        const body = { recipient_id: userId }
        user = await this.client.api.post(`${this.client.root}/users/@me/channels`, { body })
        return this.client.channels._add(user, { cache })
    }

    async send(user, options = {}) {
        const userId = user instanceof User ? user.id : user
        if(!SnowflakeRegex.test(userId)) throw new RangeError(`Invalid User`)
        return await (await this.createDm(userId)).send(options)
    }

    async fetchOauthUser(accessToken) {
        const user = await this.client.api.get(`${this.client.root}/users/@me`, { authorization: accessToken, tokenType: "Bearer" })
        return new OauthUser(user, this.client)
    }

    async fetchOauthUserConnections(accessToken) {
        const connections = await this.client.api.get(`${this.client.root}/users/@me/connections`, { authorization: accessToken, tokenType: `Bearer` })
        return new this.cache.constructor(connections?.map(o => [o.id, new OauthUserConnections(o, this.client)]))
    }

    async createGroupDM(options = {}) {
        const body = {
            access_tokens: options.accessTokens,
            nicks: options.users?.reduce((acc, user) => {
                const userId = user instanceof User ? user?.id : user
                if(!SnowflakeRegex.test(userId)) throw new RangeError(`Invalid User`)
                acc[userId] = user.nickname ?? user.nick
                return acc
            }, {})
        }

        const dm = await this.client.api.post(`${this.client.root}/users/@me/channels`, { body })
        return this.client.channels._add(dm)

    }

    dmChannel(user) {
        const userId = user instanceof User ? user.id : user
        if(!SnowflakeRegex.test(userId)) throw new RangeError(`Invalid User`)
        return this.client.channels.cache.find(o => o.type === ChannelTypesEnums.Dm && o.recipientId === userId)
    }
}

module.exports = UserManager