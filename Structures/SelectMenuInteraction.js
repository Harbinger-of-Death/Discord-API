const Collection = require("../Util/Collection");
const { ComponentTypesEnums } = require("../Util/Constants");
const MessageComponentInteraction = require("./MessageComponentInteraction");
class SelectMenuInteraction extends MessageComponentInteraction {
    constructor(data = {}, guildId, client) {
        super(data, guildId, client)
        this.values = data.data?.values ?? []
    }

    channels() {
        if(this.componentType !== ComponentTypesEnums.ChannelSelect) throw new RangeError(`Select Menu is expected to be type 8. Received=${this.componentType}`)
        if(Object.hasOwn(this.data.resolved, "channels")) {
            const collection = new Collection()
            if(!this.guildId) throw new RangeError(`Must be done in Guild`)
            for(const [key, val] of Object.entries(this.data.resolved.channels)) {
                if(!val) continue;
                const channel = this.client.channels._add(val, this.guildId)
                collection.set(key, channel)
            }
            return collection
        }

        return null;
    }

    users() {
        if(this.componentType !== ComponentTypesEnums.UserSelect) throw new RangeError(`Select Menu is expected to be type 5. Received=${this.componentType}`)
        if(Object.hasOwn(this.data.resolved, "users")) {
            const collection = new Collection()
            for(const [key, val] of Object.entries(this.data.resolved.users)) {
                if(!val) continue;
                const user = this.client.users._add(val)
                collection.set(key, user)
            }

            return collection
        }

        return null;
    }

    members() {
        if(this.componentType !== ComponentTypesEnums.UserSelect) throw new RangeError(`Select Menu is expected to be type 5. Received=${this.componentType}`)
        if(Object.hasOwn(this.data.resolved, "members")) {
            const collection = new Collection()
            if(!this.guildId) throw new RangeError(`Must be done in Guild`)
            for(const [key, val] of Object.entries(this.data.resolved.users)) {
                if(!val) continue;
                val["user"] = this.data.resolved.users[key]
                const member = this.guild?.members._add(val, this.guildId)
                collection.set(key, member)
            }

            return collection
        }

        return null;
    }

    roles() {
        if(this.componentType !== ComponentTypesEnums.RoleSelect) throw new RangeError(`Select Menu is expected to be type 6. Received=${this.componentType}`)
        if(Object.hasOwn(this.data.resolved, "roles")) {
            const collection = new Collection()
            if(!this.guildId) throw new RangeError(`Must be done in Guild`)
            for(const [key, val] of Object.entries(this.data.resolved.roles)) {
                if(!val) continue;
                const role = this.guild?.roles._add(val, this.guildId)
                collection.set(key, role)
            }

            return collection
        }

        return null;
    }

    mentionables() {
        if(this.componentType !== ComponentTypesEnums.MentionableSelect) throw new RangeError(`Select Menu is expected to be type 7. Received=${this.componentType}`)
        const collection = new Collection()
        if(Object.hasOwn(this.data.resolved, "members") || Object.hasOwn(this.data.resolved, "users")) {
            for (const [key, val] of Object.entries(this.data.resolved.members)) {
                if(!val) continue;
                if(this.guildId) {
                    val["user"] = this.data.resolved.users[key]
                    const member = this.guild?.members._add(val, this.guildId)
                    collection.set(key, member)
                } else {
                    const user = this.client.users._add(val)
                    collection.set(key, user)
                }
            }
        }

        if(Object.hasOwn(this.data.resolved, "roles")) {
            if(!this.guildId) throw new RangeError(`This must be done in a Guild`)
            for(const [key, val] of Object.entries(this.data.resolved.roles)) {
                if(!val) continue;
                const role = this.guild?.roles._add(val, this.guildId)
                collection.set(key, role)
            }
        }
        return collection
    }

}

module.exports = SelectMenuInteraction