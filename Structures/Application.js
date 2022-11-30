const Base = require("../Base/base");
const ApplicationFlags = require("../Util/ApplicationFlags");
const Permissions = require("../Util/Permissions");
const Snowflake = require("../Util/Snowflake");
const Team = require("./Team");

class Application extends Base {
    constructor(data = {}, client) {
        super(client)
        this.id = data.id ?? null
        this.name = data.name ?? null
        this.icon = data.icon ?? null
        this.description = data.description ?? null
        this.rpcOrigins = data.rpc_origins ?? null
        this.botPublic = data.bot_public ?? null
        this.botRequireCodeGrant = data.bot_require_code_grant ?? null
        this.termsOfServiceURL = data.terms_of_service_url ?? null
        this.privacyPolicyURL = data.privacy_policy_url ?? null
        this.createdAt = data.id ? Snowflake.deconstruct(data.id).createdAt : null
        this.createdTimestamp = this.createdAt?.getTime() ?? null
        this.owner = this.client.users._add(data.owner, { cache: true }) ?? null
        this.verifyKey = data.verify_key ?? null
        this.team = data.team ? new Team(data.team, this.client) : null
        this.guildId = data.guild_id ?? null
        this.primarySkuId = data.primary_sku_id ?? null
        this.slug = data.slug ?? null
        this.coverImage = data.cover_image ?? null
        this.flags = new ApplicationFlags(data.flags).freeze()
        this.tags = data.tags ?? null
        this.installParams = data.install_params ? {
            scopes: data.install_params.scopes,
            permissions: new Permissions(data.install_params.permissions).freeze()
        } : null
        this.customInstallURL = data.custom_install_url ?? null
        this.roleConnectionsVerificationURL = data.role_connections_verification_url ?? null
    }

    iconURL(options = {}) {
        if(!this.icon) return null;
        return this.client.cdn.ApplicationIcon(this.icon, options.extension, options.size, this.id)
    }

    coverImageURL(options = {}) {
        if(!this.coverImage) return null;
        return this.client.cdn.ApplicationCover(this.coverImage, options.extension, options.size, this.id)
    }
}

module.exports = Application;