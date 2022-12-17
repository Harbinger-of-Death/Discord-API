const { EventEmitter } = require("node:events");
const ChannelManager = require("../Managers/ChannelManager");
const EmojiManager = require("../Managers/EmojiManager");
const GuildManager = require("../Managers/GuildManager");
const UserManager = require("../Managers/UserManager");
const WebsocketManager = require("../Managers/WebsocketManager");
const REST = require("../REST/rest");
const Guild = require("../Structures/Guild");
const GuildMember = require("../Structures/GuildMember");
const GuildPreview = require("../Structures/GuildPreview");
const GuildTemplate = require("../Structures/GuildTemplate");
const GuildWidget = require("../Structures/GuildWIdget");
const Invite = require("../Structures/Invite");
const Sticker = require("../Structures/Sticker");
const StickerPack = require("../Structures/StickerPack");
const VoiceRegion = require("../Structures/VoiceRegion");
const Webhook = require("../Structures/Webhook");
const Collection = require("../Util/Collection");
const { CdnEndPoints, SnowflakeRegex, WebsocketEvents, EventTypes } = require("../Util/Constants");
const Intents = require("../Util/Intents");
class Client extends EventEmitter {
    constructor(options = {}) {
        super(options)
        this.validationOptions(options)
        Object.defineProperty(this, "token", { value: options.token })

        //Client Options
        this.intents = new Intents(options.intents)
        this.partials = options.partials ?? []
        this.restRequestTimeout = options.restRequestTimeout ?? 15_000
        this.restReadyTimeout = options.restReadyTimeout ?? 2000
        this.version = options.version ?? 9
        this.encoding = options.encoding ?? "json"
        this.presence = options.presence
        this.websocketOptions = options.websocketOptions ?? { properties: { os: "windows" } }
        //URL
        this.root = `https://discord.com/api/v${this.version}`
        this.wssURL = `wss://gateway.discord.gg/?v=${this.version}&encoding=${this.encoding}`
        

        //Managers
        this.ws = new WebsocketManager(this, this.wssURL)
        this.guilds = new GuildManager(this)
        this.users = new UserManager(this)
        this.channels = new ChannelManager(this)
        this.emojis = new EmojiManager(this)
        //Misc
        this.application = null
        this.heartbeatInterval = null  
        this.readyAt = null
        this.api = new REST(this)
    }

    get cdn() {
        return CdnEndPoints
    }

    validationOptions(options) {
        if(!options.token) throw new RangeError(`No Token Specified`);
        if(!options.intents) throw new RangeError(`Valid Intents not specified`);
        if(typeof options.token !== "string") throw new TypeError(`Token must be string`);
        return;
    }

    isReady() {
        return this.ws.status === WebsocketEvents.Ready
    }

    async fetchWebhook(webhook, token) {
        const match = webhook.match(/https?:\/\/(?:\w+.)\w+\.(?:com|io|org)\/api\/webhooks\/(\d{17,19})\/([\w-]+)?/)
        if(match?.length) {
            webhook = match[1]
            token = match[2]
        } else webhook = typeof webhook === "string" ? webhook : webhook.id
        webhook = await this.api.get(`${this.root}/webhooks/${webhook}${token ? `/${token}` : ""}`)
        return new Webhook(webhook, this)
    }

    async fetchGuildPreview(guild) {
        const guildId = guild instanceof Guild ? guild.id : guild.id ?? guild
        if(!SnowflakeRegex.test(guildId)) throw new RangeError(`Invalid Guild`)
        const preview = await this.api.get(`${this.root}/guilds/${guildId}/preview`)
        return new GuildPreview(preview, this)
    }

    async fetchGuildWidget(guild) {
        const guildId = guild instanceof Guild ? guild.id : guild.id ?? guild
        if(!SnowflakeRegex.test(guildId)) throw new RangeError(`Invalid Guild`)
        const widget = await this.api.get(`${this.root}/guilds/${guildId}/widget.json`)
        return new GuildWidget(widget, this)
    }

    async fetchGuildTemplate(code) {
        const match = code.match(/https?:\/\/discord\.new\/([\w-]+)/)
        if(match?.length) {
            code = match[1]
        } else typeof code === "string" ? code : code.code

        const template = await this.api.get(`${this.root}/guilds/templates/${code}`)
        return new GuildTemplate(template, template.guild_id, this)
    }

    async fetchInvite(code, options = {}) {
        const match = code.match(/https?:\/\/discord\.gg\/([\w-]+)/)
        if(match?.length) {
            code = match[1]
        } else typeof code === "string" ? code : code.code

        const query = { with_counts: options.withCounts, with_expiration: options.withExpiration, guild_scheduled_event_id: typeof options.guildScheduledEvent === "string" ? options.guildScheduledEvent : options.guildScheduledEvent?.id }

        const invite = await this.api.get(`${this.root}/invites/${code}`, { query })
        return new Invite(invite, this)
    }

    async fetchSticker(sticker) {
        const stickerId = sticker instanceof Sticker ? sticker.id : sticker
        if(!SnowflakeRegex.test(stickerId)) throw new RangeError(`Invalid Sticker`)
        sticker = await this.api.get(`${this.root}/stickers/${stickerId}`)
        return new Sticker(sticker, sticker.guild_id, this)
    }

    async fetchPremiumStickerPack() {
        const packs = await this.api.get(`${this.root}/sticker-packs`)
        return new Collection(packs.sticker_packs?.map(o => [o.id, new StickerPack(o, this)]))
    }

    async fetchVoiceRegions() {
        const voiceRegion = await this.api.get(`${this.root}/voice/regions`)
        return new Collection(voiceRegion?.map(o => [o.id, new VoiceRegion(o, this)]))
    }

    async fetchOauthGuildMember(accessToken, guild) {
        const guildId = typeof guild === "string" ? guild : guild.id
        if(!SnowflakeRegex.test(guildId)) throw new RangeError(`Invalid Guild`)
        if(!accessToken) throw new RangeError(`Missing Access Token`)
        const member = await this.api.get(`${this.root}/users/@me/guilds/${guildId}/member`, { authorization: accessToken, tokenType: `Bearer` })
        return new GuildMember(member, this, { guildId })
    }

    async fetchOauthCurrentAuthorization(accessToken) {
        if(!accessToken) throw new RangeError(`Missing Access Token`)
        const oauth = await this.api.get(`${this.root}/oauth2/@me`, { authorization: accessToken, tokenType: "Bearer" })
        return oauth
    }

    debug(message) {
        return this.emit(EventTypes.Debug, message)
    }

}

module.exports = Client