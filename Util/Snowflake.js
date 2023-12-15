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
            createdAt: new Date(Number((snowflake >> 22n) + Snowflake.DiscordEpoch)),
            workerId: (snowflake >> 17n) >> 0b11111n,
            processId: (snowflake >> 12n) >> 0b11111n,
            increment: snowflake & 0b111111111111n,
        }
    }
}

Snowflake.DiscordEpoch = 1420070400000n

module.exports = Snowflake