const Base = require("../Base/base");
const Application = require("./Application");
const GuildScheduledEvent = require("./GuildScheduledEvent");
const PartialInviteChannel = require("./PartialInviteChannel");
const PartialInviteGuild = require("./PartialInviteGuild");
class Invite extends Base {
    constructor(data = {}, client) {
        super(client)
        this.partial = data.partial ?? false
        this.code = data.code ?? null
        this.guild = this.client.guilds.cache.get(data.guild?.id) ?? new PartialInviteGuild(data.guild, this.client)
        this.channel = this.client.channels.cache.get(data.channel?.id) ?? new PartialInviteChannel(data.channel, this.client)
        this.inviter = this.client.users._add(data.inviter, { cache: false })
        this.targetType = data.targetType ?? null
        this.targetUser = this.client.users._add(data.target_user, { cache: false })
        this.targetApplication = data.target_application ? new Application(data.target_application, this.client) : null
        this.approximatePresenceCount = data.approximate_presence_count ?? null
        this.approximateMemberCount = data.approximate_member_count ?? null
        this.expiresAt = data.expires_at ? new Date(data.expires_at) : null
        this.expiresTimestamp = this.expiresAt?.getTime() ?? null
        this.guildScheduledEvent = data.guild_scheduled_event ? new GuildScheduledEvent(data.guild_scheduled_event, this.guild?.id) : null
        this.uses = data.uses ?? null
        this.maxUses = data.max_uses ?? null
        this.maxAge = data.max_age ?? null
        this.temporary = data.temporary ?? null
        this.createdAt = data.created_at ? new Date(data.created_at) : null
        this.createdTimestamp = this.createdAt?.getTime() ?? null
    }
}

module.exports = Invite