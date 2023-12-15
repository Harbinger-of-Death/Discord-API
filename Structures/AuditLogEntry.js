const Base = require("../Base/base");
const { AuditLogEventEnums, AuditLogEventUpdate } = require("../Util/Constants");
const Snowflake = require("../Util/Snowflake");

class AuditLogEntry extends Base {
    constructor(data = {}, client) {
        super(client)
        this.targetId = data.target_id ?? null
        this.changes = data.changes?.map(o => { return { newValue: o.new_value, oldValue: o.old_value, key: o.key } }) ?? []
        this.userId = data.user_id ?? null
        this.id = data.id ?? null
        this.actionType = data.action_type ?? null
        this.options = data.options ? { 
            applicationId: data.options.application_id,
            autoModerationRuleName: data.options.auto_moderation_rule_name,
            autoModerationRuleTriggerType: data.options.auto_moderation_rule_trigger_type,
            channelId: data.options.channel_id,
            count: data.options.count,
            deleteMemberDays: data.options.delete_member_days,
            id: data.options.id,
            membersRemoved: data.options.members_removed,
            messageId: data.options.messageId,
            roleName: data.options.role_name,
            type: data.options.type,
            status: data.options.status
        } : null
        this.reason = data.reason ?? null
        this.createdAt = data.id ? Snowflake.deconstruct(data.id).createdAt : null
        this.createdTimestamp = this.createdAt?.getTime() ?? null
    }

    isUpdate() {
        return AuditLogEventUpdate.includes(this.actionType)
    }

    get executor() {
        return this.client.users.cache.get(this.userId) ?? null
    }
}

module.exports = AuditLogEntry