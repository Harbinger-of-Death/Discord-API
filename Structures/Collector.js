const EventEmitter = require("node:events")
const Collection = require("../Util/Collection")
const { CollectorEvents } = require("../Util/Constants")
class Collector extends EventEmitter {
    constructor(filter, options = {}, extras = {}, client) {
        super()
        Object.defineProperty(this, "client", { value: client })
        //Filter
        this.filter = filter ?? (() => true)
        //Options
        this.time = options.time ?? 15_000
        this.idleTimer = options.idleTimer ?? 10_000
        this.collected = new Collection()
        this.max = options.max ?? null
        this.ended = false
        //Misc
        this.messageId = extras.messageId ?? null
        this.guildId = extras.guildId ?? null
        this.channelId = extras.channelId ?? null
        this.received = 0
        this.closeTimeout = setTimeout(() => this.stop("time"), this.time).unref()
        this.idleTimeout = setTimeout(() => this.stop("idle"), this.idleTimer).unref()
        this.handleCollect = this.handleCollect.bind(this)
        this.handleDispose = this.handleDispose.bind(this)
        this._handleMessageDeletion = this._handleMessageDeletion.bind(this)
    }

    resetTimer() {
        if(this.ended) return;
        this.closeTimeout.refresh()
        return this;
    }

    _handleMessageDeletion(...args) {
        if(this.messageId !== args[0].id) return;
        this.dispose(args)
        return this.stop("messageDeleted")
    }

    handleCollect(...args) {
        if(this.ended) return;
        const collected = this.collect(...args)
        if(collected) {
            const filter = this.filter(...args)
            if(filter) {
                this.received++
                if(!this.idleTimeout?._destroyed) clearTimeout(this.idleTimeout)
                this.collected.set(collected.emoji?.id ?? collected.emoji?.name ?? collected.id, collected)
                this.emit(CollectorEvents.Collect, collected)
                if(this.max === this.received) return this.stop("maxReached")
            }
        }

        return this;
    }

    stop(reason = "user") {
        if(this.ended) return;
        if(!this.idleTimeout?._destroyed) clearTimeout(this.idleTimeout)
        if(!this.closeTimeout?._destroyed) clearTimeout(this.closeTimeout)
        this.ended = true
        this.emit(CollectorEvents.End, this.collected, reason)
        return this;
    }
    
    _handleGuildDeletion(...args) {
        if(this.guildId !== args[0]?.id) return;
        return this.stop("guildDeleted")
    }

    dispose(args) {
        return this.emit(CollectorEvents.Dispose, args)
    }

}

module.exports = Collector