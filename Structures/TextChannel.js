const BaseGuildTextChannel = require("./BaseGuildTextChannel");

class TextChannel extends BaseGuildTextChannel {
    constructor(data = {}, client, extras) {
        super(data, client, extras)
    }

    async setRateLimitPerUser(rateLimitPerUser, reason) {
        return await this.edit({ rateLimitPerUser, reason })
    }
}

module.exports = TextChannel