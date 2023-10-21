const GuildIntegration = require("../Structures/GuildIntegration");
const { RegExes } = require("../Util/Constants");
const CachedManager = require("./CachedManager");
class GuildIntegrationManager extends CachedManager {
    constructor(guildId, client) {
        super(GuildIntegration, client, [], { guildId })
        this.guildId = guildId ?? null
    }

    _add(integrations, options = { cache: true, force: false }) {
        if(!integrations) return null;
        const integrationId = typeof integrations === "string" ? integrations : integrations.id
        let integration
        if(this.cache.has(integrationId) && !options.force) {
            integration = this.cache.get(integrationId)
        } else {
            integration = new GuildIntegration(typeof integrations === "string" ? {
                id: integrationId,
                partial: true,
            } : integrations, this.client, this.extras)

            if(options.cache) this.cache.set(integrationId, integration)
        }

        return integration
    }

    async fetch(options = {}) {
        const { cache = true, force = false } = options
        const integrations = await this.client.api.get(`${this.client.root}/guilds/${this.guildId}/integrations`)
        return new this.cache.constructor(integrations?.map(o => [o.id, this._add(o, { cache, force })]))
    }

    async delete(integration, reason) {
        const integrationId = integration instanceof GuildIntegration ? integration.id : integration.id ?? integration
        if(!RegExes.SnowflakeRegExp.test(integrationId) && !this.cache.has(integrationId)) throw new RangeError(`Invalid Integration`)
        integration = this.cache.get(integration)
        await this.client.api.delete(`${this.client.root}/guilds/${this.guildId}/integrations/${integrationId}`, { reason })
        return integration ?? null
    }
}

module.exports = GuildIntegrationManager