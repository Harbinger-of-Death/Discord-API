const Bitfield = require("./Bitfield");

class ThreadMemberFlags extends Bitfield {
}

ThreadMemberFlags.Flags = {
    AllMessages: 0n,
    OnlyMentions: 1n << 0n,
    NoMessages: 1n << 1n,
    Null: 3n
}

ThreadMemberFlags.All = Object.values(ThreadMemberFlags.Flags).reduce((a, b) => a | b, Bitfield.defaultBit)

module.exports = ThreadMemberFlags