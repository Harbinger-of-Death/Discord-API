const ApplicationCommandManager = require("../Managers/ApplicationCommandManager");
const Application = require("./Application");

class ClientApplication extends Application {
    constructor(data = {}, client) {
        super(data, client)
        this.commands = new ApplicationCommandManager(this.client)
    }

    async fetch() {
        const application = await this.client.api.get(`${this.client.root}/oauth2/applications/@me`)
        this.client.application = new this.constructor(application, this.client)
        return this.client.application
    }
}

module.exports = ClientApplication