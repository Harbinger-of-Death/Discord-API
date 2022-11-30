const Base = require("../Base/base");
const Client = require("../Client/client");
const Oauth2 = require("../Structures/Oauth2");
class Oauth2Client extends Base {
    constructor(client, options = {}) {
        super(client)
        if(!(client instanceof Client)) throw new RangeError(`client isn't an instanceof Client`)
        this.clientId = this.client.user.id ?? options.clientId ?? null
        this.clientSecret = options.clientSecret ?? null
        this.oauth2 = `https://discord.com/api/v${this.client.version}/oauth2`
    }

    async getToken(options = {}) {
        const auth = {
            grant_type: options.grantType,
            scope: Array.isArray(options.scopes) ? options.scopes?.map(o => o).join(" ") : options.scopes,
            client_id: this.clientId,
            client_secret: this.clientSecret,
            redirect_uri: options.redirectUri,
            code: options.code
        }

        const response = await this.client.api.post(`${this.oauth2}/token`, { auth })
        return new Oauth2(response, this.cleint)
    }

    async refreshToken(refreshToken) {
        if(!refreshToken) throw new RangeError(`Missing Refresh Token`)
        const auth = {
            grant_type: "refresh_token",
            client_id: this.clientId,
            client_secret: this.clientSecret,
            refresh_token: refreshToken
        }

        const response = await this.client.api.post(`${this.oauth2}/token`, { auth })
        return new Oauth2(response, this.client)
    }

}

module.exports = Oauth2Client