const Base = require("../Base/base");

class TeamMember extends Base {
    constructor(data = {}, client) {
        super(client)
        this.memberShipState = data.membership_state ?? null
        this.permissions = data.permissions ?? null
        this.teamId = data.team_id ?? null
        this.user = this.client.users._add(data.user, { cache: false }) ?? null
    }
}

module.exports = TeamMember;