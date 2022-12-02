const Base = require("../Base/base");
const Acitivity = require("./Activity");
class Presence extends Base {
    constructor(data = {}, client, extras) {
        super(client)
        this.guildId = data.guild_id ?? extras?.guildId ?? null
        this.activities = data.activities?.map(o => new Acitivity(o, this.guildId, this.client)) ?? []
        this.userId = data.user?.id ?? data.userId ?? null
        this.partial = data.partial ?? false
        this.status = data.status ?? null
        this.clientStatus = data.client_status ? {} : null
        if(data.client_status) {
            if("desktop" in data.client_status) this.clientStatus.desktop = data.client_status.desktop
            if("mobile" in data.client_status) this.clientStatus.mobile = data.client_status.mobile
            if("web" in data.client_status) this.clientStatus.web = data.client_status.web
        }
    }

    get user() {
        return this.client.users.cache.get(this.userId) ?? null
    }

    get guild() {
        return this.client.guilds.cache.get(this.guildId) ?? null
    }

    equals(presence) {
        return this === presence || this.status === presence.status &&
        this.clientStatus === presence.client_status &&
        this.activities?.length === presence.activities?.length &&
        this.activities?.every((activities, index) => activities.equals(presence.activities[index]))
    }
}

module.exports = Presence