const Base = require("../Base/base");
const { OpCodes, EventTypes, WebsocketEvents, WsReadyStateCodes } = require("../Util/Constants");
const Heartbeat = require("../Actions/Handlers/Heartbeat");
const HeartbeatAck = require("../Actions/Handlers/HeartbeatAck");
const Hello = require("../Actions/Handlers/Hello");
const InvalidSession = require("../Actions/Handlers/InvalidSession");
const PacketHandler = require("../Actions/Handlers/index");
class ActionsManager extends Base {
    constructor(data = {}, client) {
        super(client)
        this.handleActions(data)
    }

    handleActions(data) {
        this.client.ws.emit(data.t, data.d)
        if(data.s) this.client.seq = data.s
        switch(data.op) {
            case OpCodes.Resume: 
                return this.client.emit(EventTypes.Debug, `[Websocket]: Successfully Resumed`)
            case OpCodes.InvalidSession:
                return new InvalidSession(data, this.client)
            case OpCodes.Hearbeat:
                return new Heartbeat(this.client)
            case OpCodes.HeartbeatAck:
                return new HeartbeatAck(this.client)
            case OpCodes.Reconnect:
                return this.client.ws.handleReconnect()
            case OpCodes.Hello:
                return new Hello(data, this.client)
        }
        
        return new PacketHandler[data.t](data, this.client)
    }

}

module.exports = ActionsManager