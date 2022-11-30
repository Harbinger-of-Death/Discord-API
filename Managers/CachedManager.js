const Base = require("../Base/base");
const Collection = require("../Util/Collection");
class CachedManager extends Base {
    constructor(holds, client, iterable, extras) {
        super(client)
        Object.defineProperties(this, {
            _cache: {
                value: new Collection()
            },
            holds: {
                value: holds,
                writable: true
            },
            extras: {
                value: extras
            },

        })
        
        if(iterable?.length) {
            for(const item of iterable) {
                this._add(item)
            }
        }
    }

    _add(data, options = { cache: true, force: false }, extras = this.extras ?? {}) {
        if(!data) return null;
        const snowflake = typeof data === "string" ? data : data.user?.id ?? data.user_id ?? data.id
        let entry
        if(this.cache.has(snowflake) && !options.force) {
            entry = this.cache.get(snowflake)
        } else {
            entry = new this.holds(typeof data === "string" ? {
                partial: true,
                id: snowflake
            } : data, this.client, extras)
            if(options.cache) this.cache.set(snowflake, entry)
        }

        return entry
    }


    get cache() {
        return this._cache
    }
}

module.exports = CachedManager