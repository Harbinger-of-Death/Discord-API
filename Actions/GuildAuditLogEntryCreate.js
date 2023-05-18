const AuditLogEntry = require("../Structures/AuditLogEntry");
const { EventTypes } = require("../Util/Constants");
const BaseAction = require("./BaseAction");

class GuildAuditLogEntryCreate extends BaseAction {
    constructor(client, data) {
        super(client)
        this._patch(data)
    }

    _patch(data) {
        const packet = data.d
        const entry = new AuditLogEntry(packet, this.client)
        return this.client.emit(EventTypes.GuildAuditLogEntryCreate, entry)
    }
}

module.exports = GuildAuditLogEntryCreate