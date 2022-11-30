const Base = require("../Base/base");

class Oauth2 extends Base {
    constructor(data = {}, client) {
        super(client)
        this.accessToken = data.access_token ?? null
        this.expiresAt = data.expires_in ? new Date(Date.now() + (data.expires_in * 1000)) : null
        this.expiresTimestamp = this.expiresAt?.getTime() ?? null
        this.scope = data.scope ?? null
        this.tokenType = data.token_type ?? null
        this.refreshToken = data.refresh_token ?? null
    }
}

module.exports = Oauth2