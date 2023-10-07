const Base = require("../Base/base");
const GuildApplicationCommandManager = require("../Managers/GuildApplicationCommandManager");
const GuildAutomoderationManager = require("../Managers/GuildAutomoderationManager");
const GuildBanManager = require("../Managers/GuildBanManager");
const GuildChannelManager = require("../Managers/GuildChannelManager");
const GuildEmojiManager = require("../Managers/GuildEmojiManager");
const GuildIntegrationManager = require("../Managers/GuildIntegrationManager");
const GuildInviteManager = require("../Managers/GuildInviteManager");
const GuildMemberManager = require("../Managers/GuildMemberManager");
const GuildScheduledEventManager = require("../Managers/GuildScheduledEventManager");
const GuildStickerManager = require("../Managers/GuildStickerManager");
const GuildTemplateManager = require("../Managers/GuildTemplateManager");
const PresenceManager = require("../Managers/PresenceManager");
const RoleManager = require("../Managers/RoleManager");
const StageInstanceManager = require("../Managers/StageInstanceManager");
const VoiceStateManager = require("../Managers/VoiceStateManager");
const Collection = require("../Util/Collection");
const { GuildFeaturesEnums } = require("../Util/Constants");
const Permissions = require("../Util/Permissions");
const Snowflake = require("../Util/Snowflake");
const SystemChannelFlags = require("../Util/SystemChannelFlags");
const GuildAuditLog = require("./GuildAuditLog");
const VoiceRegion = require("./VoiceRegion");
class Guild extends Base {
    constructor(data = {}, client) {
        super(client)
        Object.defineProperties(this, {
            _members: {
                value: data.members
            },
            _presences: {
                value: data.presences
            },
            _channels: {
                value: data.channels
            }
        })
        this.partial = data.partial ?? false
        this.id = data.id ?? null
        this.name = data.name ?? null
        this.icon = data.icon ?? null
        this.iconHash = data.icon_hash ?? null
        this.splash = data.splash ?? null
        this.createdAt = data.id ? Snowflake.deconstruct(data.id).createdAt : null
        this.createdTimestamp = this.createdAt?.getTime() ?? null
        this.discoverySplash = data.discovery_splash ?? null
        this.ownerId = data.owner_id ?? null
        this.permissions = new Permissions(data.permissions ? BigInt(data.permissions) : 0n).freeze()
        this.afkChannelId = data.afk_channel_id ?? null
        this.afkTimeout = data.afk_timeout ?? null
        this.widgetEnabled = data.widget_enabled ?? null
        this.widgetChannelId = data.widget_channel_id ?? null
        this.verificationLevel = data.verification_level ?? null
        this.defaultMessageNotifications = data.default_message_notifications ?? null
        this.explicitContentFilter = data.explicit_content_filter ?? null
        this.features = data.features ?? null
        this.mfaLevel = data.mfa_level ?? null
        this.applicationId = data.application_id ?? null
        this.systemChannelId = data.system_channel_id ?? null
        this.systemChannelFlags = new SystemChannelFlags(data.system_channel_flags ? BigInt(data.system_channel_flags) : 0n).freeze()
        this.rulesChannelId = data.rules_channel_id ?? null
        this.maxPresences = data.max_presences ?? null
        this.maxMembers = data.max_members ?? null
        this.vanityUrlCode = data.vanity_url_code ?? null
        this.description = data.description ?? null
        this.banner = data.banner ?? null
        this.premiumTier = data.premium_tier ?? null
        this.premiumSubscriptionCount = data.premium_subscription_count ?? null
        this.preferredLocale = data.preferred_locale ?? null
        this.publicUpdatesChannelId = data.public_updates_channel_id ?? null
        this.maxVideoChannelUsers = data.max_video_channel_users ?? null
        this.maxStageVideoChannelUsers = data.max_stage_video_channel_users ?? null
        this.approximateMemberCount = data.approximate_member_count ?? null
        this.approximatePresenceCount = data.approximate_presencee_count ?? null
        this.nsfwLevel = data.nsfw_level ?? null
        this.premiumProgressBar = data.premium_progress_bar_enabled ?? null
        this.unavailable = data.unavailable ?? null
        this.large = data.large ?? null
        this.joinedAt = data.joined_at ? new Date(data.joined_at) : null
        this.joinedTimestamp = this.joinedAt?.getTime() ?? null
        this.memberCount = data.member_count ?? null
        this.safetyAlertsChannelId = data.safety_alerts_channel_id ?? null
        this.bans = new GuildBanManager(this.id, this.client)
        this.members = new GuildMemberManager(this.id, data.members, this.client)
        this.roles = new RoleManager(this.id, this.client, data.roles)
        this.invites = new GuildInviteManager(this.id, this.client)
        this.integrations = new GuildIntegrationManager(this.id, this.client)
        this.voiceStates = new VoiceStateManager(this.id, this.client, data.voice_states)
        this.guildScheduledEvents = new GuildScheduledEventManager(this.id, this.client, data.guild_scheduled_events)
        this.templates = new GuildTemplateManager(this.id, this.client)
        this.stageInstances = new StageInstanceManager(this.id, this.client, data.stage_instances)
        this.stickers = new GuildStickerManager(this.id, this.client, data.stickers)
        this.emojis = new GuildEmojiManager(this.id, this.client, data.emojis)
        this.automoderations = new GuildAutomoderationManager(this.id, this.client)
        this.presences = new PresenceManager(this.id, this.client, data.presences)
        this.channels = new GuildChannelManager(this.id, this.client, data.channels)
        this.commands = new GuildApplicationCommandManager(this.id, this.client)
    }

