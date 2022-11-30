const WebSocket = require("ws");
const WebsocketError = require("../Errors/WebsocketError");
const { OpCodes, WSEventCodes, WsReadyStateCodes, EventTypes, WsCloseCodes, WebsocketEvents, WebsocketStatus } = require("../Util/Constants");
const ActionsManager = require("./ActionsManager");

class WebsocketManager extends WebSocket {
    constructor(client) {
        super(client.wssURL)
        Object.defineProperty(this, "client", { value: client })
        this.status = null
        this.interval = null
        this.handleOpen()
    }

    async connect() {
        if(this.readyState !== WsReadyStateCodes.Open) return setTimeout(() => this.connect(), this.client.restRestRequestTimeout)
        const botInfo = await this.client.api.get(`${this.client.root}/gateway/bot`)
        if(!botInfo) return;
        if(botInfo.session_start_limit?.remaining < 1) {
            this.client.emit(EventTypes.Debug, `[Websocket]: You exceeded your daily login limit`)
            return process.exit()
        }
        const debug = `[Websocket Info]:\nURL: ${botInfo.url}\nShards: ${botInfo.shards}\nRemaining: ${botInfo.session_start_limit?.remaining}/${botInfo.session_start_limit?.total}`
        this.send({
            op: OpCodes.Identify,
            d: {
                token: this.client.token,
                intents: this.client.intents?.toString(),
                presence: this.parsePresence(this.client.presence),
                properties: {
                    $os: "windows"
                }
            }
        })

        this.client.emit(`debug`, debug)
    }

    handleConnect() {
        if(this.readyState === this.CLOSED) return this.client.emit(`debug`, `[Websocket]: Websocket has been closed due to unknown reasons`)
        this.on(WSEventCodes.Message, (data) => {
            return new ActionsManager(JSON.parse(data), this.client)
        })
        this.on(WSEventCodes.Close, (data) => this.handleClose(data))
        return;
    }

    handleClose(err) {
        this.status = WebsocketStatus.Closed
        switch(err) {
            case WsCloseCodes.UnknownError:
                throw new WebsocketError({
                    code: WsCloseCodes.UnknownError,
                    message: `We're not sure what went wrong. Try reconnecting?`
                })
            case WsCloseCodes.UnknownOpcode:
                throw new WebsocketError({
                    code: WsCloseCodes.UnknownOpcode,
                    message: `You sent an invalid Gateway opcode or an invalid payload for an opcode. Don't do that!`
                })
            case WsCloseCodes.DecodeError:
                throw new WebsocketError({
                    code: WsCloseCodes.DecodeError,
                    message: `You sent an invalid payload to Discord. Don't do that!`
                })
            case WsCloseCodes.NotAuthenticated:
                throw new WebsocketError({
                    code: WsCloseCodes.NotAuthenticated,
                    message: `You sent us a payload prior to identifying.`
                })
            case WsCloseCodes.AuthenticationFailed:
                throw new WebsocketError({
                    code: WsCloseCodes.AuthenticationFailed,
                    message: `The account token sent with your identify payload is incorrect.`
                })
            case WsCloseCodes.AlreadyAuthenticated:
                throw new WebsocketError({
                    code: WsCloseCodes.AlreadyAuthenticated,
                    message: `You sent more than one identify payload. Don't do that!`
                })
            case WsCloseCodes.InvalidSeq:
                throw new WebsocketError({
                    code: WsCloseCodes.InvalidSeq,
                    message: `The sequence sent when resuming the session was invalid. Reconnect and start a new session.`
                })
            case WsCloseCodes.RateLimited:
                throw new WebsocketError({
                    code: WsCloseCodes.RateLimited,
                    message: `Woah nelly! You're sending payloads to us too quickly. Slow it down! You will be disconnected on receiving this.`
                })
            case WsCloseCodes.SessionTimedOut:
                throw new WebsocketError({
                    code: WsCloseCodes.SessionTimedOut,
                    message: `Your session timed out. Reconnect and start a new one.`
                })
            case WsCloseCodes.InvalidShard:
                throw new WebsocketError({
                    code: WsCloseCodes.InvalidShard,
                    message: `You sent us an invalid shard when identifying.`
                })
            case WsCloseCodes.ShardingRequired:
                throw new WebsocketError({
                    code: WsCloseCodes.ShardingRequired,
                    message: `The session would have handled too many guilds - you are required to shard your connection in order to connect.`
                })
            case WsCloseCodes.InvalidApiVersion:
                throw new WebsocketError({
                    code: WsCloseCodes.InvalidApiVersion,
                    message: `You sent an invalid version for the gateway.`
                })
            case WsCloseCodes.InvalidIntents:
                throw new WebsocketError({
                    code: WsCloseCodes.InvalidIntents,
                    message: `You sent an invalid intent for a Gateway Intent. You may have incorrectly calculated the bitwise value.`
                })
            case WsCloseCodes.DisallowedIntents:
                throw new WebsocketError({
                    code: WsCloseCodes.DisallowedIntents,
                    message: `You sent a disallowed intent for a Gateway Intent. You may have tried to specify an intent that you have not enabled or are not approved for.`
                })
               
        }
    }

    handleOpen() {
        this.on(WSEventCodes.Open, () => {
            this.client.emit(EventTypes.Debug, `[Websocket]: Connected to Discord Gateway`)
            this.handleConnect()
            if(this.client.sessionId) this.handleResume()
            else this.connect()
        })
    }

    send(payload = {}) {
        if(!payload) return null;
        return super.send(JSON.stringify(payload))
    }

    handleResume() {
        return this.send({
            op: OpCodes.Resume,
            d: {
                token: this.client.token,
                session_id: this.client.sessionId,
                seq: this.client.seq
            }
        })
    }

    handleReconnect() {
        this.client.emit(EventTypes.Debug, `[Websocket]: Discord requested for a Reconnect. Reconnecting`)
        this.client.emit(EventTypes.Debug, `[Websocket]: Making a close timeout of 5s for a clean reconnect`)
        if(this.interval) clearInterval(this.interval)
        this.status = WebsocketStatus.Reconnecting
        this.removeAllListeners()
        setTimeout(() => {
            this.client.sessionId = null
            this.client.emit(EventTypes.Debug, `[Websocket]: Cleared session id, and closing the previous WebSocket connection then making a new one`)
            if(this.readyState !== this.CLOSED) {
                this.close()
                this.client.emit(EventTypes.Debug, `[Websocket]: Successfully closed previous WebSocket connection`)
            }
            this.client.ws = new WebsocketManager(this.client)
        }, 5_000).unref()
        return;
    }

    parsePresence(presence = {}) {
        return {
            since: presence.since ?? null,
            activities: presence.activities?.map(o => {
                return {
                    name: o.name,
                    type: o.type,
                    url: o.url
                }
            }),
            status: presence.status ?? "online",
            afk: presence.afk ?? null
        }
    }
}

module.exports = WebsocketManager