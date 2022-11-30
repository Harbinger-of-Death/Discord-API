const Emoji = require("../Structures/Emoji");
class EmojiResolver {
    static create(emoji, client) {
        const manager = client.emojis
        if(typeof emoji === "string") {
            if(/^\d{17,19}/gi.test(emoji)) {
                emoji = manager.cache.get(emoji)
                return encodeURIComponent(`${emoji.animated ? "a:" : ""}${emoji.name}:${emoji.id}`)
            }

            if(/^(<a?:\w+:\d{17,19}>)/gi.test(emoji)) {
                emoji = emoji.match(/\d{17,19}/gi)?.[0]
                if(emoji) return this.create(emoji, client)
            }

            if(/^((a:)?\w+:\d{17,19})/gi.test(emoji)) {
                emoji = emoji.match(/\d{17,19}/gi)?.[0]
                if(emoji) return this.create(emoji, client)
            }

            const unicode = [...new TextEncoder().encode(emoji)]
            if(unicode?.length) return `%${unicode.map(o => o.toString(16).toUpperCase()).join("%")}`

        }

        if(emoji instanceof Emoji) return this.create(emoji.id ?? emoji.name)

        throw new RangeError(`Invalid Emoji`)
    }
}

module.exports = EmojiResolver 