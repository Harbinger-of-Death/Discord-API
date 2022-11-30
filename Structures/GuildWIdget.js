const Base = require("../Base/base");
const Collection = require("../Util/Collection");
const PartialWidgetChannel = require("./PartialWidgetChannel");
const PartialWidgetUser = require("./PartialWidgetUser");

class GuildWidget extends Base {
    constructor(data = {}, client) {
        super(client)
        this.id = data.id ?? null
        this.name = data.name ?? null
        this.instantInvite = data.instant_invite ?? null
        this.channels = new Collection(data.channels?.map(o => [o.id, new PartialWidgetChannel(o, this.client)]))
        this.members = new Collection(data.members?.map(o => [o.id, new PartialWidgetUser(o, this.client)]))
        this.presenceCount = data.presence_count ?? null
    }

    get guild() {
        return this.client.guilds.cache.get(this.id) ?? null
    }
}

module.exports = GuildWidget