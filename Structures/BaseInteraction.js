const Interaction = require("./Interaction");
class BaseInteraction extends Interaction {

    async reply(options = {}) {
        return await this.webhook.reply(options, 4)
    }

    async deferReply(options = {}) {
        return await this.webhook.reply(options, 5)
    }

    async editReply(options = {}) {
        return await this.webhook.editMessage(options.message ?? "@original", options)
    }

    async deleteReply(message) {
        return await this.webhook.deleteMessage(message ?? "@original")
    }

    async followUp(options = {}) {
        return await this.webhook.sendMessage(options)
    }

    async fetchReply(message) {
        return await this.webhook.fetchMessage(message ?? "@original")
    }

    async showModal(options = {}) {
        return await this.webhook.reply(options, 9)
    }

}

module.exports = BaseInteraction