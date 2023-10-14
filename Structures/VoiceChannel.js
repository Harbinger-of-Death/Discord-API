const VoiceBasedChannels = require("./VoiceBasedChannels");
class VoiceChannel extends VoiceBasedChannels {
    constructor(data = {}, client, extras) {
        super(data, client, extras)
        this.videoQualityMode = data.video_quality_mode ?? null
        this.status = data.status ?? null
        this.userLimit = data.user_limit ?? null
    }

    async setUserLimit(userLimit, reason) {
        return await this.edit({ userLimit, reason })
    }

    async setVideoQualityMode(videoQualityMode, reason) {
        return await this.edit({ videoQualityMode, reason })
    }

    equals(channel) {
        return super.equals(channel) &&
        this.videoQualityMode === channel.videoQualityMode &&
        this.status === channel.status &&
        this.userLimit === channel.userLimit
    }

}

module.exports = VoiceChannel