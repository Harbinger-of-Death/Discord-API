const Base = require("../Base/base");
const { OptionTypesEnums } = require("../Util/Constants");
const Attachment = require("./Attachment");

class ChatInputCommandInteractionOptionResolver extends Base {
    constructor(data = {}, guildId, client) {
        super(client)
        this.data = data
        this.guildId = guildId ?? null
    }

    _parse(options = this.data?.options, type) {
        if(!options?.length) return null;
        if(type) {
            if(type === "subcommand") {
                const subcommand = options[0].type === OptionTypesEnums.SubCommandGroup ? options[0].options : options
                if(subcommand && subcommand[0]?.type === OptionTypesEnums.SubCommand) return subcommand[0] ?? null
            }

            if(type === "subcommand-group" && options[0].type === OptionTypesEnums.SubCommandGroup) return options[0] ?? null
        }
        if(options[0].type === OptionTypesEnums.SubCommandGroup || options[0].type === OptionTypesEnums.SubCommand) return this._parse(options[0].options)
        return options
    }

    get(name, required = false) {
        const options = this._parse()
        if(options?.length <= 0) return null;
        const filter = options.find(o => o.name === name)
        if(filter) return filter
        if(required) throw new RangeError(`Option has no such name found`)
        return null;
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

    getSubcommand() {
        const parse = this._parse(this.data.options, "subcommand")
        return parse?.name ?? null
    }

    getSubcommandGroup() {
        const parse = this._parse(this.data.options, "subcommand-group")
        return parse?.name ?? null
    }

    get guild() {
        return this.client.guilds.cache.get(this.guildId) ?? null
    }
}

module.exports = ChatInputCommandInteractionOptionResolver