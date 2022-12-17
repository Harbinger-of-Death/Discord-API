const WebSocket = require("ws");
const { OpCodes, WSEventCodes, WsReadyStateCodes, EventTypes, WsCloseCodes, WebsocketStatus } = require("../Util/Constants");
const ActionsManager = require("./ActionsManager");
const WebsocketCloseHandler = require("../Actions/Handlers/WebsocketCloseHandler")
class WebsocketManager extends WebSocket {
    constructor(client, wssURL) {
        super(wssURL ?? client.wssURL)
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
            this.client.debug(`[Websocket]: You exceeded your daily login limit`)
            return process.exit()
        }
        const debug = `[Websocket Info]:\nURL: ${botInfo.url}\nShards: ${botInfo.shards}\nRemaining: ${botInfo.session_start_limit?.remaining}/${botInfo.session_start_limit?.total}`
        this.send({
            op: OpCodes.Identify,
            d: {
                token: this.client.token,
                intents: this.client.intents?.toString(),
                presence: this.parsePresence(this.client.presence),
                properties: this.client.websocketOptions
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
        return WebsocketCloseHandler[err] ? new WebsocketCloseHandler[err](this.client) : null
    }

    handleOpen() {
        this.on(WSEventCodes.Open, () => {
            if(!this.reconnected) this.client.debug(`[Websocket]: Connected to Discord Gateway`)
            else {
                this.client.debug(`[Websocket]: Successfully reconnected to Discord Gateway. Now resuming missed events`)
            }
            this.handleConnect()
        })
    }

    send(payload = {}) {
        if(!payload) return null;
        return super.send(JSON.stringify(payload))
    }

    handleResume() {
        if(!this.client.sessionId) {
            this.client.debug(`[Websocket]: No session id found, cannot resume events. Re-identifying`)
            return this.connect()
        }
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
        if(!this.client.resumeGatewayURL) {
            this.client.debug(`[Websocket]: Tried to reconnect but there's no resume gateway url found. Re-identifying`)
            return this.connect()
        }
        if(this.status !== WebsocketStatus.Closed) {
            this.client.debug(`[Websocket]: Discord requested for a Reconnect. Reconnecting`)
            this.client.debug(`[Websocket]: Making a close timeout of 5s for a clean reconnect`)
        }
        if(this.interval && !this.interval?._destroyed) {
            this.client.debug(`[Heartbeat]: Clearing the heartbeat interval`)
            clearInterval(this.interval)
        }
        this.status = WebsocketStatus.Reconnecting
        this.removeAllListeners()
        setTimeout(() => {
            this.client.debug(`[Websocket]: Closing the previous WebSocket connection then making a new one`)
            if(this.readyState !== this.CLOSED) {
                this.destroy(4000)
                this.client.debug(`[Websocket]: Successfully closed previous WebSocket connection`)
            }
            if(this.readyState === this.CLOSED) this.client.debug(`[Websocket]: Websocket has been already closed. So this should be easy`)
            this.client.debug(`[Websocket]: Now connecting to resume gateway url: ${this.client.resumeGatewayURL}`)
            this.client.ws = new WebsocketManager(this.client, this.client.resumeGatewayURL)
            this.client.closeSequence = this.client.seq
            this.client.ws.reconnected = true
        }, 5_000).unref()
    }

    destroy(closeCode) {
        this.status = WebsocketStatus.Closing
        return this.close(closeCode, "destroy")
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