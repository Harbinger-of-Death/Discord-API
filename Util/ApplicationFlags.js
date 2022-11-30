const Bitfield = require("./Bitfield");

class ApplicationFlags extends Bitfield {
    constructor(...bits) {
        super(bits)
    }
}

ApplicationFlags.Flags = {
    GatewayPresence: 1n << 12n,
    GatewayPresenceLimited: 1n << 13n,
    GatwewayGuildMembers: 1n << 14n,
    GatewayGuildMembersLimited: 1n << 15n,
    VerificationPendingGuildLimit: 1n << 16n,
    Embedded: 1n << 17n,
    GatewayMessageContent: 1n << 18n,
    GatewayMessageContentLimited: 1n << 19n,
    ApplicationCommandBadge: 1n << 23n,
    Active: 1n << 24n
}

ApplicationFlags.All = Object.values(ApplicationFlags.Flags).reduce((a, b) => a | b, Bitfield.defaultBit)

module.exports = ApplicationFlags;