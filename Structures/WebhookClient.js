const Base = require("../Base/base");
const DataPayload = require("../Util/DataPayload");
const Webhook = require("./Webhook");

class WebhookClient extends Base {
    constructor(data = {}, client) {
        super(client)
        if(typeof data.url === "string") {
            const match = data.url.match(/https?:\/\/(?:\w+.)\w+\.(?:com|io|org)\/api\/webhooks\/(\d{17,19})\/([\w-]+)?/)
            if(match?.length) {
                this.id = match[1]
                this.token = match[2]
            }
        } else {
            this.token = data.token ?? null
            this.id = data.id ?? null
        }

        this.url = `https://canary.discord.com/api/webhooks/${this.id}${this.token ? `/${this.token}` : ""}`
    }

    async fetchWebhook() {
        const webhook = await this.client.api.get(`${this.client.root}/webhooks/${this.id}${this.token ? `/${this.token}` : ""}`)
        return new Webhook(webhook, this.client)
    }

    async send(options = {}) {
        const body = await DataPayload.create(options)
        const query = { thread_id: typeof options.thread === "string" ? options.thread : options.thread?.id, wait: options.wait }
        const message = await this.client.api.post(`${this.client.root}/webhooks/${this.id}/${this.token}`, { body, query })
        if(message) return this.client.channels.cache.get(message.channel_id)?.messages._add(message)
        return;
    }

}

module.exports = WebhookClient