const Base = require("../Base/base");
const { SnowflakeRegex } = require("../Util/Constants");
const Snowflake = require("../Util/Snowflake");
const UserFlags = require("../Util/UserFlags");

class User extends Base {
    constructor(data = {}, client) {
        super(client)
        this.partial = data.partial ?? false
        this.id = data.id ?? null
        this.username = data.username ?? null
        this.discriminator = data.discriminator ?? null
        this.avatar = data.avatar ?? null
        this.avatarDecoration = data.avatar_decoration ?? null
        this.createdAt = data.id ? Snowflake.deconstruct(data.id).createdAt : null
        this.createdTimestamp = this.createdAt?.getTime() ?? null
        this.bot = data.bot ?? null
        this.banner = data.banner ?? null
        this.bannerColor = data.banner_color ?? null
        this.accentColor = data.accent_color ?? null
        this.flags = new UserFlags(data.flags).freeze()
        this.system = data.system ?? null
        this.tag = data.username ? `${data.username}#${data.discriminator}` : null
        this.pronouns = data.pronouns ?? null
        this.themeColors = data.theme_colors ?? null
    }

    async fetch(options = {}) {
        return await this.client.users.fetch(this, options)
    }

    async createDm(options = {}) {
        return await this.client.users.createDm(this, options)
    }

    dmChannel() {
        return this.client.users.dmChannel(this)
    }

    bannerURL(options = {}) {
        if(!this.banner) return null;
        return this.client.cdn.UserBanner(this.banner, options.extension, options.size, options.forceStatic, this.id)
    }

    avatarURL(options = {}) {
        if(!this.avatar) return null;
        return this.client.cdn.UserAvatar(this.avatar, options.extension, options.size, options.forceStatic, this.id)
    }

    defaultUserAvatarURL(options = {}) {
        return this.client.cdn.DefaultUserAvatar(this.discriminator, options.extension, options.size)
    }

    displayAvatarURL(options = {}) {
        if(!this.avatar) return this.defaultUserAvatarURL(options)
        return this.avatarURL(options)
    }

    avatarDecorationURL(options = {}) {
        if(!this.avatarDecoration) return null;
        return this.client.cdn.UserAvatarDecoration(this.avatarDecoration, options.extension, options.size, this.id)
    }

    hexAccentColor() {
        if(!this.accentColor) return null;
        return parseInt(this.accentColor, 16)
    }

    base64AccentColor() {
        if(!this.accentColor) return null;
        return Buffer.from(this.accentColor.toString()).toString("base64")
    }

    async memberOf(guild, accessToken) {
        const guildId = typeof guild === "string" ? guild : guild.id
        if(this.client.guilds.cache.has(guildId)) return await this.client.guilds.cache.get(guildId).members.fetch(this.id)
        return await this.client.fetchOauthGuildMember(accessToken, guildId)
    }

    toString() {
        return `<@${this.id}>`
    }

    equals(user) {
        return this.avatar === user.avatar &&
        this.username === user.username &&
        this.banner === user.banner &&
        this.avatarDecoration === user.avatarDecoration
    }
}

module.exports = User