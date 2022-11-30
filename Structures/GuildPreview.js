const Base = require("../Base/base");
const Collection = require("../Util/Collection");

class GuildPreview extends Base {
    constructor(data = {}, client) {
        super(client)
        this.id = data.id ?? null
        this.name = data.name ?? null
        this.icon = data.icon ?? null
        this.splash = data.splash ?? null
        this.discoverySplash = data.discovery_splash ?? null
        this.emojis = new Collection(data.emojis?.map(o => [o.id, o]))
        this.features = data.features ?? null
        this.approximatePresenceCount = data.approximate_presence_count ?? null
        this.approximateMemberCount = data.approximate_member_count ?? null
        this.description = data.description ?? null
        this.stickers = new Collection(data.stickers?.map(o => [o.id, o]))
    }

    get guild() {
        return this.client.guilds.cache.get(this.id) ?? null
    }

    iconURL(options = {}) {
        if(!this.icon) return null;
        return this.client.cdn.GuildIcon(this.icon, options.extension, options.size, options.forceStatic, this.id)
    }

    splashURL(options = {}) {
        if(!this.splash) return null;
        return this.client.cdn.GuildSplash(this.splash, options.extension, options.size, this.id)
    }

    discoverySplashURL(options = {}) {
        if(!this.discoverySplash) return null;
        return this.client.cdn.GuildDiscoverySplash(this.discoverySplash, options.extension, options.size, this.id)
    }

}

module.exports = GuildPreview