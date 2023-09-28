const { EventTypes, CollectorEventTypes } = require("../Util/Constants");
const Collector = require("./Collector");

class MessageCollector extends Collector {
    constructor(options = {}, extras, client) {
        super(options, extras, client)
        this.client.on(EventTypes.MessageCreate, this.handleCollect)
        this.client.on(EventTypes.ChannelDelete, this._handleChannelDeletion)
        this.client.on(EventTypes.GuildDelete, this._handleGuildDeletion)
        this.client.on(EventTypes.MessageDeleteBulk, collected => { for(const key of collected.keys()) if(this.collected.has(key)) this._handleDeleteBulk(key) })
        this.client.on(EventTypes.MessageDelete, this._handleMessageDeletion)
        this.once(CollectorEventTypes.End, () => {
            this.client.removeListener(EventTypes.MessageCreate, this.handleCollect)
            this.client.removeListener(EventTypes.MessageDelete, this._handleMessageDeletion)
            this.client.removeListener(EventTypes.ChannelDelete, this._handleChannelDeletion)
            this.client.removeListener(EventTypes.GuildDelete, this._handleGuildDeletion)
            this.client.removeListener(EventTypes.MessageDeleteBulk, collected => { for(const key of collected.keys()) if(this.collected.has(key)) this._handleDeleteBulk(key) })
        })
    }

    collect(message) {
        if(this.channelId !== message.channelId) return;
        return message
    }

    messageDeleted(args) {
        if(this.collected.has(args.id)) {
            this.collected.delete(args.id)
            return args
        }

        return;
    }

    _handleDeleteBulk(id) {
        this.dispose(this.collected.get(id))
        this.collected.delete(id)
        return;
    }

}

module.exports = MessageCollector