const ChannelCreate = require("../Actions/ChannelCreate");
const ChannelDelete = require("../Actions/ChannelDelete");
const ChannelUpdate = require("../Actions/ChannelUpdate");
const GuildCreate = require("../Actions/GuildCreate");
const GuildDelete = require("../Actions/GuildDelete");
const GuildMembersChunk = require("../Actions/GuildMembersChunk");
const GuildMemberAdd = require("../Actions/GuildMemberAdd");
const GuildUpdate = require("../Actions/GuildUpdate");
const MessageCreate = require("../Actions/MessageCreate");
const Ready = require("../Actions/Ready");
const Base = require("../Base/base");
const { OpCodes, EventTypes, WebsocketEvents, WsReadyStateCodes } = require("../Util/Constants");
const GuildMemberUpdate = require("../Actions/GuildMemberUpdate");
const GuildMemberRemove = require("../Actions/GuildMemberRemove");
const GuildBanAdd = require("../Actions/GuildBanAdd");
const GuildBanRemove = require("../Actions/GuildBanRemove");
const GuildRoleCreate = require("../Actions/GuildRoleCreate");
const GuildRoleUpdate = require("../Actions/GuildRoleUpdate");
const GuildRoleDelete = require("../Actions/GuildRoleDelete");
const InviteCreate = require("../Actions/InviteCreate");
const InviteDelete = require("../Actions/InviteDelete");
const GuildIntegrationsUpdate = require("../Actions/GuildIntegrationsUpdate");
const IntegrationCreate = require("../Actions/IntegrationCreate");
const IntegrationUpdate = require("../Actions/IntegrationUpdate");
const IntegrationDelete = require("../Actions/IntegrationDelete");
const VoiceStateUpdate = require("../Actions/VoiceStateUpdate");
const GuildScheduledEventCreate = require("../Actions/GuildScheduledEventCreate");
const GuildScheduledEventUpdate = require("../Actions/GuildScheduledEventUpdate");
const GuildScheduledEventDelete = require("../Actions/GuildScheduledEventDelete");
const GuildScheduledEventUserAdd = require("../Actions/GuildScheduledEventUserAdd");
const GuildScheduledEventUserRemove = require("../Actions/GuildScheduledEventUserRemove");
const StageInstanceCreate = require("../Actions/StageInstanceCreate");
const StageInstanceUpdate = require("../Actions/StageInstanceUpdate");
const StageInstanceDelete = require("../Actions/StageInstanceDelete");
const GuildStickersUpdate = require("../Actions/GuildStickersUpdate");
const MessageUpdate = require("../Actions/MessageUpdate");
const MessageDelete = require("../Actions/MessageDelete");
const MessageReactionAdd = require("../Actions/MessageReactionAdd");
const MessageReactionRemove = require("../Actions/MessageReactionRemove");
const InteractionCreate = require("../Actions/InteractionCreate");
const ThreadCreate = require("../Actions/ThreadCreate");
const ThreadUpdate = require("../Actions/ThreadUpdate");
const ThreadMembersUpdate = require("../Actions/ThreadMembersUpdate");
const MessageReactionRemoveAll = require("../Actions/MessageReactionRemoveAll");
const MessageDeleteBulk = require("../Actions/MessageDeleteBulk");
const ChannelPinsUpdate = require("../Actions/ChannelPinsUpdate");
const GuildEmojisUpdate = require("../Actions/GuildEmojisUpdate");
const ApplicationCommandPermissionsUpdate = require("../Actions/ApplicationCommandPermissionsUpdate");
const AutoModerationRuleCreate = require("../Actions/AutoModerationRuleCreate");
const AutoModerationRuleUpdate = require("../Actions/AutoModerationRuleUpdate");
const AutoModerationRuleDelete = require("../Actions/AutoModerationRuleDelete");
const AutoModerationActionExecution = require("../Actions/AutoModerationActionExecution");
const PresenceUpdate = require("../Actions/PresenceUpdate");
const UserUpdate = require("../Actions/UserUpdate");
const ThreadMemberUpdate = require("../Actions/ThreadMemberUpdate");
const ThreadDelete = require("../Actions/ThreadDelete");
const MessageReactionRemoveEmoji = require("../Actions/MessageReactionRemoveEmoji");
const Heartbeat = require("../Actions/Handlers/Heartbeat");
const HeartbeatAck = require("../Actions/Handlers/HeartbeatAck");
const Hello = require("../Actions/Handlers/Hello");
const InvalidSession = require("../Actions/Handlers/InvalidSession");
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

        switch(data.t) {
            case WebsocketEvents.Ready:
                return new Ready(data, this.client)
            case WebsocketEvents.GuildCreate:
                return new GuildCreate(data, this.client)
            case WebsocketEvents.GuildUpdate:
                return new GuildUpdate(data, this.client)
            case WebsocketEvents.GuildDelete:
                return new GuildDelete(data, this.client)
            case WebsocketEvents.ChannelCreate:
                return new ChannelCreate(data, this.client)
            case WebsocketEvents.ChannelUpdate:
                return new ChannelUpdate(data, this.client)
            case WebsocketEvents.ChannelDelete:
                return new ChannelDelete(data, this.client)
            case WebsocketEvents.MessageCreate:
                return new MessageCreate(data, this.client)
            case WebsocketEvents.MessageUpdate:
                return new MessageUpdate(data, this.client)
            case WebsocketEvents.MessageDelete:
                return new MessageDelete(data, this.client)
            case WebsocketEvents.MessageReactionRemoveEmoji:
                return new MessageReactionRemoveEmoji(data, this.client)
            case WebsocketEvents.GuildMembersChunk:
                return new GuildMembersChunk(data, this.client)
            case WebsocketEvents.GuildMemberAdd:
                return new GuildMemberAdd(data, this.client)
            case WebsocketEvents.GuildMemberUpdate:
                return new GuildMemberUpdate(data, this.client)
            case WebsocketEvents.GuildMemberRemove:
                return new GuildMemberRemove(data, this.client)
            case WebsocketEvents.GuildBanAdd:
                return new GuildBanAdd(data, this.client)
            case WebsocketEvents.GuildBanRemove:
                return new GuildBanRemove(data, this.client)
            case WebsocketEvents.GuildRoleCreate:
                return new GuildRoleCreate(data, this.client)
            case WebsocketEvents.GuildRoleUpdate:
                return new GuildRoleUpdate(data, this.client)
            case WebsocketEvents.GuildRoleDelete:
                return new GuildRoleDelete(data, this.client)
            case WebsocketEvents.InviteCreate:
                return new InviteCreate(data, this.client)
            case WebsocketEvents.InviteDelete:   
                return new InviteDelete(data, this.client)
            case WebsocketEvents.GuildIntegrationsUpdate:
                return new GuildIntegrationsUpdate(data, this.client)
            case WebsocketEvents.IntegrationCreate:
                return new IntegrationCreate(data, this.client)
            case WebsocketEvents.IntegrationUpdate:
                return new IntegrationUpdate(data, this.client)
            case WebsocketEvents.IntegrationDelete:
                return new IntegrationDelete(data, this.client)
            case WebsocketEvents.VoiceStateUpdate:
                return new VoiceStateUpdate(data, this.client)
            case WebsocketEvents.GuildScheduledEventCreate:
                return new GuildScheduledEventCreate(data, this.client)
            case WebsocketEvents.GuildScheduledEventUpdate:
                return new GuildScheduledEventUpdate(data, this.client)
            case WebsocketEvents.GuildScheduledEventDelete:
                return new GuildScheduledEventDelete(data, this.client)
            case WebsocketEvents.GuildScheduledEventUserAdd:
                return new GuildScheduledEventUserAdd(data, this.client)
            case WebsocketEvents.GuildScheduledEventUserRemove:
                return new GuildScheduledEventUserRemove(data, this.client)
            case WebsocketEvents.StageInstanceCreate:
                return new StageInstanceCreate(data, this.client)
            case WebsocketEvents.StageInstanceUpdate:
                return new StageInstanceUpdate(data, this.client)
            case WebsocketEvents.StageInstanceDelete:
                return new StageInstanceDelete(data, this.client)
            case WebsocketEvents.GuildStickersUpdate:
                return new GuildStickersUpdate(data, this.client)
            case WebsocketEvents.MessageReactionAdd:
                return new MessageReactionAdd(data, this.client)
            case WebsocketEvents.MessageReactionRemove:
                return new MessageReactionRemove(data, this.client)
            case WebsocketEvents.InteractionCreate:
                return new InteractionCreate(data, this.client)
            case WebsocketEvents.ThreadCreate:
                return new ThreadCreate(data, this.client)
            case WebsocketEvents.ThreadDelete:
                return new ThreadDelete(data, this.client)
            case WebsocketEvents.ThreadUpdate:
                return new ThreadUpdate(data, this.client)
            case WebsocketEvents.ThreadMembersUpdate:
                return new ThreadMembersUpdate(data, this.client)
            case WebsocketEvents.MessageReactionRemoveAll:
                return new MessageReactionRemoveAll(data, this.client)
            case WebsocketEvents.MessageDeleteBulk:
                return new MessageDeleteBulk(data, this.client)
            case WebsocketEvents.ChannelPinsUpdate:
                return new ChannelPinsUpdate(data, this.client)
            case WebsocketEvents.GuildEmojisUpdate:
                return new GuildEmojisUpdate(data, this.client)
            case WebsocketEvents.ApplicationCommandPermissionsUpdate:
                return new ApplicationCommandPermissionsUpdate(data, this.client)
            case WebsocketEvents.AutoModerationRuleCreate:
                return new AutoModerationRuleCreate(data, this.client)
            case WebsocketEvents.AutoModerationRuleUpdate:
                return new AutoModerationRuleUpdate(data, this.client)
            case WebsocketEvents.AutoModerationRuleDelete:
                return new AutoModerationRuleDelete(data, this.client)
            case WebsocketEvents.AutoModerationActionExecution:
                return new AutoModerationActionExecution(data, this.client)
            case WebsocketEvents.PresenceUpdate:
                return new PresenceUpdate(data, this.client)
            case WebsocketEvents.UserUpdate:
                return new UserUpdate(data, this.client)
            case WebsocketEvents.ThreadMemberUpdate:
                return new ThreadMemberUpdate(data, this.client)
        }
    }

}

module.exports = ActionsManager