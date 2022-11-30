const Base = require("../Base/base");

class IntegrationApplication extends Base {
    constructor(data = {}, client) {
        super(client)
        this.id = data.id ?? null
        this.name = data.name ?? null
        this.icon = data.icon ?? null
        this.description = data.description ?? null
        this.bot = this.client.users._add(data.bot, { cache: false }) ?? null
    }
}

module.exports = IntegrationApplication