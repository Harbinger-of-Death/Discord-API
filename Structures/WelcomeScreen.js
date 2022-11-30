const Base = require("../Base/base");
const Collection = require("../Util/Collection");
const WelcomeChannel = require("./WelcomeChannel");

class WelcomeScreen extends Base {
    constructor(data = {}, guildId, client) {
        super(client)
        this.description = data.description ?? null
        this.welcomeChannels = new Collection(data.welcome_channels?.map(o => [o.channel_id, new WelcomeChannel(o, guildId, this.client)]))
        this.guildId = guildId ?? null
    }

    get guild() {
        return this.client.guilds.cache.get(this.guildId) ?? null
    }

}

module.exports = WelcomeScreen