const StageChannel = require("../Structures/StageChannel");
const StageInstance = require("../Structures/StageInstance");
const { ChannelTypesEnums } = require("../Util/Constants");
const CachedManager = require("./CachedManager");
class StageInstanceManager extends CachedManager {
    constructor(guildId, client, iterable) {
        super(StageInstance, client, iterable, { guildId })
        this.guildId = guildId ?? null
    }

    _add(stageInstances, options = { cache: true, force: false }){
        return super._add(stageInstances, options)
    }

    async fetch(channel, options = {}) {
        const stageChannel = this.client.channels.cache.get(channel instanceof StageChannel ? channel.id : channel)
        if(!stageChannel) throw new RangeError(`Invalid Stage Channel`)
        if(stageChannel.type !== ChannelTypesEnums.GuildStageVoice) throw new RangeError(`Specified Channel is not a Stage Channel`)
        const { cache = true, force = false } = options
        const stageInstance = await this.client.api.get(`${this.client.root}/stage-instances/${stageChannel?.id}`)
        return this._add(stageInstance, { cache, force })
    }

    async create(options = {}) {
        const { reason } = options
        const stageChannel = this.client.channels.cache.get(options.channel instanceof StageChannel ? options.channel.id : options.channel)
        if(!stageChannel) throw new RangeError(`Invalid Stage Channel`)
        if(stageChannel.type !== ChannelTypesEnums.GuildStageVoice) throw new RangeError(`Specified Channel is not a Stage Channel`)
        const body = {
            channel_id: stageChannel.id,
            topic: options.topic,
            privacy_level: options.privacyLevel,
            send_start_notification: options.sendStartNotification,
            guild_scheduled_event_id: typeof options.guildScheduledEvent === "string" ? options.guildScheduledEvent : options.guildScheduledEvent?.id
        }
        const stageInstance = await this.client.api.post(`${this.client.root}/stage-instances`, { reason, body })
        return this._add(stageInstance, { cache: true })
    }

    async edit(channel, options = {}) {
        const { reason } = options
        const stageChannel = this.client.channels.cache.get(channel instanceof StageChannel ? channel.id : channel)
        if(!stageChannel) throw new RangeError(`Invalid Stage Channel`)
        if(stageChannel.type !== ChannelTypesEnums.GuildStageVoice) throw new RangeError(`Specified Channel is not a Stage Channel`)
        const body = {
            topic: options.topic,
            privacy_level: options.privacyLevel,
        }
        const stageInstance = await this.client.api.patch(`${this.client.root}/stage-instances/${stageChannel?.id}`, { reason, body })
        return this._add(stageInstance, { cache: true })

    }

    async delete(channel, reason) {
        const channelId = channel instanceof StageChannel ? channel.id : channel
        if(!SnowflakeRegex.test(channelId)) throw new RangeError(`Invalid Stage Channel`)
        await this.client.api.delete(`${this.client.root}/stage-instances/${channelId}`, { reason })
        return;
    }

}


module.exports = StageInstanceManager