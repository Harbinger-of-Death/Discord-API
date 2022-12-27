const { EventTypes, CollectorEvents } = require("../Util/Constants");
const Collector = require("./Collector");

class MessageCollector extends Collector {
    constructor(filter, options = {}, extras, client) {
        super(filter, options, extras, client)
        this.client.on(EventTypes.MessageCreate, this.handleCollect)
        this.client.on(EventTypes.ChannelDelete, this.handleDispose)
        this.client.on(EventTypes.GuildDelete, this.handleDispose)
        this.client.on(EventTypes.MessageDeleteBulk, collected => { for(const key of collected.keys()) if(this.collected.has(key)) this._handleDeleteBulk(key) })
        this.once(CollectorEvents.End, () => {
            this.client.removeListener(EventTypes.MessageCreate, this.handleCollect)
            this.client.removeListener(EventTypes.ChannelDelete, this.handleDispose)
            this.client.removeListener(EventTypes.GuildDelete, this.handleDispose)
            this.client.removeListener(EventTypes.MessageDeleteBulk, collected => { for(const key of collected.keys()) if(this.collected.has(key)) this._handleDeleteBulk(key) })
        })
    }

    collect(message) {
        if(this.channelId !== message.channelId) return;
        return message
    }

    handleDispose(...args) {
        if(this.channelId !== args[0]?.id) return;
        if(this.guildId !== (args[0]?.guildId ?? args[0]?.id)) return;
        if(this.messageId !== args[0]?.id) return;
        return this.dispose(...args)
    }

    _handleDeleteBulk(id) {
        this.dispose(this.collected.get(id))
        return this.collected.delete(id)
    }
}

module.exports = MessageCollector