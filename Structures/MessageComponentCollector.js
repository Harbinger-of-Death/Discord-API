const { ComponentTypesEnums, EventTypes, CollectorEvents } = require("../Util/Constants");
const Collector = require("./Collector");
class MessageComponentCollector extends Collector {
    constructor(filter, options = {}, extras, client) {
        super(filter, options, extras, client)
        this.type = options.type ?? ComponentTypesEnums.Button
        this.client.on(EventTypes.InteractionCreate, this.handleCollect)
        this.client.on(EventTypes.MessageDelete, this._handleMessageDeletion)
        this.once(CollectorEvents.End, () => {
            this.client.removeListener(EventTypes.InteractionCreate, this.handleCollect)
            this.client.removeListener(EventTypes.MessageDelete, this._handleMessageDeletion)
        })
    }

    handleDispose(...args) {
        if(this.channelId !== args[0]?.id) return;
        if(this.guildId !== (args[0]?.guildId ?? args[0]?.id)) return;
        return this.dispose(...args)
    }

    collect(interaction) {
        if(!interaction.isComponent()) return;
        if(interaction.componentType !== this.type) return;
        if(interaction.message?.id !== this.messageId) return;
        return interaction
    }
}
module.exports = MessageComponentCollector