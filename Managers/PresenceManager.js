const Presence = require("../Structures/Presence");
const CachedManager = require("./CachedManager");
class PresenceManager extends CachedManager {
    constructor(guildId, client, iterable) {
        super(Presence, client, iterable, { guildId })
        this.guildId = guildId ?? null
    }

    _add(presences, options = { cache: true, force: false }) {
        return super._add(presences, options)
    }

}

module.exports = PresenceManager