const Base = require("../Base/base");
const { ApplicationCommandTypesEnums, InteractionTypeEnums, ComponentTypesEnums } = require("../Util/Constants");
const Permissions = require("../Util/Permissions");
const Snowflake = require("../Util/Snowflake");
const InteractionWebhook = require("./InteractionWebhook");
class Interaction extends Base {
    constructor(data = {}, guildId, client) {
        super(client)
        Object.defineProperties(this, {
            _data: { value: data },
            _member: { value: data.member },
            _user: { value: data.user }
        })
        this.id = data.id ?? null
        this.data = data.data ?? {}
        this.applicationId = data.application_id ?? null
        this.type = data.type ?? null
        this.guildId = data.guild_id ?? guildId ?? null
        this.channelId = data.channel_id ?? data.channel?.id ?? null
        this.token = data.token ?? null
        this.appPermissions = new Permissions(data.app_permissions ? BigInt(data.app_permissions) : 0n).freeze()
        this.locale = data.locale ?? null
        this.guildLocale = data.guild_locale ?? null
        this.createdAt = data.id ? Snowflake.deconstruct(data.id).createdAt : null
        this.createdTimestamp = this.createdAt?.getTime() ?? null
        this.replied = false
        this.webhook = new InteractionWebhook({ id: this.applicationId, interactionId: this.id, token: this.token, guildId: this.guildId, channelId: this.channelId }, this.client)
        this.user = this.client.users._add(this._user ?? this._member.user, { cache: true, force: true }) ?? null
        this.member = this.guild.members._add(this._member, { cache: true, force: true }, { id: this._user?.id }) ?? null
    }

    inGuild() {
        return this.guildId ? true : false
    }

    isChatInput() {
        return this.commandType === ApplicationCommandTypesEnums.ChatInput
    }

    isCommand() {
        return this.type === InteractionTypeEnums.ApplicationCommand
    }

    isContextMenu() {
        return [ApplicationCommandTypesEnums.User, ApplicationCommandTypesEnums.Message].includes(this.commandType)
    }

    isContextUser() {
        return this.commandType === ApplicationCommandTypesEnums.User
    }

    isContextMessage() {
        return this.commandType === ApplicationCommandTypesEnums.Message
    }

    isButton() {
        return this.componentType === ComponentTypesEnums.Button
    }

    isSelect() {
        return ![ComponentTypesEnums.ActionRow, ComponentTypesEnums.Button, ComponentTypesEnums.InputText].includes(this.componentType) && this.componentType
    }

    isComponent() {
        return this.type === InteractionTypeEnums.MessageComponent
    }

    isAutoComplete() {
        return this.type === InteractionTypeEnums.ApplicationCommandAutocomplete
    }

    isModal() {
        return this.type === InteractionTypeEnums.ModalSubmit
    }

    isRepliable() {
        return this.type !== InteractionTypeEnums.ApplicationCommandAutocomplete
    }

    get guild() {
        return this.client.guilds.cache.get(this.guildId) ?? null
    }

    get channel() {
        return this.guild?.channels.cache.get(this.channelId) ?? this.client.channels.cache.get(this.channelId) ?? null
    }
}

module.exports = Interaction