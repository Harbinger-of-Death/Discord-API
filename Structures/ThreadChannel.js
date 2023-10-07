const MessageManager = require("../Managers/MessageManager");
const ThreadMemberManager = require("../Managers/ThreadMemberManager");
const ChannelFlags = require("../Util/ChannelFlags");
const { ChannelTypesEnums } = require("../Util/Constants");
const Channel = require("./Channel");
class ThreadChannel extends Channel {
    constructor(data = {}, client, extras) {    
        super(data, client, extras)
        this.userId = data.user_id ?? null
        this.name = data.name ?? null
        this.lastMessageId = data.last_message_id ?? null
        this.rateLimitPerUser = data.rate_limit_per_user ?? null
        this.ownerId = data.owner_id ?? null
        this.parentId = data.parent_id ?? null
        this.lastPinnedAt = data.last_pin_timestamp ? new Date(data.last_pin_timestamp) : null
        this.lastPinnedTimestamp = this.lastPinnedAt?.getTime() ?? null
        this.messageCount = data.message_count ?? null
        this.memberCount = data.member_count ?? null
        this.archived = data.thread_metadata?.archived ?? null
        this.autoArchiveDuration = data.thread_metadata?.auto_archive_duration ?? null
        this.archiveAt = data.thread_metadata?.archive_timestamp ? new Date(data.thread_metadata.archive_timestamp) : null
        this.archiveTimestamp = this.archiveAt?.getTime() ?? null
        this.locked = data.thread_metadata?.locked ?? null
        this.invitable = data.thread_metadata?.invitable ?? null
        this.members = new ThreadMemberManager(this.guildId, this.id, this.client)
        this.flags = new ChannelFlags(data.flags)
        this.messages = new MessageManager(this.id, this.guildId, this.client)
    }

    get member() {
        return this.members._add(this._data.member ?? this.client.user.id)
    }

    get appliedTags() {
        return this.parent?.isForum() ? this.parent.availableTags.filter(o => this._data.applied_tags?.includes(o.id)) : null
    }

    async setName(name, reason) {
        return await this.edit({ name, reason })
    }

    async setArchived(archived, reason) {
        return await this.edit({ archived, reason })
    }

    async setFlags(flags, reason) {
        return await this.edit({ flags, reason })
    }

    async fetchStarterMessage(options = {}) {
        return await this.messages?.fetch(this.id, options)
    }

    async setAutoArchiveDuration(autoArchiveDuration, reason) {
        return await this.edit({ autoArchiveDuration, reason })
    }

    async setLocked(locked, reason) {
        return await this.edit({ locked, reason })
    }

    async setInvitable(invitable, reason) {
        return await this.edit({ invitable, reason })
    }

    async setRateLimitPerUser(rateLimitPerUser, reason) {
        return await this.edit({ rateLimitPerUser, reason })
    }

    async setFlags(flags, reason) {
        return await this.edit({ flags, reason })
    }

    async setAppliedTags(appliedTags, reason) {
        return await this.edit({ appliedTags, reason })
    }

    get parent() {
        return this.client.channels.cache.get(this.parentId) ?? null
    }

    get guild() {
        return this.client.guilds.cache.get(this.guildId) ?? null
    }

    async send(options) {
        return await this.messages.send(options)
    }

    async bulkDelete(messages, options = {}) {
        return await this.messages.bulkDelete(messages, options)
    }

    isCategory() {
        if(this.type === ChannelTypesEnums.GuildCategory) return true;
        return false;
    }

    isDM() {
        if(this.type === ChannelTypesEnums.Dm) return true;
        return false;
    }

    isGuildText() {
        if(this.type === ChannelTypesEnums.GuildText) return true;
        return false;
    }

    isText() {
        if([ChannelTypesEnums.GuildText, ChannelTypesEnums.GuildVoice, ChannelTypesEnums.Dm, ChannelTypesEnums.GuildAnnouncement].includes(this.type)) return true;
        return false;
    }

    isGuildVoice() {
        if(this.type === ChannelTypesEnums.GuildVoice) return true;
        return false;
    }

    isVoice() {
        if([ChannelTypesEnums.GuildVoice, ChannelTypesEnums.GuildStageVoice].includes(this.type)) return true;
        return false;
    }

    isThread() {
        if([ChannelTypesEnums.PublicThread, ChannelTypesEnums.PrivateThread, ChannelTypesEnums.AnnouncementThread].includes(this.type)) return true;
        return false;
    }

    isNews() {
        if(this.type === ChannelTypesEnums.GuildAnnouncement) return true;
        return false;
    }

    isStage() {
        if(this.type === ChannelTypesEnums.GuildStageVoice) return true;
        return false;
    }

    inGuild() {
        if(this.guildId) return true;
        return false;
    }

    isForum() {
        if(this.type === ChannelTypesEnums.GuildForum) return true;
        return false;
    }

    async fetchOwner(options = {}) {
        return await this.guild?.members.fetch(this.ownerId, options)
    }
    
    async sendTyping() {
        return await this.client.channels.sendTyping(this)
    }

    permissionsFor(userOrRole) {
        return this.parent?.permissionsFor(userOrRole)
    }

    toJSON() {
        return { ...this._data }
    }

    equals(channel) {
        return super.equals(channel) &&
        this.autoArchiveDuration === channel.autoArchiveDuration &&
        this.rateLimitPerUser === channel.rateLimitPerUser &&
        this.appliedTags?.size === channel.appliedTags?.size &&
        this.archived === channel.archived &&
        this.locked === channel.locked &&
        this.archiveTimestamp === channel.archiveTimestamp &&
        this.appliedTags?.every(tags => tags.equals(channel.appliedTags?.get(tags.id)))
    }

    get permissionOverwrites() {
        return this.parent?.permissionOverwrites ?? null
    }

    createMessageCollector(options = {}) {
        return new MessageCollector(options.filter, { type: "Message", ...options }, { channelId: this.id, guildId: this.guildId }, this.client)
    }
}

module.exports = ThreadChannel