const Base = require("../Base/base");
const GuildMemberRoleManager = require("../Managers/GuildMemberRoleManager");
const { SnowflakeRegex } = require("../Util/Constants");
const GuildMemberFlags = require("../Util/GuildMemberFlags");
const Permissions = require("../Util/Permissions");
class GuildMember extends Base {
    constructor(data = {}, client, extras) {
        super(client)
        Object.defineProperty(this, "_data", { value: data })
        this.guildId = extras.guildId ?? data.guild_id ?? null
        this.partial = data.partial ?? false
        this.id = data.id ?? data.user?.id ?? null
        this.banner = data.banner ?? null
        this.nickname = data.nick ?? data.nickname ?? null
        this.avatar = data.avatar ?? null
        this.joinedAt = data.joined_at ? new Date(data.joined_at) : null
        this.joinedTimestamp = this.joinedAt?.getTime() ?? null
        this.premiumSince = data.premium_since ? new Date(data.premium_since) : null
        this.premiumSinceTimestamp = this.premiumSince?.getTime() ?? null
        this.deaf = data.deaf ?? null
        this.mute = data.mute ?? null
        this.pending = data.pending ?? null
        this.communicationDisabledUntil = data.communication_disabled_until ? new Date(data.communication_disabled_until) : null
        this.communicationDisabledUntilTimestamp = this.communicationDisabledUntil?.getTime() ?? null
        this.flags = new GuildMemberFlags(data.flags).freeze()
    }
    
    get user() {
        return this.client.users._add(this._data.user, { cache: true }) ?? null
    }

    get roles() {
        const roles = this.guild?.roles.cache.filter(o => this._data.roles?.includes(o.id))
        roles.set(this.guildId, this.guild?.roles.everyone)
        return new GuildMemberRoleManager(this, this.guildId, [...roles.values()], this.client)
    }

    get permissions() {
        if(this.user?.id === this.guild?.ownerId) return new Permissions(Permissions.All).freeze()
        return new Permissions(this.roles.cache.map(o => o.permissions)).freeze()
    }

    get guild() {
        return this.client.guilds.cache.get(this.guildId) ?? null
    }

    async fetch(options = {}) {
        return await this.guild?.members.fetch(this, options)
    }

    async edit(options = {}) {
        return await this.guild?.members.edit(this, options)
    }

    async kick(reason) {
        return await this.guild?.members.kick(this, reason)
    }

    async setNickname(nickname, reason) {
        return await this.edit({ nickname, reason })
    }

    async setCommunicationDisabledUntil(communicationDisabledUntil, reason) {
        return await this.edit({ communicationDisabledUntil, reason })
    }

    async ban(options = {}) {
        await this.guild?.bans.create(this, options)
        return this
    }

    async send(options = {}) {
        return this.user?.send(options)
    }

    avatarURL(options = {}) {
        if(!this.avatar) return null;
        return this.client.cdn.GuildMemberAvatar(this.avatar, options.extension, options.size, options.forceStatic, this.guildId, this.id)
    }

    displayAvatarURL(options = {}) {
        if(!this.avatar) return this.user.displayAvatarURL(options)
        return this.avatarURL(options)
    }

    bannerURL(options = {}) {
        if(!this.banner) return this.user?.bannerURL(options)
        return this.client.cdn.GuildMemberAvatar(this.banner, options.extension, options.size, options.forceStatic, this.guildId, this.id)
    }

    get voice() {
        return this.guild?.voiceStates.cache.get(this.id) ?? null
    }

    get presence() {
        return this.guild?.presences.cache.get(this.id) ?? null
    }

    toString() {
        return `<@${this.id}>`
    }

    permissionsIn(channel) {
        const channelId = typeof channel === "string" ? channel : channel.id
        if(!SnowflakeRegex.test(channelId)) throw new RangeError(`Invalid Channel`)
        return this.client.channels.cache.get(channelId)?.permissionsFor(this)
    }

    toString() {
        return this.user?.toString()
    }

    equals(member) {
        return this.nickname === member.nickname &&
        this.roles.cache.size === member.roles.cache.size &&
        this.roles.cache.equals(member.roles.cache) &&
        this.communicationDisabledUntil?.getTime() === member.communicationDisabledUntil?.getTime()
    }

    isCommunicationDisabled() {
        return this.communicationDisabledUntil > Date.now()
    }

    manageable() {
        const me = this.guild?.me
        if(!me) throw new RangeError(`Guild me is uncached`)
        if(this.user.id === this.client.user.id) return false;
        if(this.user.id === this.guild.ownerId) return false;
        if(this.client.user.id === this.guild.ownerId) return true;
        return me.roles.highest.comparePositionTo(this.roles.highest) > 0
    }

    isKickable() {
        const me = this.guild?.me
        if(!me) throw new RangeError(`Guild me is uncached`)
        return this.manageable() && me.permissions.any(Permissions.Flags.Administrator, Permissions.Flags.KickMembers)
    }

    isModeratable() {
        const me = this.guild?.me
        if(!me) throw new RangeError(`Guild me is uncached`)
        return this.manageable() && me.permissions.any(Permissions.Flags.Administrator, Permissions.Flags.ModerateMembers) && !this.permissions.has(Permissions.Flags.Administrator)
    }

}

module.exports = GuildMember