class EmojiParser {
    static create(emoji) {
        if(typeof emoji === "string") {
            if(/^\d{17,19}/gi.test(emoji)) return { id: emoji }
            if(/<?(?:(a:)?(\w+):(\d{17,19}))>?/.test(emoji)) {
                const match = emoji.match(/<?(?:(a:)?(\w+):(\d{17,19}))>?/)
                return { animated: Boolean(match[1]), name: match[2], id: match[3] }
            }

            return { name: emoji }
        }

        if(typeof emoji === "object") return { animated: Boolean(emoji.animated), name: emoji.name, id: emoji.id }
        throw new RangeError(`Invalid Emoji`)
    }
}

module.exports = EmojiParser 