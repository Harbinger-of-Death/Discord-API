const VoiceBasedChannels = require("./VoiceBasedChannels");
class StageChannel extends VoiceBasedChannels {
    constructor(data = {}, client, extras) {
        super(data, client, extras)
    }

    getStageInstance() {
        return this.guild?.stageInstances.cache.find(o => o.channelId === this.id)
    }

    async createStageInstance(options = {}) {
        options["channel"] = this
        return await this.guild?.stageInstances.create(options)
    }
}

module.exports = StageChannel