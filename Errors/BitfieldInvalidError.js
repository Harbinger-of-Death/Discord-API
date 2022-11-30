class BitfieldInvalidError extends Error {
    constructor(data = {}) {
        super(data.message)
        this.bit = data.bit
    }
}

module.exports = BitfieldInvalidError