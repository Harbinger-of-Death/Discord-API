const Base = require("../Base/base");
const { ApplicationCommandTypesEnums } = require("../Util/Constants");

class ContextMenuOptionResolver extends Base {
    constructor(data = {}, guildId, channelId, client) {
        super(client)
        this.data = data ?? {}
        this.guildId = guildId ?? null
        this.channelId = channelId ?? null
    }

    getUser() {
        const resolved = this.data.resolved
        if(!resolved) return null;
        if(this.data.type !== ApplicationCommandTypesEnums.User) throw new RangeError(`Expected to be Application Command type 2. Received=${this.data.type}`)
        if(Object.hasOwn(resolved, "users")){
            if(this.guildId) {
                const resolvedMember = resolved.members[this.data.target_id]
                resolvedMember["user"] = resolved.users[this.data.target_id]
                return this.guild?.members._add(resolvedMember, this.guildId, { cache: true })
            }
            return this.client.users._add(resolved.users[this.data.target_id], { cache: true })
        }

        return null;
    }
    
    getMessage() {
        const resolved = this.data.resolved
        if(!resolved) return null;
        if(this.data.type !== ApplicationCommandTypesEnums.Message) throw new RangeError(`Expected to be Application Command type 3. Received=${this.data.type}`)
        if(Object.hasOwn(resolved, "messages")) return this.channel?.messages._add(resolved.messages[this.data.target_id])

        return null;
    }

    get guild() {
        return this.client.guilds.cache.get(this.guildId) ?? null
    }

    get channel() {
        return this.guild?.channels.cache.get(this.channelId) ?? null
    }
}

module.exports = ContextMenuOptionResolver