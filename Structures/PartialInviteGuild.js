const Base = require("../Base/base");
const WelcomeScreen = require("./WelcomeScreen");
class PartialInviteGuild extends Base {
    constructor(data = {}, client) {
        super(client)
        this.id = data.id ?? null
        this.name = data.name ?? null
        this.splash = data.splash ?? null
        this.banner = data.banner ?? null
        this.description = data.description ?? null
        this.icon = data.icon ?? null
        this.features = data.features ?? null
        this.verificationLevel = data.verification_level ?? null
        this.vanityUrlCode = data.vanity_url_code ?? null
        this.nsfwLevel = data.nsfw_levvel ?? null
        this.premiumSubscriptionCount = data.premium_subscription_count ?? null
        this.nsfw = data.nsfw ?? null
        this.welcomeScreen = data.welcome_screen ? new WelcomeScreen(data.welcome_screen, this.id, this.client) : null
        
    }

    splashURL(options = {}) {
        if(!this.splash) return null;
        return this.client.cdn.GuildSplash(this.splash, options.extension, options.size, this.id)
    }

    bannerURL(options = {}) {
        if(!this.banner) return null;
        return this.client.cdn.GuildBanner(this.banner, options.extension, options.size, options.forceStatic, this.id)
    }

    iconURL(options = {}) {
        if(!this.icon) return null;
        return this.client.cdn.GuildIcon(this.icon, options.extension, options.size, options.forceStatic, this.id)
    }

}

module.exports = PartialInviteGuild