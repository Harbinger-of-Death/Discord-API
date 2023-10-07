const Guild = require("../Structures/Guild");
const GuildPreview = require("../Structures/GuildPreview");
const OauthGuild = require("../Structures/OauthGuild");
const VoiceRegion = require("../Structures/VoiceRegion");
const Webhook = require("../Structures/Webhook");
const WelcomeScreen = require("../Structures/WelcomeScreen");
const { SnowflakeRegex, GuildFeaturesEnums } = require("../Util/Constants");
const SystemChannelFlags = require("../Util/SystemChannelFlags");
const Util = require("../Util/Util");
const CachedManager = require("./CachedManager");
class GuildManager extends CachedManager {
    constructor(client) {
        super(Guild, client)
    }

    _add(guilds, options = { cache: true, force: false }) {
        return super._add(guilds, options)
    }

    async fetch(guild, options) {
        if(guild instanceof Guild || typeof guild === "string") return this._fetchId(guild, options)
        if(typeof guild === "object" && !options) options = guild
        const { cache = true, force = false, before = {}, after = {}, limit = 200, withCounts = false } = options ?? {}
        const query = {
            with_counts: withCounts,
            before: typeof before === "string" ? before : before.id,
            after: typeof after === "string" ? after : after.id,
            limit
        }

        const guilds = await this.client.api.get(`${this.client.root}/users/@me/guilds`, { query })
        return new this.cache.constructor(guilds?.map(o => [o.id, this._add(o, { cache, force })]))
    }

    async _fetchId(guild, options = {}) {
        const { cache = true, force = false, withCounts } = options
        const guildId = guild instanceof Guild ? guild.id : guild
        if(this.cache.has(guildId) && !force) return this.cache.get(guildId)
        const query = { with_counts: withCounts }
        guild = await this.client.api.get(`${this.client.root}/guilds/${guildId}`, { query })
        return this._add(guild, { cache, force: true })
    }

    async create(options = {}) {
        const body = await GuildManager.transformPayload(options)
        const guild = await this.client.api.post(`${this.client.root}/guilds`, { body })
        return this._add(guild, { cache: true })
    } 

    async edit(guild, options = {}) {
        const guildId = guild instanceof Guild ? guild.id : guild
        if(!this.cache.has(guildId) && !SnowflakeRegex.test(guildId)) throw new RangeError(`Invalid Guild`)
        const { reason } = options
        const body = await GuildManager.transformPayload(options)
        guild = await this.client.api.patch(`${this.client.root}/guilds/${guildId}`, { body, reason })
        return this._add(guild)
    }

    async delete(guild) {
        const guildId = guild instanceof Guild ? guild.id : guild
        if(!SnowflakeRegex.test(guildId) && !this.cache.has(guildId)) throw new RangeError(`Invalid Guild`)
        guild = this.cache.get(guildId)
        await this.client.api.delete(`${this.client.root}/guilds/${guildId}`)
        return guild ?? null
    }

    async setMfaLevel(guild, options = {}) {
        const { reason, mfaLevel } = options
        const guildId = typeof guild === "string" ? guild : guild.id
        if(!this.cache.has(guildId) && !SnowflakeRegex.test(guildId)) throw new RangeError(`Invalid Guild`)
        const body = {
            level: mfaLevel
        }

        await this.client.api.post(`${this.client.root}/guilds/${guildId}/mfa`, { body, reason })
        return this.cache.get(guildId)
    }

    async fetchVoiceRegions(guild) {
        const guildId = guild instanceof Guild ? guild.id : guild
        if(!this.cache.has(guildId) && !SnowflakeRegex.test(guildId)) throw new RangeError(`Invalid Guild`)
        const voiceRegions = await this.client.api.get(`${this.client.root}/guilds/${guildId}/regions`)
        return new this.cache.constructor(voiceRegions?.map(o => [o.id, new VoiceRegion(o, guildId, this.client)]))
    }

