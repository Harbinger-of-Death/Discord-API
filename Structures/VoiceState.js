const Base = require("../Base/base");

class VoiceState extends Base {
    constructor(data = {}, client, extras) {
        super(client)
        Object.defineProperty(this, "_member", { value: data.member })
        this.partial = data.partial ?? false
        this.guildId = data.guild_id ?? extras?.guildId ?? null
        this.channelId = data.channel_id ?? null
        this.userId = data.user_id ?? null
        this.sessionId = data.session_id ?? null
        this.deaf = data.deaf ?? null
        this.mute = data.mute ?? null
        this.selfDeaf = data.self_deaf ?? null
        this.selfMute = data.self_mute ?? null
        this.selfStream = data.self_stream ?? null
        this.selfVideo = data.self_video ?? null
        this.suppress = data.suppress ?? null
        this.requestToSpeak = data.request_to_speak_timestamp ? new Date(data.request_to_speak_timestamp) : null
        this.requestToSpeakTimestamp = this.requestToSpeak?.getTime() ?? null
    }

    get member() {
        return this.guild?.members._add(this._member ?? this.userId)
    }

    get guild() {
        return this.client.guilds.cache.get(this.guildId) ?? null
    }

    get channel() {
        return this.client.channels.cache.get(this.channelId) ?? null
    }

    async edit(options = {}) {
        return await this.guild?.voiceStates.modifyUserVoice(this.userId, options)
    }

    async setChannel(channel, reason) {
        return await this.guild?.members.edit(this.userId, { channel, reason })
    }

    async setMute(mute, reason) {
        return await this.guild?.members.edit(this.userId, { mute, reason })
    }

    async setDeaf(deaf, reason) {
        return await this.guild?.members.edit(this.userId, { deaf, reason })
    }

    async setRequestToSpeak(requestToSpeak) {
        return await this.edit({ requestToSpeak })
    }

    async setSuppress(suppress) {
        return await this.edit({ suppress })
    }

    equals(voiceState) {
        return this.channelId === voiceState.channelId &&
        this.sessionId === voiceState.sessionId &&
        this.deaf === voiceState.deaf &&
        this.mute === voiceState.mute &&
        this.selfDeaf === voiceState.selfDeaf &&
        this.selfMute === voiceState.selfMute &&
        this.selfVideo === voiceState.selfVideo &&
        this.selfStream === voiceState.selfStream &&
        this.suppress === voiceState.suppress &&
        this.requestToSpeak?.getTime() === voiceState.requestToSpeak?.getTime()
    }
}

module.exports = VoiceState