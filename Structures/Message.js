const Base = require("../Base/base");
const ReactionManager = require("../Managers/ReactionManager");
const Collection = require("../Util/Collection");
const { SnowflakeRegex, NonSystemMessageTypes, MessageTypeEnums } = require("../Util/Constants");
const MessageFlags = require("../Util/MessageFlags");
const Permissions = require("../Util/Permissions");
const Snowflake = require("../Util/Snowflake");
const Application = require("./Application");
const Attachment = require("./Attachment");
const Component = require("./Component");
const Embed = require("./Embed");
const MessageActivity = require("./MessageActivity");
const MessageInteraction = require("./MessageInteraction");
const MessageMentions = require("./MessageMentions");
const MessageReference = require("./MessageReference");
const Webhook = require("./Webhook");
class Message extends Base {
    constructor(data = {}, client, extras) {
        super(client)
        Object.defineProperties(this, {
            _author: {
                value: data.author
            },
            _member: {
                value: data.member
            }
        })
        this.partial = data.partial ?? false
        this.id = data.id ?? null
        this.guildId = data.guild_id ?? extras?.guildId ?? null
        this.channelId = data.channel_id ?? extras?.channelId ?? null
        this.content = data.content ?? null
        this.createdAt = data.id ? Snowflake.deconstruct(data.id).createdAt : null
        this.createdTimestamp = this.createdAt?.getTime() ?? null
        this.editedAt = data.edited_timestamp ? new Date(data.edited_timestamp) : null
        this.editedTimestamp = this.editedAt?.getTime() ?? null
        this.tts = data.tts ?? null
        this.attachments = new Collection(data.attachments?.map(o => [o.id, new Attachment(o, this.client)]))
        this.embeds = data.embeds?.map(o => new Embed(o)) ?? []
        this.reactions = new ReactionManager(this.client, this.id, this.guildId, this.channelId, data.reactions)
        this.nonce = data.nonce ?? null
        this.pinned = data.pinned ?? null
        this.webhookId = data.webhook_id ?? null
        this.type = data.type ?? null
        this.activity = data.activity ? new MessageActivity(data.activity, this.client) : null
        this.application = data.application ? new Application(data.application, this.client) : null
        this.applicationId = data.application_id ?? null
        this.reference = data.message_reference ? new MessageReference({ message_reference: data.message_reference, message: data.referenced_message }, this.client) : null
        this.flags = new MessageFlags(data.flags).freeze()
        this.interaction = data.interaction ? new MessageInteraction(data.interaction, this.guildId, this.client) : null
        this.thread = this.client.channels._add(data.thread)
        this.components = data.components?.map(o => new Component(o, this.client)) ?? []
        this.stickers = new Collection(data.sticker_items?.map(o => [o.id, this.guild?.stickers._add(o)]))
        this.position = data.position ?? null
        this.mentions = new MessageMentions({
            mentions: data.mentions,
            channels: data.content?.match(/<#\d{17,19}>/gi),
            crossPostedChannels: data.mention_channels,
            roles: data.mention_roles ?? null,
            reference: this.reference,
            everyone: data.mention_everyone
        }, this.guildId, this.client)
        this.url = data.id ? `https://discord.com/channels/${!this.guildId ? `@me` : this.guildId}/${this.channelId}/${this.id}` : null
    }

    inGuild() {
        if(this.guildId) return true;
        return false;
    }

    isReply() {
        if(this.type === MessageTypeEnums.Reply) return true;
        return false;
    }

    get system() {
        if(!NonSystemMessageTypes.includes(this.type)) return true;
        return false;
    }

    get member() {
        return this.guild?.members._add({ user: this.author, ...this._member }, { cache: true })
    }

    get author() {
        return this.client.users._add(this._author, { cache: true })
    }

    get guild() {
        return this.client.guilds.cache.get(this.guildId) ?? null
    }

    get channel() {
        return this.guild?.channels.cache.get(this.channelId) ?? this.client.channels.cache.get(this.channelId) ?? null
    }

    async fetch(options = {}) {
        return await this.channel?.messages.fetch(this, options)
    }

    async edit(options) {
        return await this.channel?.messages.edit(this, options)
    }

    async delete(reason) {
        return await this.channel?.messages.delete(this, reason)
    }

    async crosspost() {
        return await this.channel?.messages.crosspost(this)
    }

    async react(emoji) {
        return await this.channel?.messages.react(this, emoji)
    }

    async pin(reason) {
        return await this.channel?.messages.pin(this, reason)
    }

    async unpin(reason) {
        return await this.channel?.messages.pin(this, reason)
    }

    async removeEmbeds() {
        return await this.edit({ flags: MessageFlags.Flags.SuppressEmbeds })
    }

    async removeAttachments() {
        if(!this.attachments.size) throw new RangeError(`No Attachments found in this Message`)
        return await this.edit({ attachments: [] })
    }

    async removeAttachment(attachment) {
        if(!attachment) return await this.removeAttachments()
        const attachmentId = attachment instanceof Attachment ? attachment.id : attachment
        if(!SnowflakeRegex.test(attachmentId)) throw new RangeError(`Invalid Attachment`)
        if(!this.attachments.has(attachmentId)) throw new RangeError(`Attachment not found`)
        this.attachments.delete(attachmentId)
        return await this.edit({ attachments: [...this.attachments.keys()] })
    }

    async createThread(options = {}) {
        return await this.channel?.threads.createThreadFromMessage(this, options)
    }

    async fetchWebhook() {
        if(!this.webhookId) return null;
        const webhook = await this.client.api.get(`${this.client.root}/webhooks/${this.webhookId}`)
        return new Webhook(webhook, this.client)
    }
    
    getEmbedFields() {
        if(!this.embeds?.length) throw new RangeError(`No Embed found in this Message`)
        const fields = this.embeds.reduce((acc, val) => acc.concat(val.fields), [])
        if(!fields.length) return null;
        return fields
    }

    async reply(options = {}) {
        return await this.channel?.messages.send({ reference: {
            messageId: this.id,
            failIfNotExists: options.failIfNotExists
        }, ...options })
    }

}

module.exports = Message