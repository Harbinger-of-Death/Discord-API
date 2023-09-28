const { ComponentTypesEnums, EventTypes, CollectorEventTypes } = require("../Util/Constants");
const Collector = require("./Collector");

class MessageComponentCollector extends Collector {
    constructor(options = {}, extras = {}, client) {
        super(options, extras, client)
        this.type = options.type ?? ComponentTypesEnums.Button

        this.client.on(EventTypes.InteractionCreate, this.handleCollect)
        this.client.on(EventTypes.MessageDelete, this._handleMessageDeletion)
        this.client.on(EventTypes.ChannelDelete, this._handleChannelDeletion)
        this.client.on(EventTypes.GuildDelete, this._handleGuildDeletion)
        this.client.on(EventTypes.MessageDeleteBulk, messages => this._handleDeleteBulk(messages))
        this.once(CollectorEventTypes.End, () => {
            this.client.removeListener(EventTypes.InteractionCreate, this.handleCollect)
            this.client.removeListener(EventTypes.MessageDelete, this._handleMessageDeletion)
            this.client.removeListener(EventTypes.ChannelDelete, this._handleChannelDeletion)
            this.client.removeListener(EventTypes.GuildDelete, this._handleGuildDeletion)
            this.client.removeListener(EventTypes.MessageDeleteBulk, messages => this._handleDeleteBulk(messages))
        })
    }

    _handleDeleteBulk(messages) {
        if(messages.has(this.messageId)) {
            for(const values of this.collected.values()) {
                this.collected.delete(values.id)
                this.dispose(values)
            }

            return this.stop("messageDeleted")
        }

        return this;
    }

    messageDeleted(args) {
        if(args.id !== this.messageId) return;
        return args
    }

    collect(args) {
        if(args.message?.id !== this.messageId) return;
        if(args.channelId !== this.channelId) return;
        if(this.type !== args.componentType) return;
        return args
    }
}

module.exports = MessageComponentCollector