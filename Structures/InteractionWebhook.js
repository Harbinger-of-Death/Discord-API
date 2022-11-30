const DataPayload = require("../Util/DataPayload");
const Webhook = require("./Webhook");
class InteractionWebhook extends Webhook {
    constructor(data = {}, client) {
        super({}, client)
        this.id = data.id ?? null
        this.interactionId = data.interactionId ?? null
        this.token = data.token ?? null
        this.channelId = data.channelId ?? null
        this.guildId = data.guildId ?? null
    }

    async reply(options = {}, type) {
        const body = await DataPayload.create(options, type ?? 4)
        await this.client.api.post(`${this.client.root}/interactions/${this.interactionId}/${this.token}/callback`, { body })
        if(options.fetchReply) return await this.fetchMessage(`@original`)
        return;
    }
}

module.exports = InteractionWebhook