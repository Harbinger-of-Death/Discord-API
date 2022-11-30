const Bitfield = require("./Bitfield");

class SystemChannelFlags extends Bitfield {
    constructor(...bits) {
        super(bits)
    }
}

SystemChannelFlags.Flags = {
    SuppressJoinNotifications: 1n << 0n,
    SuppresPremiumSubscriptions: 1n << 1n,
    SuppressGuildReminderNotifications: 1n << 2n,
    SuppressJoinNotificationReplies: 1n << 3n
}

SystemChannelFlags.All = Object.values(SystemChannelFlags.Flags).reduce((a, b) => a | b, Bitfield.defaultBit)

module.exports = SystemChannelFlags