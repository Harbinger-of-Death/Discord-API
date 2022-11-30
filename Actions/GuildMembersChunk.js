const { EventTypes } = require("../Util/Constants");
const BaseAction = require("./BaseAction");

class GuildMembersChunk extends BaseAction {
    constructor(data = {}, client) {
        super(client)

        this._patch(data)
    }

    _patch(data) {
        const packet = data.d
        if(!(packet.chunk_count > 0 && packet.members?.length > 0)) return this.client.emit(EventTypes.Debug, `[Websocket]: GuildMembersChunk received no chunk of members`)
        return this.client.emit(EventTypes.GuildMembersChunk, packet)
    }
}

module.exports = GuildMembersChunk