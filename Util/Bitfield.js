const BitfieldInvalidError = require("../Errors/BitfieldInvalidError");

class Bitfield {
    constructor(bits) {
        this.bitfield = this.constructor.resolve(bits)
    }

    has(...bits) {
        bits = this.constructor.resolve(bits)
        return (this.bitfield & bits) === bits
    }

    any(...bits) {
        bits = this.constructor.resolve(bits)
        return(this.bitfield & bits) !== this.constructor.defaultBit
    }

    add(...bits) {
        bits = this.constructor.resolve(bits)
        if(bits) {
            this.bitfield |= bits
        }

        return this
    }

    remove(...bits) {
        bits = this.constructor.resolve(bits)
        if(bits) {
            this.bitfield &= ~bits
        }

        return this;
    }

    serialize() {
        let obj = {}
        for(const [key, val] of Object.entries(this.constructor.Flags)) {
            if(this.has(key)) obj[key] = val
        }

        return obj
    }

    toArray() {
        return Object.keys(this.constructor.Flags).filter(o => this.has(o))
    }

    freeze() {
        return Object.freeze(this)
    }

    toString() {
        return this.bitfield.toString()
    }

    missing() {
        return Object.keys(this.constructor.Flags).filter(o => !this.has(o))
    }

    equals(bitfield) {
        if(!(bitfield instanceof Bitfield)) throw new TypeError(`bitfield must be an instanceof Bitfield`)
        bitfield = this.constructor.resolve(bitfield)
        return (this.bitfield ^ bitfield) === 0n
    }

    static resolve(bit) {
        const { defaultBit } = this
        if(!bit) return defaultBit
        if(bit instanceof Bitfield) return bit.bitfield
        if(typeof bit === "bigint") return bit
        if(typeof bit === "number") return BigInt(bit)
        if(Array.isArray(bit)) return bit.map(o => this.resolve(o)).reduce((a, b) => a | b, defaultBit)
        if(typeof bit === "string") {
            if(typeof this.Flags[bit] !== "undefined") return this.Flags[bit]
            for(const val of Object.values(this.Flags)) {
                if(!isNaN(bit)) {
                    if(BigInt(bit) === val) return val
                }
            }
        }

        throw new BitfieldInvalidError({
            message: "Specified an invalid Bitfield",
            bit
        })
    }
}

Bitfield.defaultBit = 0n

module.exports = Bitfield