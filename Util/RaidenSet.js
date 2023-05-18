class RaidenSet extends Set {
    get(value) {
        for(const values of this) {
            if(value === values) return values
        }
    }

    first() {
        return this.values().next().value
    }

    last() {
        return Array.from(this.values())[this.size - 1]
    }

    find(fn, thisArg) {
        if(typeof fn !== "function") throw new TypeError(`Fn must be a function`)
        if(typeof thisArg !== "undefined") fn = fn.bind(thisArg)
        for(const values of this) {
            if(fn(values)) return values
        }
    }

    map(fn) {
        if(typeof fn !== "function") throw new TypeError(`Fn must be a function`)
        return [...this.values()].map((value, index) => fn(value, index, this))
    }

    filter(fn, thisArg) {
        if(typeof fn !== "function") throw new TypeError(`Fn must be a function`)
        if(typeof thisArg !== "undefined") fn = fn.bind(thisArg)
        const result = new this.constructor
        for(const value of this) {
            if(fn(value)) result.add(value)
        }

        return result
    }

    sort(compareFn = RaidenSet.defaultSort) {
        const entries = [...this.values()]
        entries.sort(compareFn)
        super.clear()
        for(const values of entries) {
            super.add(values)
        }

        return this
    }

    findIndex(fn, thisArg) {
        if(typeof fn !== "function") throw new TypeError(`Fn must be a function`)
        if(typeof thisArg !== "undefined") fn = fn.bind(thisArg)
        let index = -1
        for(const values of this) {
            index++
            if(fn(values)) return index
        }

        return -1
    }

    reduce(fn, initialValue) {
        if(typeof fn !== "function") throw new TypeError(`Fn must be a function`)
        let accumulator
        if(typeof initialValue !== "undefined") {
            accumulator = initialValue
            for(const val of this) accumulator = fn(accumulator, val, this)
            return accumulator
        }

        let first = true
        for(const val of this) {
            if(first) {
                accumulator = val
                first = false
            }
            accumulator = fn(accumulator, val, this)
        }
        if(first) throw new TypeError(`Reduced of empty Set with no initial value`)
        return accumulator
    }

    equals(set) {
        if(this === set) return true;
        if(this.size !== set.size) return false;
        for(const values of set) {
            if(!this.has(values)) return false;
        }

        return true;
    }

    concat(...valueN) {
        for(const values of valueN) {
            for(const val of values) this.add(val)
        }

        return this
    }

    some(fn, thisArg) {
        if(typeof fn !== "function") throw new TypeError(`Fn must be a function`)
        if(typeof thisArg !== "undefined") fn = fn.bind(thisArg)
        for(const values of this) {
            if(fn(values)) return true
        }

        return false
    }

    every(fn, thisArg) {
        if(typeof fn !== "function") throw new TypeError(`Fn must be a function`)
        if(typeof thisArg !== "undefined") fn = fn.bind(thisArg)
        for(const values of this) {
            if(!fn(values)) return false
        }

        return true
    }

    reverse() {
        const values = [...this.values()].reverse()
        super.clear()
        for(const value of values) {
            super.add(value)
        }

        return this
    }

    difference(set) {
        if(!(set instanceof Set)) return null;
        const result = new this.constructor
        for(const value of set) {
            if(!this.has(value)) result.add(value)
        }

        return result
    }

    at(index) {
        index = Math.floor(index)
        return [...this.values()][index]
    }

    static defaultSort(firstValue, secondValue) {
        return (firstValue > secondValue) || (firstValue === secondValue) - 1
    }
}

module.exports = RaidenSet;