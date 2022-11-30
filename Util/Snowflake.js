let increment = 0n
class Snowflake {
    static generate(timestamp = Date.now()) {
        timestamp = BigInt(timestamp)
        if(increment >= 0xFFFn) increment = 0n
        return ((timestamp - Snowflake.DiscordEpoch) << 22n | 1n << 17n | increment++).toString()
    }

    static deconstruct(snowflake) {
        snowflake = BigInt(snowflake)
        return {
            createdAt: new Date(parseInt((snowflake >> 22n) + Snowflake.DiscordEpoch)),
            workerId: (snowflake & 0x3E0000n) >> 17n,
            processId: (snowflake & 0x1F000n) >> 12n,
            increment: snowflake & 0xFFFn,
        }
    }
}

Snowflake.DiscordEpoch = 1420070400000n

module.exports = Snowflake