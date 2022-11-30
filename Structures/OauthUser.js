const User = require("./User");

class OauthUser extends User {
    constructor(data = {}, client) {
        super(data, client)
        this.locale = data.locale ?? null
        this.mfaEnabled = data.mfa_enabled ?? null
        this.premiumType = data.premium_type ?? null
        this.email = data.email ?? null
        this.verified = data.verified ?? null
    }
}

module.exports = OauthUser