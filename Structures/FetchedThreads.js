const Base = require("../Base/base");
const Collection = require("../Util/Collection");
const ThreadMember = require("./ThreadMember");

class FetchedThreads extends Base {
    constructor(data = {}, client) {
        super(client)
        this.threads = new Collection(data.threads?.map(o => [o.id, this.client.channels._add(o, o.guild_id, { cache: false })]))
        this.members = new Collection(data.members?.map(o => [o.user_id, new ThreadMember(o, this.client)]))
        this.hasMore = data.has_more ?? null
    }
}

module.exports = FetchedThreads