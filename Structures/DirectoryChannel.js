const GuildChannel = require("./GuildChannel");
class DirectoryChannel extends GuildChannel {
    constructor(data = {}, client, extras) {
        super(data, client, extras)
    }
}

module.exports = DirectoryChannel