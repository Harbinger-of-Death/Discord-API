const Collection = require("../Util/Collection")
const { OpCodes } = require("../Util/Constants")
const GuildChannel = require("./GuildChannel")
class VoiceBasedChannels extends GuildChannel {
    constructor(data = {}, client, extras) {
        super(data, client, extras)
        this.bitrate = data.bitrate ?? null
        this.rtcRegion = data.rtc_region ?? null
    }

    async setBitrate(bitrate, reason) {
        return await this.edit({ bitrate, reason })
    }

    async setRtcRegion(rtcRegion, reason) {
        return await this.edit({ rtcRegion, reason })
    }

    get members() {
        const collection = new Collection()
        for(const state of this.guild?.voiceStates.cache.values()) {
            if(state.channelId === this.id && state.member) collection.set(state.userId, state)
        }

        return collection

    }

    join({ selfMute = false, selfDeaf = false } = {}) {
        return this.client.ws.send({
            op: OpCodes.VoiceStateUpdate,
            d: {
                guild_id: this.guildId,
                channel_id: this.id,
                selfMute,
                selfDeaf
            }
        })
    }

    equals(channel) {
        return super.equals(channel) &&
        this.rtcRegion === channel.rtcRegion &&
        this.bitrate === channel.bitrate

    }
}

module.exports = VoiceBasedChannels