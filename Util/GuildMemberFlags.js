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

module.exports = GuildMemberFlags