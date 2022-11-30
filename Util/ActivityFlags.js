const Bitfield = require("./Bitfield");

class ActivityFlags extends Bitfield {
    constructor(...bits) {
        super(bits)
    }
}


ActivityFlags.Flags = {
    Instance: 1n << 0n,
    Join: 1n << 1n,
    Spectate: 1n << 2n,
    JoinRequest: 1n << 3n,
    Sync: 1n << 4n,
    Play: 1n << 5n,
    PartyPrivacyFriends: 1n << 6n,
    PartyPrivacyVoiceChannel: 1n << 7n,
    Embedded: 1n << 8n
}

ActivityFlags.All = Object.values(ActivityFlags.Flags).reduce((a, b) => a | b, Bitfield.defaultBit)


module.exports = ActivityFlags