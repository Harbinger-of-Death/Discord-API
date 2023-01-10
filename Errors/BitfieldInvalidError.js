class BitfieldInvalidError extends Error {
    constructor(data = {}) {
        super(data.message)
        this.bit = data.bit
        this.flags = data.flags ?? {}
    }
}

module.exports = BitfieldInvalidError