    async fetchWebhooks(guild) {
        const guildId = guild instanceof Guild ? guild.id : guild
        if(!this.cache.has(guildId) && !SnowflakeRegex.test(guildId)) throw new RangeError(`Invalid Guild`)
        const webhooks = await this.client.api.get(`${this.client.root}/guilds/${guildId}/webhooks`)
        return new this.cache.constructor(webhooks?.map(o => [o.id, new Webhook(o, this.client)]))
    }

    async fetchPreview(guild) {
        const guildId = guild instanceof Guild ? guild.id : guild
        if(!this.cache.has(guildId) && !SnowflakeRegex.test(guildId)) throw new RangeError(`Invalid Guild`)
        const preview = await this.client.api.get(`${this.client.root}/guilds/${guildId}/preview`)
        return new GuildPreview(preview, this.client)
    }

    async fetchPruneCount(guild, options = {}) {
        const guildId = guild instanceof Guild ? guild.id : guild
        if(!this.cache.has(guildId) && !SnowflakeRegex.test(guildId)) throw new RangeError(`Invalid Guild`)
        const query = {
            days: options.days ?? 7,
            include_roles: options.roles?.map(o => typeof o === "string" ? o : o.id)
        }

        const count = await this.client.api.get(`${this.client.root}/guilds/${guildId}/prune`, { query })
        return count
    }

    async fetchWidgetSettings(guild) {
        const guildId = guild instanceof Guild ? guild.id : guild
        if(!this.cache.has(guildId) && !SnowflakeRegex.test(guildId)) throw new RangeError(`Invalid Guild`)
        const settings = await this.client.api.get(`${this.client.root}/guilds/${guildId}/widget`)
        return { enabled: settings.enabled, channelId: settings.channel_id }
    }

    async beginPrune(guild, options = {}) {
        const guildId = guild instanceof Guild ? guild.id : guild
        if(!this.cache.has(guildId) && !SnowflakeRegex.test(guildId)) throw new RangeError(`Invalid Guild`)
        const { days = 7, computePruneCount = true, roles: [], reason } = options
        const body = { days, compute_prune_count: computePruneCount, include_roles: roles.map(o => typeof o === "string" ? o : o.id) }
        const count = await this.client.api.post(`${this.client.root}/guilds${guildId}/prune`, { body, reason })
        return count
    }

    async modifyWidget(guild, options = {}) {
        const guildId = guild instanceof Guild ? guild.id : guild
        if(!this.cache.has(guildId) && !SnowflakeRegex.test(guildId)) throw new RangeError(`Invalid Guild`)        
        const { reason, enabled, channel } = options
        const body = { enabled, channel_id: typeof channel === "string" ? channel : channel?.id }
        const widget = await this.client.api.patch(`${this.client.root}/guilds/${guildId}/widget`, { body, reason })
        return { enabled: widget.enabled, channelId: widget.channel_id }
    }

    async fetchVanityURL(guild) {
        const guildId = guild instanceof Guild ? guild.id : guild
        if(!this.cache.has(guildId) && !SnowflakeRegex.test(guildId)) throw new RangeError(`Invalid Guild`)
        const vanity = await this.client.api.get(`${this.client.root}/guilds/${guildId}/vanity-url`)
        return { code: vanity.code, uses: vanity.uses }
    }

    async fetchGuildWelcomeScreen(guild) {
        const guildId = guild instanceof Guild ? guild.id : guild
        if(!this.cache.has(guildId) && !SnowflakeRegex.test(guildId)) throw new RangeError(`Invalid Guild`)
        const welcomeScreen = await this.client.api.get(`${this.client.root}/guilds/${guildId}/welcome-screen`)
        return new WelcomeScreen(welcomeScreen, guildId, this.client)
    }

