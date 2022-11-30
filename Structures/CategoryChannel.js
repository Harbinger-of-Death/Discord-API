const GuildChannel = require("./GuildChannel");
class CategoryChannel extends GuildChannel {
    constructor(data = {}, client, extras) {
        super(data, client, extras)
        delete this["topic"]
        delete this["parentId"]
    }

    get childrens() {
        return this.guild?.channels.cache.filter(o => o.parentId === this.id)
    }
}

module.exports = CategoryChannel