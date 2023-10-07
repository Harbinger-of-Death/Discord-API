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
        if (this.readyState !== WsReadyStateCodes.Open) {
            this.client.debug(`[Websocket]: Websocket isn't ready. Remaking Websocket connection`)
            return this._handleNewInstance(this.client.wssURL)
        }
      
        const { url, shards, session_start_limit } = await this.client.api.get(`${this.client.root}/gateway/bot`) || {};
        if (!url || (session_start_limit?.remaining ?? 1) < 1) {
          this.client.debug('[Websocket]: Unable to get bot gateway info, or exceeded daily login limit');
          return process.exit();
        }
      
        const debug = `[Websocket Info]:\nURL: ${url}\nShards: ${shards}\nRemaining: ${session_start_limit?.remaining}/${session_start_limit?.total}`;
        this.send({
          op: OpCodes.Identify,
          d: {
            token: this.client.token,
            intents: this.client.intents?.toString(),
            presence: this.parsePresence(this.client.presence),
            properties: this.client.websocketOptions,
          },
        });
      
        this.client.debug(debug)
      }
      

    handleConnect() {
        if (this.readyState === this.CLOSED) {
          this.client.debug('[Websocket]: Websocket has been closed due to unknown reasons')
          return;
        }
        this.on(WSEventCodes.Message, (data) => new ActionsManager(JSON.parse(data), this.client))
        this.on(WSEventCodes.Close, (data) => this.handleClose(data))
    }
      

    handleClose(err) {
        this.status = WebsocketStatus.Closed
        return WebsocketCloseHandler[err] ? new WebsocketCloseHandler[err](this.client) : null
    }

    handleOpen() {
        this.on(WSEventCodes.Open, () => {
            const msg = this.reconnected ? 
                `[Websocket]: Successfully reconnected to Discord Gateway at ${new Date().toLocaleString("en-US")}, and potentially resume missed events if some` :
                `[Websocket]: Connected to Discord Gateway at ${new Date().toLocaleString("en-US")}`;
            this.client.debug(msg);
            this.handleConnect();
        });
    }

    send(payload = {}) {
        if(!payload) return null;
        return super.send(JSON.stringify(payload))
    }

    handleResume() {
        if (!this.client.sessionId) {
            this.client.debug(`[Websocket]: No session ID found, cannot resume events. Re-identifying.`);
            return this.connect();
        }
    
        this.client.debug(`[Websocket]: Attempting to resume connection with session ID: ${this.client.sessionId}`);
    
        this.send({
            op: OpCodes.Resume,
            d: {
                token: this.client.token,
                session_id: this.client.sessionId,
                seq: this.client.seq
            }
        });
    }
    
    _handleNewInstance(url) {
        this.status = WebsocketStatus.Reconnecting
        this.removeAllListeners()
        setTimeout(() => {
            this.client.debug(`[Websocket]: Closing the previous WebSocket connection then making a new one`)
            if(this.readyState !== this.CLOSED) {
                this.destroy(4000)
                this.client.debug(`[Websocket]: Successfully closed previous WebSocket connection`)
            }
            if(this.readyState === this.CLOSED) this.client.debug(`[Websocket]: Websocket has been already closed. So this should be easy`)
            this.client.debug(`[Websocket]: Now connecting to gateway url: ${url}`)
            this.client.ws = new WebsocketManager(this.client, url)
            this.client.closeSequence = this.client.seq
            this.client.ws.reconnected = true
        }, 5_000).unref()
    }

    handleReconnect() {
        if(!this.client.resumeGatewayURL) {
            this.client.debug(`[Websocket]: Tried to reconnect but there's no resume gateway url found. Re-identifying`)
            return this.connect()
        }
        if(this.status !== WebsocketStatus.Closed && this.reconnect) {
            this.client.debug(`[Websocket]: Received a request for a Reconnect. Reconnecting`)
            this.client.debug(`[Websocket]: Making a close timeout of 5s for a clean reconnect`)
        }
        if(this.interval && !this.interval?._destroyed) {
            this.client.debug(`[Heartbeat]: Clearing the heartbeat interval`)
            clearInterval(this.interval)
        }
        return this._handleNewInstance(this.client.resumeGatewayURL ?? this.client.wssURL)

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
                    state: o.state,
                    url: o.url
                }
            }),
            status: presence.status ?? "online",
            afk: presence.afk ?? null
        }
    }
}

module.exports = WebsocketManager