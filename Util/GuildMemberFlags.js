const Bitfield = require("./Bitfield");

class GuildMemberFlags extends Bitfield {
    constructor(...bits) {
        super(bits)
    }

}

GuildMemberFlags.Flags = {
    DidRejoin: 1n << 0n,
    CompletedOnboarding: 1n << 1n
}

GuildMemberFlags.All = Object.values(GuildMemberFlags.Flags).reduce((a, b) => a | b, Bitfield.defaultBit)

module.exports = GuildMemberFlags