    get owner() {
        return this.members.cache.get(this.ownerId) ?? null
    }

    async fetchOwner(options = {}) {
        return await this.members.fetch(this.ownerId, options)
    }

    async fetch(options = {}) {
        return await this.client.guilds.fetch(this, options)
    }

    async edit(options = {}) {
        return await this.client.guilds.edit(this, options)
    }

    async delete(reason) {
        return await this.client.guilds.delete(this, reason)
    }

    async setName(name, reason) {
        return await this.edit({ name, reason })
    }

    async setVerificationLevel(verificationLevel, reason) {
        return await this.edit({ verificationLevel, reason })
    }

    async setDefaultMessageNotifications(defaultMessageNotifications, reason) {
        return await this.edit({ defaultMessageNotifications, reason })
    }

    async setExplicitContentFilter(explicitContentFilter, reason) {
        return await this.edit({ explicitContentFilter, reason })
    }

    async setAfkChannel(afkChannel, reason) {
        return await this.edit({ afkChannel, reason })
    }

    async setAfkTimeout(afkTimeout, reason) {
        return await this.edit({ afkTimeout, reason })
    }

    async setIcon(icon, reason) {
        return await this.edit({ icon, reason })
    }

    async setOwner(owner, reason) {
        return await this.edit({ owner, reason })
    }

    async setSplash(splash, reason) {
        return await this.edit({ splash, reason })
    }

    async setDiscoverySplash(discoverySplash, reason) {
        return await this.edit({ discoverySplash, reason })
    }

    async setBanner(banner, reason) {
        return await this.edit({ banner, reason })
    }

    async setSystemChannel(systemChannel, reason) {
        return await this.edit({ systemChannel, reason })
    }

    async setSystemChannelFlags(systemChannelFlags, reason) {
        return await this.edit({ systemChannelFlags, reason })
    }

    async setRulesChannel(rulesChannel, reason) {
        return await this.edit({ rulesChannel, reason })
    }

    async setPublicUpdatesChannel(publicUpdatesChannel, reason) {
        return await this.edit({ publicUpdatesChannel, reason })
    }

    async setPreferredLocale(preferredLocale, reason) {
        return await this.edit({ preferredLocale, reason })
    }

    async setFeatures(features, reason) {
        return await this.edit({ features, reason })
    }

    async setDescription(description, reason) {
        return await this.edit({ description, reason })
    }

    async setPremiumProgressBar(premiumProgressBar, reason) {
        return await this.edit({ premiumProgressBar, reason })
    }

    get systemChannel() {
        return this.client.channels.cache.get(this.systemChannelId) ?? null
    }

    get rulesChannel() {
        return this.client.channels.cache.get(this.rulesChannelId) ?? null
    }

    get publicUpdatesChannel() {
        return this.client.channels.cache.get(this.publicUpdatesChannelId) ?? null
    }

    get widgetChannel() {
        return this.client.channels.cache.get(this.widgetChannelId) ?? null
    }

    get afkChannel() {
        return this.client.channels.cache.get(this.afkChannelId) ?? null
    }

    async fetchWebhooks() {
        return await this.client.guilds.fetchWebhooks(this)
    }

    async fetchPreview() {
        return await this.client.guilds.fetchPreview(this)
    }

    async fetchPruneCount(options = {}) {
        return await this.client.guilds.fetchPruneCount(this, options)
    }

    async fetchWidgetSettings() {
        const settings = await this.client.api.get(`${this.client.root}/guilds/${this.id}/widget`)
        return { enabled: settings.enabled, channelId: settings.channel_id }
    }

