const Bitfield = require("./Bitfield");

class ChannelFlags extends Bitfield {
    constructor(...bits) {
        super(bits)
    }
}

ChannelFlags.Flags = {
    GuildFeedRemoved: 1n << 0n,
    Pinned: 1n << 1n,
    ActiveChannelsRemoved: 1n << 2n,
    RequireTag: 1n << 4n,
    IsSpam: 1n << 5n
}

ChannelFlags.All = Object.values(ChannelFlags.Flags).reduce((a, b) => a | b, Bitfield.defaultBit)

module.exports = ChannelFlags