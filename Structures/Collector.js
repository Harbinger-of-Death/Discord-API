const EventEmitter = require("node:events")
const Collection = require("../Util/Collection")
const { CollectorEvents } = require("../Util/Constants")
const MessageReaction = require("./MessageReaction")
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
        this._handleMessageDeletion = this._handleMessageDeletion.bind(this)
        this._handleGuildDeletion = this._handleGuildDeletion.bind(this)
        this._handleChannelDeletion = this._handleChannelDeletion.bind(this)
    }

    cleanup() {
        this.removeAllListeners()
        return this;
    }

    resetTimer() {
        if(this.ended) return;
        this.closeTimeout.refresh()
        return this;
    }

    _handleMessageDeletion(...args) {
        const ReactionCollector = require("./ReactionCollector");
        const MessageComponentCollector = require("./MessageComponentCollector");
        if(typeof this.messageDeleted === "undefined") return;
        const deletedMessage = this.messageDeleted(...args)
        if(deletedMessage) {
            for(const values of this.collected.values()) {
                this.collected.delete(values.id)
                this.dispose(values)
            }
            if(this instanceof ReactionCollector || this instanceof MessageComponentCollector) return this.stop("messageDeleted")
        }
    }

    handleCollect(...args) {
        if(this.ended) return;
        const collected = this.collect(...args)
        if(collected) {
            const filter = this.filter(...args)
            if(filter) {
                let snowflake = collected.id
                this.received++
                if(!this.idleTimeout?._destroyed) clearTimeout(this.idleTimeout)
                if(collected instanceof MessageReaction) snowflake = collected.emoji?.id ?? collected.emoji?.name
                this.collected.set(snowflake, collected)
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
        this.cleanup()
        return this;
    }
    
    _handleGuildDeletion(...args) {
        this.guildDeletion(...args)
        return this.stop("guildDeleted")
    }

    _handleChannelDeletion(...args) {
        this.channelDeletion(...args)
        return this.stop("channelDeleted")
    }

    channelDeletion(args) {
        if(args.id !== this.channelId) return;
        for(const values of this.collected.values()) {
            if(values.channelId !== this.channelId) continue;
            this.dispose(values)
            this.collected.delete(values.id)
        }

        return this;
    }

    guildDeletion(args) {
        if(args.id !== this.guildId) return;
        for(const values of this.collected.values()) {
            if(values.guildId !== this.guildId) continue;
            this.dispose(values)
            this.collected.delete(values.id)
        }

        return this;
    }

    dispose(args) {
        if(!args) return;
        return this.emit(CollectorEvents.Dispose, args)
    }

}

module.exports = Collector