    async modifyGuildWelcomeScreen(guild, options = {}) {
        const { reason } = options
        const guildId = guild instanceof Guild ? guild.id : guild
        if(!this.cache.has(guildId) && !SnowflakeRegex.test(guildId)) throw new RangeError(`Invalid Guild`)
        const body = { enabled: options.enabled, welcome_channels: options.welcomeChannels?.map(o => {
            return {
                channel_id: typeof o.channel === "string" ? o.channel : o.channel?.id,
                description: o.description,
                emoji_id: o.emojiId ?? o.emoji_id,
                emojiName: o.emojiName ?? o.emoji_name
            }
        }), description: options.description}
        const welcomeScreen = await this.client.api.patch(`${this.client.root}/guilds/${guildId}/welcome-screen`, { reason, body })
        return new WelcomeScreen(welcomeScreen, guildId, this.client)
    }

    async fetchOauthGuilds(accessToken) {
        if(!accessToken) throw new RangeError(`Missing access token`)
        const guilds = await this.client.api.get(`${this.client.root}/users/@me/guilds`, { authorization: accessToken, tokenType: `Bearer` })
        return new this.cache.constructor(guilds?.map(o => [o.id, new OauthGuild(o, this.client)]))
    }

    static async transformPayload(payload = {}) {
        return {
            name: payload.name,
            icon: payload.icon ? await Util.generateDataURI(payload.icon) : undefined,
            verification_level: payload.verificationlevel,
            default_message_notifications: payload.defaultMessageNotifications,
            explicit_content_filter: payload.explicitContentFilter,
            roles: payload.roles?.map(o => typeof o === "string" ? o : o.id),
            channels: payload.channels?.map(o => {
                return {
                    id: typeof o.channel === "string" ? o.channel : o.channel?.id ?? o.channel,
                    name: o.name,
                    type: o.type,
                    parent_id: typeof o.parent === "string" ? o.parent : o.parent?.id ?? o.parent,
                    topic: o.topic,
                    nsfw: o.nsfw,
                    bitrate: o.bitrate,
                    user_limit: o.userLimit,
                    rtc_region: o.rtcRegion,
                }
            }),
            afk_channel_id: typeof payload.afkChannel === "string" ? payload.afkChannel : payload.afkChannel?.id,
            afk_timeout: payload.afkTimeout,
            system_channel_id: typeof payload.systemChannel === "string" ? payload.systemChannel : payload.systemChannel?.id,
            system_channel_flags: payload.systemChannelFlags ? SystemChannelFlags.resolve(BigInt(payload.systemChannelFlags)).toString() : undefined,
            owner_id: typeof payload.owner === "string" ? payload.owner : payload.owner?.id,
            splash: payload.splash ? await Util.generateDataURI(payload.splash) : undefined,
            discovery_splash: payload.discoverySplash ? await Util.generateDataURI(payload.discoverySplash) : undefined,
            banner: payload.banner ? await Util.generateDataURI(payload.banner) : undefined,
            rules_channel_id: typeof payload.rulesChannel === "string" ? payload.rulesChannel : payload.rulesChannel?.id,
            public_updates_channel_id: typeof payload.publicUpdatesChannel === "string" ? payload.publicUpdatesChannel : payload.publicUpdatesChannel?.id,
            preferred_locale: payload.preferredLocale ?? payload.preferred_locale,
            features: payload.features ? this.parseFeatures(payload.features) : undefined,
            description: payload.description,
            premium_progress_bar_enabled: payload.premiumProgressBar,
            safety_alerts_channel_id: typeof payload.safetyAlertsChannel === "string" ? payload.safetyAlertsChannel : payload.safetyAlertsChannel?.id
        } 
    }

    static parseFeatures(features = []) {
        const newFeatures = []
        for(const key of features) {
            if(![GuildFeaturesEnums.InvitesDisabled, GuildFeaturesEnums.Community, GuildFeaturesEnums.Discoverable, GuildFeaturesEnums.RaidAlertsEnabled].includes(GuildFeaturesEnums[key] ?? key)) throw new TypeError(`Invalid Guild Features. Received=${key}`)
            if(/^([A-Z]+_)*[A-Z]+$/g.test(key)) newFeatures.push(key)
            else newFeatures.push(GuildFeaturesEnums[key])
        }

        return newFeatures
    }
}

module.exports = GuildManager