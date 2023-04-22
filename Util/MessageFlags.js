const Bitfield = require("./Bitfield");

class MessageFlags extends Bitfield {
    constructor(...bits) {
        super(bits)
    }
}

MessageFlags.Flags = {
    Crossposted: 1n << 0n,
    IsCrosspost: 1n << 1n,
    SuppressEmbeds: 1n << 2n,
    SourceMessageDeleted: 1n << 3n,
    Urgent: 1n << 4n,
    HasThread: 1n << 5n,
    Ephemeral: 1n << 6n,
    Loading: 1n << 7n,
    FailedToMentionSomeRolesInThread: 1n << 8n,
    SuppressNotifications: 1n << 12n
}

module.exports = MessageFlags;