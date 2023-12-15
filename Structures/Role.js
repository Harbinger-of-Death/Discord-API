const Base = require("../Base/base");
const { RegExes } = require("../Util/Constants");
const Permissions = require("../Util/Permissions");
const Snowflake = require("../Util/Snowflake");

class Role extends Base {
    constructor(data = {}, client, extras) {
        super(client)
        this.partial = data.partial ?? false
        this.id = data.id ?? null
        this.name = data.name ?? null
        this.color = data.color ?? null
        this.hoist = data.hoist ?? null
        this.icon = data.icon ?? null
        this.unicodeEmoji = data.unicode_emoji ?? null
        this.position = data.position ?? null
        this.permissions = new Permissions(data.permissions ? BigInt(data.permissions) : 0n).freeze()
        this.createdAt = data.id ? Snowflake.deconstruct(data.id).createdAt : null
        this.createdTimestamp = this.createdAt?.getTime() ?? null
        this.managed = data.managed ?? null
        this.mentionable = data.mentionable ?? null
        this.guildId = data.guild_id ?? extras?.guildId ?? null
        this.tags = data.tags ? {} : null
        if(data.tags) {
            if("bot_id" in data.tags) this.tags.botId = data.tags.bot_id

            if("integration_id" in data.tags) this.tags.integrationId = data.tags.integration_id

            if("premium_subscriber" in data.tags) this.tags.premiumSubscriber = true

            if("subscription_listing_id" in data.tags) this.tags.subscriptionListingId = data.tags.subscription_listing_id

            if("available_for_purchase" in data.tags) this.tags.availableForPurchase = true

            if("guild_connections" in data.tags) this.tags.guildConnections = true
        }
    }

    get guild() {
        return this.client.guilds.cache.get(this.guildId) ?? null
    }

    async edit(options = {}) {
        return await this.guild?.roles.edit(this, options)
    }

    async delete(reason) {
        return await this.guild?.roles.delete(this, reason)
    }

    async setName(name, reason) {
        return await this.edit({ name, reason })
    }

    async setPermissions(permissions, reason) {
        return await this.edit({ permissions, reason })
    }

    async setColor(color, reason) {
        return await this.edit({ color, reason })
    }

    async setHoist(hoist, reason) {
        return await this.edit({ hoist, reason })
    }

    async setIcon(icon, reason) {
        return await this.edit({ icon, reason })
    }

    async setUnicodeEmoji(unicodeEmoji, reason) {
        return await this.edit({ unicodeEmoji, reason })
    }

    async setMentionable(mentionable, reason) {
        return await this.edit({ mentionable, reason })
    }

    async setPosition(position, reason) {
        await this.guild?.roles.modifyPositions([{ role: this, position }], reason)
        return this
    }

    iconURL(options = {}) {
        if(!this.icon) return null;
        return this.client.cdn.GuildRoleIcon(this.icon, options.extensions, options.size, this.id)
    }

    comparePositionTo(role) {
        return this.guild?.roles.comparePositionTo(this, role)
    }

    permissionsIn(channel) {
        const channelId = typeof channel === "string" ? channel : channel.id
        if(!RegExes.SnowflakeRegExp.test(channelId)) throw new RangeError(`Invalid Channel`)
        return this.client.channels.cache.get(channelId)?.permissionsFor(this)
    }

    equals(role) {
        return this.name === role.name &&
        this.color === role.color &&
        this.icon === role.icon &&
        this.hoist === role.hoist &&
        this.mentionable === role.mentionable &&
        this.permissions.bitfield === role.permissions.bitfield &&
        this.unicodeEmoji === role.unicodeEmoji
    }

    get members() {
        return this.guild?.members.cache.filter(o => o.roles.cache.has(this.id))
    }

    async clone(reason) {
        return await this.guild?.roles.clone(this, reason)
    }

    toString() {
        return this.id === this.guildId ? `@everyone` : `<@&${this.id}>`
    }

}

module.exports = Role