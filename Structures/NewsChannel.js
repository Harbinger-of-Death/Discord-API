const BaseGuildTextChannel = require("./BaseGuildTextChannel");
class NewsChannel extends BaseGuildTextChannel {
    constructor(data = {}, client, extras) {
        super(data, client, extras)
    }

    async follow(webhookChannel) {
        return await this.client.channels.follow(this, webhookChannel)
    }
}

module.exports = NewsChannel