const Bitfield = require("./Bitfield");

class UserFlags extends Bitfield {
    constructor(...bits) {
        super(bits)
    }
}

UserFlags.Flags = {
    Staff: 1n << 0n,
    Partner: 1n << 1n,
    Hypesquad: 1n << 2n,
    BugHunterLevel1: 1n << 3n,
    HypeSquadOnlineHouse1: 1n << 6n,
    HypeSquadOnlineHouse2: 1n << 7n,
    HypeSquadOnlineHouse3: 1n << 8n,
    PremiumEarlySupporter: 1n << 9n,
    TeamPseudoUser: 1n << 10n,
    BugHunterLevel2: 1n << 14n,
    VerifiedBot: 1n << 16n,
    VerifiedDeveloper: 1n << 17n,
    CertifiedModerator: 1n << 18n,
    BotHttpInteractions: 1n << 19n,
    ActiveDeveloper: 1n << 22n,
    Spammer: 1n << 20n
}

UserFlags.All = Object.values(UserFlags.Flags).reduce((a, b) => a | b, Bitfield.defaultBit)

module.exports = UserFlags