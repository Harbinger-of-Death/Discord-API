const Base = require("../Base/base");
const { ChannelTypesEnums } = require("../Util/Constants");
const Snowflake = require("../Util/Snowflake");
class Channel extends Base {
    constructor(data = {}, client, extras) {
        super(client)
        Object.defineProperty(this, "_data", { value: data })
        this.partial = data.partial ?? false
        this.id = data.id ?? null
        this.name = data.name ?? null
        this.type = data.type ?? null
        this.guildId = data.guild_id ?? extras?.guildId ?? null
        this.createdAt = data.id ? Snowflake.deconstruct(data.id).createdAt : null
        this.createdTimestamp = this.createdAt?.getTime() ?? null
        this.url = data.id ? `https://discord.com/channels/${!this.guildId ? `@me` : this.guildId}/${data.id}` : null
    }

    get guild() {
        return this.client.guilds.cache.get(this.guildId) ?? null
    }

    async fetch(options = {}) {
        return this.client?.channels.fetch(this, options)
    }

    async edit(options = {}) {
        return this.client?.channels.edit(this, options)
    }

    async delete(reason) {
        return this.client?.channels.delete(this, reason)
    }

    async setName(name, reason) {
        return await this.edit({ name, reason })
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

    isForum() {
        if(this.type === ChannelTypesEnums.GuildForum) return true;
        return false;
    }

    inGuild() {
        if(this.guildId) return true;
        return false;
    }

    toJSON() {
        return { ...this._data }
    }

    equals(channel) {
        return this.name === channel.name && 
        this.topic === channel.topic &&
        this.type === channel.type
    }
    
    toString() {
        return `<#${this.id}>`
    }

}

module.exports = Channel
