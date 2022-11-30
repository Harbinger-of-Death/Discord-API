const Base = require("../Base/base");
const { OptionTypesEnums } = require("../Util/Constants");
const Attachment = require("./Attachment");

class ChatInputCommandInteractionOptionResolver extends Base {
    constructor(data = {}, guildId, client) {
        super(client)
        this.data = data
        this.guildId = guildId ?? null
    }

    _parse(options = this.data?.options) {
        if(!options) return null;
        if(options[0]?.type === OptionTypesEnums.SubCommandGroup || options[0]?.type === OptionTypesEnums.SubCommand) return this._parse(options[0]?.options)
        return options
    }

    getAttachment(name, required = false) {
        const options = this._parse()
        if(options?.length <= 0) return null;
        const filter = options.find(o => o.name === name)
        if(filter) {
            if(filter.type !== OptionTypesEnums.Attachment) throw new RangeError(`Expected option type to be ${OptionTypesEnums.Attachment}. Received=${filter.type}`)
            return new Attachment(this.data.resolved?.attachments[filter.value], this.client)
        }

        if(required) throw new RangeError(`Option has no such name found`)
        return null;
    }

    getNumber(name, required = false) {
        const options = this._parse()
        if(!options?.length) return null;
        const filter = options.find(o => o.name === name)
        if(filter) {
            if(filter.type !== OptionTypesEnums.Number) throw new RangeError(`Expected option type to be ${OptionTypesEnums.Number}. Received=${filter.type}`)
            return filter.value
        }

        if(required) throw new RangeError(`Option has no such name found`)
        return null;
    }

    getMentionable(name, required = false) {
        const options = this._parse()
        if(!options?.length) return null;
        const filter = options.find(o => o.name === name)
        if(filter) {
            if(filter.type !== OptionTypesEnums.Mentionable) throw new RangeError(`Expected option type to be ${OptionTypesEnums.Mentionable}. Received=${filter.type}`)
            if(Object.hasOwn(this.data.resolved, "members") || Object.hasOwn(this.data.resolved, "users")) {
                if(!this.guildId) return this.client.users._add(this.data.resolved?.users[filter.value], { cache: true, force: true })
                const resolvedMember = this.data.resolved?.members[filter.value]
                resolvedMember["user"] = this.data.resolved?.users[filter.value]
                return this.guild?.members._add(resolvedMember, { cache: true, force: true })
            }

            if(Object.hasOwn(this.data.resolved, "roles")) return this.guild?.roles._add(this.data.resolved?.roles[filter.value])
        }

        if(required) throw new RangeError(`Option has no such name found`)
        return null;
    }


    getRole(name, required = false) {
        const options = this._parse()
        if(!options?.length) return null;
        const filter = options.find(o => o.name === name)
        if(filter) {
            if(filter.type !== OptionTypesEnums.Role) throw new RangeError(`Expected option type to be ${OptionTypesEnums.Role}. Received=${filter.type}`)
            if(this.guildId) return this.guild?.roles._add(this.data.resolved?.roles[filter.value])
            return null;
        }

        if(required) throw new RangeError(`Option has no such name found`)
        return null;
    }

    getChannel(name, required = false) {
        const options = this._parse()
        if(!options?.length) return null;
        const filter = options.find(o => o.name === name)
        if(filter) {
            if(filter.type !== OptionTypesEnums.Channel) throw new RangeError(`Expected option type to be ${OptionTypesEnums.Channel}. Received=${filter.type}`)
            return this.client.channels._add(this.data.resolved?.channels[filter.value])            
        }

        if(required) throw new RangeError(`Option has no such name found`)
        return null;
    }

    getUser(name, required = false) {
        const options = this._parse()
        if(!options?.length) return null;
        const filter = options.find(o => o.name === name)
        if(filter) {
            if(filter.type !== OptionTypesEnums.User) throw new RangeError(`Expected option type to be ${OptionTypesEnums.User}. Received=${filter.type}`)
            if(Object.hasOwn(this.data.resolved, "users")) return this.client.users._add(this.data.resolved?.users[filter.value])            
            return null;
        }

        if(required) throw new RangeError(`Option has no such name found`)
        return null;
    }

    getBoolean(name, required = false) {
        const options = this._parse()
        if(!options?.length) return null;
        const filter = options.find(o => o.name === name)
        if(filter) {
            if(filter.type !== OptionTypesEnums.Boolean) throw new RangeError(`Expected option type to be ${OptionTypesEnums.Boolean}. Received=${filter.type}`)
            return filter.value
        }

        if(required) throw new RangeError(`Option has no such name found`)
        return null;
    }

    getInteger(name, required = false) {
        const options = this._parse()
        if(!options?.length) return null;
        const filter = options.find(o => o.name === name)
        if(filter) {
            if(filter.type !== OptionTypesEnums.Integer) throw new RangeError(`Expected option type to be ${OptionTypesEnums.Integer}. Received=${filter.type}`)
            return filter.value
        }

        if(required) throw new RangeError(`Option has no such name found`)
        return null;
    }

    getString(name, required = false) {
        const options = this._parse()
        if(!options?.length) return null;
        const filter = options.find(o => o.name === name)
        if(filter) {
            if(filter.type !== OptionTypesEnums.String) throw new RangeError(`Expected option type to be ${OptionTypesEnums.String}. Received=${filter.type}`)
            return filter.value
        }

        if(required) throw new RangeError(`Option has no such name found`)
        return null;
    }

    getSubcommand() {
        const option = this.data?.options
        if(!option) return null;
        let subcommand = option.find(o => o.type === OptionTypesEnums.SubCommand)
        if(option[0].type === OptionTypesEnums.SubCommandGroup) {
            subcommand = option[0].options?.find(o => o.type === OptionTypesEnums.SubCommand)
            return subcommand.name ?? null
        }

        return subcommand.name ?? null

    }

    getMember(name, required = false) {
        const options = this._parse()
        if(!options?.length) return null;
        const filter = options.find(o => o.name === name)
        if(filter) {
            if(filter.type !== OptionTypesEnums.User) throw new RangeError(`Expected option type to be ${OptionTypesEnums.User}. Received=${filter.type}`)
            if(this.guildId) return this.guild?.members._add({ user: this.data.resolved?.users[filter.value], ...this.data.resolved?.members[filter.value] }, { cache: true })
        }

        if(required) throw new RangeError(`Option has no such name found`)
        return null;
    }

    getSubcommandGroup() {
        const option = this.data?.options
        if(!option) return null;
        const group = option.find(o => o.type === OptionTypesEnums.SubCommandGroup)
        if(group) return group.name
        return null;
    }

    get guild() {
        return this.client.guilds.cache.get(this.guildId) ?? null
    }
}

module.exports = ChatInputCommandInteractionOptionResolver