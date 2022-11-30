const Base = require("../Base/base");
const ActivityFlags = require("../Util/ActivityFlags");
const RichPresetAsset = require("./RichPresetAsset");

class Acitivity extends Base {
    constructor(data = {}, client) {
        super(client)
        this.name = data.name ?? null
        this.type = data.type ?? null
        this.url = data.url ?? null
        this.createdAt = data.created_at ? new Date(data.created_at) : null
        this.createdTimestamp = this.createdAt?.getTime() ?? null
        this.timestamps = data.timestamps ? { start: data.timestamps.start ? new Date(data.timestamps.start) : null, end: data.timestamps.end ? new Date(data.timestamps.end) : null } : null
        this.applicationId = data.application_id ?? null
        this.details = data.details ?? null
        this.state = data.state ?? null
        this.party = data.party ? { id: data.party.id, size: data.party.size } : null
        this.assets = data.assets ? new RichPresetAsset({ ...data.assets, application_id: this.applicationId }, this.client) : null
        this.secrets = data.secrets ? { join: data.secrets.join, spectate: data.secrets.spectate, match: data.secrets.match } : null
        this.instance = data.instance ?? null
        this.flags = new ActivityFlags(data.flags)
        this.buttons = data.buttons?.map(val => { return { label: val.label, url: val.url } }) ?? []
        this.emoji = data.emoji ? { id: data.emoji.id, name: data.emoji.name, animated: data.emoji.animated } : null
    }

    equals(activity) {
        return this === activity || this.name === activity.name &&
        this.type === activity.type &&
        this.url === activity.url &&
        this.state === activity.state &&
        this.details === activity.details
    }

}

module.exports = Acitivity