const { User } = require("discord.js");
const GuildMember = require("../Structures/GuildMember");
const VoiceState = require("../Structures/VoiceState");
const { SnowflakeRegex } = require("../Util/Constants");
const Util = require("../Util/Util");
const CachedManager = require("./CachedManager");
class VoiceStateManager extends CachedManager {
    constructor(guildId, client, iterable) {
        super(VoiceState, client, iterable, { guildId })
        this.guildId = guildId
    }

    _add(voiceStates, options = { cache: true, force: false }) {
        return super._add(voiceStates, options)
    }

    async modifyUserVoice(user, options = {}) {
        let userId = user instanceof User || user instanceof GuildMember ? user.id : user
        if(!SnowflakeRegex.test(userId)) throw new RangeError(`Invalid User`)
        const channelId = typeof options.channel === "string" ? options.channel : options.channel?.id
        if(!this.client.channels.cache.has(channelId) && options.channel) throw new RangeError(`Invalid Channel`)
        const body = {
            channel_id: channelId,
            suppress: options.suppress,
            request_to_speak_timestamp: options.requestToSpeak ? Util.generateDateISOString(options.requestToSpeak) : undefined
        }
        if(userId === this.client.user.id) userId = "@me"
        await this.client.api.patch(`${this.client.root}/guilds/${this.guildId}/voice-states/${userId}`, { body })
        return userId === "@me" ? this.cache.get(this.client.user.id) : this.cache.get(userId)
    }

}

module.exports = VoiceStateManager