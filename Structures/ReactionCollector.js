const { EventTypes, CollectorEvents } = require("../Util/Constants");
const Collector = require("./Collector");

class ReactionCollector extends Collector {
    constructor(filter, options, extras = {}, client) {
        super(filter, options, extras, client)
        this.handleReactionRemove = this.handleReactionRemove.bind(this)
        this.client.on(EventTypes.MessageReactionAdd, this.handleCollect)
        this.client.on(EventTypes.MessageReactionRemove, this.handleReactionRemove)
        this.client.on(EventTypes.MessageDelete, this._handleMessageDeletion)
        this.client.on(EventTypes.MessageDeleteBulk, this._handleMessageDeletion)
        this.once(CollectorEvents.End, () => {
            this.client.removeListener(EventTypes.MessageReactionAdd, this.handleCollect)
            this.client.removeListener(EventTypes.MessageReactionRemove, this.handleReactionRemove)
            this.client.removeListener(EventTypes.MessageDelete, this._handleMessageDeletion)
            this.client.removeListener(EventTypes.MessageDeleteBulk, this._handleMessageDeletion)
        })
    }

    handleReactionRemove(...args) {
        if(this.ended) return;
        const removedReaction = this.remove(...args)
        const emojiId = removedReaction.emoji?.id ?? removedReaction.emoji?.name
        if(removedReaction) {
            if(this.filter(...args)) {
                this.received--
                if(this.collected.has(emojiId)) this.collected.delete(emojiId)
                if(!this.idleTimeout?._destroyed) clearTimeout(this.idleTimeout)
                this.emit(CollectorEvents.Remove, ...args)
            }
        }

        return this;
    }

    handleDispose(...args) {
        if(this.channelId !== args[0]?.id) return;
        if(this.guildId !== (args[0]?.guildId ?? args[0]?.id)) return;
        return this.dispose(...args)
    }

    collect(reaction) {
        if(this.messageId !== reaction.message?.id) return;
        return reaction
    }

    remove(reaction) {
        if(this.messageId !== reaction.message?.id) return;
        return reaction
    }
}

module.exports = ReactionCollector