    async beginPrune(options = {}) {
        const { days = 7, computePruneCount = true, roles = [], reason } = options
        const body = { days, compute_prune_count: computePruneCount, include_roles: roles.map(o => typeof o === "string" ? o : o.id) }
        const count = await this.client.api.post(`${this.client.root}/guilds/${this.id}/prune`, { reason, body })
        return count
    }

    async fetchVoiceRegions() {
        const voiceRegions = await this.client.api.get(`${this.client.root}/guilds/${this.id}/regions`)
        return new Collection(voiceRegions?.map(o => [o.id, new VoiceRegion(o, this.id, this.client)]))
    }

    async fetchWidget() {
        return await this.client.fetchGuildWidget(this)
    }

    async modifyWidget(options = {}) {
        return await this.client.guilds.modifyWidget(this, options)
    }

    async fetchVanityURL() {
        return await this.client.guilds.fetchVanityURL(this)
    }

    async fetchWelcomeScreen() {
        return await this.client.guilds.fetchGuildWelcomeScreen(this)
    }

    async modifyWelcomeScreen(options = {}) {
        return await this.client.guilds.modifyGuildWelcomeScreen(this, options)
    }

    iconURL(options = {}) {
        if(!this.icon) return null;
        return this.client.cdn.GuildIcon(this.icon, options.extension, options.size, options.forceStatic, this.id)
    }

    splashURL(options = {}) {
        if(!this.splash) return null;
        return this.client.cdn.GuildSplash(this.splash, options.extension, options.size, this.id)
    }

    discoverySplashURL(options = {}) {
        if(!this.discoverySplash) return null;
        return this.client.cdn.GuildDiscoverySplash(this.discoverySplash, options.extension, options.size, this.id)
    }

    bannerURL(options = {}) {
        if(!this.banner) return null;
        return this.client.cdn.GuildBanner(this.banner, options.extension, options.size, options.forceStatic, this.id)
    }

    async fetchAuditLogs(options = {}) {
        const query = { 
            user_id: typeof options.user === "string" ? options.user : options.user?.id,
            action_type: options.actionType,
            before: typeof options.before === "string" ? options.before : options.before?.id,
            limit: options.limit ?? 50
        }

        const auditLogs = await this.client.api.get(`${this.client.root}/guilds/${this.id}/audit-logs`, { query })
        return new GuildAuditLog(auditLogs, this.id, this.client)
    }

    get me() {
        return this.members.cache.get(this.client.user?.id) ?? null
    }

    async fetchMe(options = {}) {
        return await this.members.fetch(this.client.user.id, options)
    }

    async disableInvites(reason) {
        const features = this.features?.filter(o => [GuildFeaturesEnums.InvitesDisabled, GuildFeaturesEnums.Community, GuildFeaturesEnums.Discoverable].includes(o))
        if(features) features.push(GuildFeaturesEnums.InvitesDisabled)
        return await this.edit({ features, reason })
    }

    get safetyAlertsChannel() {
        return this.client.channels.cache.get(this.safetyAlertsChannelId) ?? null
    }

    async setSafetyAlertsChannel(safetyAlertsChannel, reason) {
        return this.edit({ safetyAlertsChannel, reason })
    }

    async fetchClydeSettings() {
        const clydeSettings = await this.client.api.get(`${this.client.root}/guilds/${this.id}/clyde-settings`)
        return { guildId: this.id ?? clydeSettings.guild_id, personality: clydeSettings.personality }
    }

    equals(guild) {
        return this.name === guild.name &&
        this.verificationLevel === guild.verificationLevel &&
        this.defaultMessageNotifications === guild.defaultMessageNotifications &&
        this.explicitContentFilter === guild.explicitContentFilter &&
        this.afkChannelId === guild.afkChannelId &&
        this.afkTimeout === guild.afkTimeout &&
        this.icon === guild.icon &&
        this.ownerId === guild.ownerId &&
        this.splash === guild.splash &&
        this.discoverySplash === guild.discoverySplash &&
        this.banner === guild.banner &&
        this.systemChannelId === guild.systemChannelId &&
        this.systemChannelFlags.bitfield === guild.systemChannelFlags.bitfield &&
        this.rulesChannelId === guild.rulesChannelId &&
        this.publicUpdatesChannelId === guild.publicUpdatesChannelId &&
        this.preferredLocale === guild.preferredLocale &&
        this.features.length === guild.features.length &&
        this.features.every(features => guild.features.includes(features)) &&
        this.description === guild.description &&
        this.premiumProgressBar === guild.premiumProgressBar &&
        this.safetyAlertsChannelId === guild.safetyAlertsChannelId
    }
}

module.exports = Guild