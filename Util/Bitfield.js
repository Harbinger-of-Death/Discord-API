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
        if(typeof bit === "undefined") return defaultBit;
        if(bit instanceof Bitfield) return bit.bitfield
        if(typeof bit === "number") return BigInt(bit)
        if(bit === defaultBit) return defaultBit
        if(typeof bit === "bigint") return bit
        if(typeof bit === "string") {
            if(typeof this.Flags[bit] !== "undefined") return this.Flags[bit]
            else if(isNaN(bit)) bit = BigInt(bit)
        }
        if(Array.isArray(bit)) return bit.map(o => this.resolve(o)).reduce((a, b) => a | b, defaultBit)
        throw new BitfieldInvalidError({
            message: `Invalid Bitfield`,
            bit,
            flags: this.Flags
        })
    }


    static get All() {
        if(!this.Flags) return 0n
        return Object.values(this.Flags).reduce((a, b) => a | b, Bitfield.defaultBit)
    }
}

Bitfield.defaultBit = 0n

module.exports = Bitfield