class Collection extends Map {
    first() {
        return this.values().next().value
    }

    firstKey() {
        return this.keys().next().value
    }

    last() {
        return Array.from(this.values())[this.size - 1]
    }

    lastKey() {
        return Array.from(this.keys())[this.size - 1]
    }

    filter(fn) {
        if(typeof fn !== "function") throw new TypeError(`Fn must be a function`)
        const result = new this.constructor
        for(const [key, val] of this) {
            if(fn(val, key)) result.set(key, val)
        }

        return result
    }

    filterKeys(fn) {
        if(typeof fn !== "function") throw new TypeError(`Fn must be a function`)
        const result = new this.constructor
        for(const [key, val] of this) {
            if(fn(key)) result.set(key, val)
        }

        return result
    }

    map(fn) {
        if(typeof fn !== "function") throw new TypeError(`Fn must be a function`)
        return [...this.entries()].map((val, index) => fn(val[1], val[0], index, this))
    }

    mapVal(fn) {
        if(typeof fn !== "function") throw new TypeError(`Fn must be a function`)
        return [...this.values()].map((value, index) => fn(value, index, this))
    }

    find(fn, thisArg) {
        if(typeof fn !== "function") throw new TypeError(`Fn must be a function`)
        if(typeof thisArg !== "undefined") fn = fn.bind(thisArg)
        for(const [key, val] of this) {
            if(fn(val, key)) return val
        }
    }

    every(fn, thisArg) {
        if(typeof fn !== "function") throw new TypeError(`Fn must be a function`)
        if(typeof thisArg !== "undefined") fn = fn.bind(thisArg)
        for(const [key, val] of this) {
            if(!fn(val, key, this)) return false
        }

        return true
    }

    some(fn, thisArg) {
        if(typeof fn !== "function") throw new TypeError(`Fn must be a function`)
        if(typeof thisArg !== "undefined") fn = fn.bind(thisArg)
        for(const [key, val] of this) {
            if(fn(val, key, this)) return true
        }

        return false
    }

    concat(...valueN) {
        for(const values of valueN) {
            for(const [key, val] of values.entries()) this.set(key, val)
        }

        return this
    }

    findIndex(fn, thisArg) {
        if(typeof fn !== "function") throw new TypeError(`Fn must be a function`)
        if(typeof thisArg !== "undefined") fn = fn.bind(thisArg)
        let index = -1
        for(const [key, val] of this) {
            index++
            if(fn(val, key, this)) return index
        }

        return -1
    }

    reverse() {
        const entries = [...this.entries()].reverse()
        this.clear()
        for(const [key, val] of entries) {
            this.set(key, val)
        }

        return this
    }

    reduce(fn, initialValue) {
        if(typeof fn !== "function") throw new TypeError(`Fn must be a function`)
        let accumulator
        if(typeof initialValue !== "undefined") {
            accumulator = initialValue
            for(const [key, val] of this) accumulator = fn(accumulator, val, key, this)
            return accumulator
        }


        let first = true

        for(const [key, val] of this) {
            if(first) {
                accumulator = val
                first = false
            }

            accumulator = fn(accumulator, val, key, this)
        }
        if(first) throw new TypeError(`Reduced of empty Collection with no initial value`)
        return accumulator
    }

    sort(compareFunction = Collection.defaultSort) {
        const entries = [...this.entries()]
        entries.sort((a, b) => compareFunction(a[1], b[1], a[0], b[0]))

        super.clear()

        for(const [key, val] of entries) {
            super.set(key, val)
        }

        return this
    }

    toString() {
        return this.map(val => val).join(',')
    }

    equals(collection) {
        if(!collection) return false
        if(this === collection) return true
        if(this.size !== collection.size) return false
        for(const [key, val] of this) {
            if(!collection.has(key) || collection.get(key) !== val) return false
        }

        return true
    }

    difference(collection) {
        const result = new this.constructor
        for(const [key, val] of collection) {
            if(!this.has(key) || val !== this.get(key)) result.set(key, val)
        }

        return result
    }

    at(index) {
        index = Math.floor(index)
        return [...this.values()][index]
    }

    hasAny(...keys) {
        keys = Collection.resolveRestOrArrayParameters(keys)
        for(const key of keys) {
            if(this.has(key)) return true
        }

        return false;
    }

    static defaultSort(firstValue, secondValue) {
        return (firstValue > secondValue) || (firstValue === secondValue) - 1
    }

    static resolveRestOrArrayParameters(restOrArray) {
        if(Array.isArray(restOrArray[0])) return restOrArray[0]
        return restOrArray
    }

}


module.exports = Collection