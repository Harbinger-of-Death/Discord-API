const Base = require("../Base/base");
const Collection = require("../Util/Collection");
const AuditLogEntry = require("./AuditLogEntry");
const Webhook = require("./Webhook");
class GuildAuditLog extends Base {
    constructor(data = {}, guildId, client) {
        super(client)
        this.guildId = guildId ?? null
        this.applicationCommands = new Collection(data.application_commands?.map(o => [o.id, this.client.application.commands._add(o, o.guild_id)]))
        this.autoModerationRules = new Collection(data.auto_moderation_rules?.map(o => [o.id, this.guild?.automoderations._add(o)]))
        this.entries = new Collection(data.audit_log_entries?.map(o => [o.id, new AuditLogEntry(o, this.client)]))
        this.guildScheduledEvents = new Collection(data.guild_scheduled_events?.map(o => [o.id, this.guild?.guildScheduledEvents._add(o, o.guild_id)]))
        this.integrations = new Collection(data.integrations?.map(o => [o.id, this.guild?.integrations._add(o, o.guild_id)]))
        this.threads = new Collection(data.threads?.map(o => [o.id, this.client.channels._add(o, o.guild_id)]))
        this.users = new Collection(data.users?.map(o => [o.id, this.client.users._add(o)]))
        this.webhooks = new Collection(data.webhooks?.map(o => [o.id, new Webhook(o, this.client)]))
    }

    get guild() {
        return this.client.guilds.cache.get(this.guildId) ?? null
    }
}
module.exports = GuildAuditLog