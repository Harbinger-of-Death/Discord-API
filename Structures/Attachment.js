const Base = require("../Base/base");

class Attachment extends Base {
    constructor(data = {}, client) {
        super(client)
        this.data = data ?? {}
    }

    get id() {
        return this.data?.id ?? null
    }

    get filename() {
        return this.data?.filename ?? null
    }
    get description() {
        return this.data?.description ?? null
    }

    get contentType() {
        return this.data?.content_type ?? null
    }

    get size() {
        return this.data?.size ?? null
    }

    get url() {
        return this.data?.url ?? null
    }

    get proxyURL() {
        return this.data?.proxy_url ?? null
    }

    get height() {
        return this.data?.height ?? null
    }

    get width() {
        return this.data?.width ?? null
    }

    get ephemeral() {
        return this.data?.ephemeral ?? null
    }

    get spoiler() {
        return this.filename?.startsWith("SPOILER_")
    }

    get durationSecs() {
        return this.data?.duration_secs ?? null
    }

    get waveForm() {
        return this.data?.waveform ?? null
    }

}

module.exports = Attachment