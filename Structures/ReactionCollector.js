const { EventTypes, CollectorEventTypes } = require("../Util/Constants");
const Collector = require("./Collector");

class ReactionCollector extends Collector {
    constructor(options = {}, extras = {}, client) {
        super(options, extras, client)
        this._handleReactionRemove = this._handleReactionRemove.bind(this)
        this.client.on(EventTypes.MessageReactionAdd, this.handleCollect)
        this.client.on(EventTypes.MessageReactionRemove, this._handleReactionRemove)
        this.client.on(EventTypes.MessageDelete, this._handleMessageDeletion)
        this.client.on(EventTypes.ChannelDelete, this._handleChannelDeletion)
        this.client.on(EventTypes.GuildDelete, this._handleGuildDeletion)
        this.client.on(EventTypes.MessageDeleteBulk, messages => this._handleDeleteBulk(messages))
        this.once(CollectorEventTypes.End, () => {
            this.client.removeListener(EventTypes.MessageReactionAdd, this.handleCollect)
            this.client.removeListener(EventTypes.MessageReactionRemove, this._handleReactionRemove)
            this.client.removeListener(EventTypes.MessageDelete, this._handleMessageDeletion)
            this.client.removeListener(EventTypes.ChannelDelete, this._handleChannelDeletion)
            this.client.removeListener(EventTypes.GuildDelete, this._handleGuildDeletion)
            this.client.removeListener(EventTypes.MessageDeleteBulk, messages => this._handleDeleteBulk(messages))
        })
    }

    _handleDeleteBulk(messages) {
        if(messages.has(this.messageId)) {
            for(const collected of this.collected.values()) {
            const reactionId = collected.emoji?.id ?? collected.emoji?.name
                this.dispose(collected)
                this.collected.delete(reactionId)
            }

            return this.stop("messageDeleted")
        }

        return this;
    }

    reactionRemoved(args) {
        if(this.collected.has(args.id)) this.collected.delete(args.id)
        return args
    }

    _handleReactionRemove(...args) {
        const reactionRemoved = this.reactionRemoved(...args)
        if(reactionRemoved) return this.dispose(reactionRemoved)
        return this;
    }

    messageDeleted(args) {
        if(args.id !== this.messageId) return;
        return args
    }

    collect(args) {
        if(this.messageId !== args.message?.id) return;
        if(this.channelId !== args.channelId) return;
        return args
    }
}

module.exports = ReactionCollector