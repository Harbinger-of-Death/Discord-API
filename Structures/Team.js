const Base = require("../Base/base");
const Collection = require("../Util/Collection");
const Snowflake = require("../Util/Snowflake");
const TeamMember = require("./TeamMember");

class Team extends Base {
    constructor(data = {}, client) {
        super(client)
        this.icon = data.icon ?? null
        this.id = data.id ?? null
        this.members = new Collection(data.members?.map(o => [o.user?.id, new TeamMember(o, this.client)]))
        this.name = data.name ?? null
        this.ownerUserId = data.owner_user_id ?? null
        this.createdAt = data.id ? Snowflake.deconstruct(data.id).createdAt : null
        this.createdTimestamp = this.createdAt?.getTime() ?? null
    }

    iconURL(options = {}) {
        if(!this.icon) return null;
        return this.client.cdn.TeamIcon(this.icon, options.extension, options.size, this.id)
    }
}

module.exports = Team;