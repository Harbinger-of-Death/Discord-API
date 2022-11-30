const Base = require("../Base/base")

class RichPresetAsset extends Base {
    constructor(data = {}, client) {
        super(client)
        this.largeImage = data.large_image ?? null
        this.largeText = data.large_text ?? null
        this.smallImage = data.small_image ?? null
        this.smallText = data.small_text ?? null
        this.applicationId = data.application_id ?? null
    }

    largeImageURL(options = {}) {
        if(!this.largeImage) return null;
        if(!this.applicationId) return null;
        let id = this.largeImage
        if(this.largeImage.includes(":")) {
            const [type, imageId] = this.largeImage.split(":")
            id = imageId
        }

        return this.client.cdn.ApplicationAsset(id, options.extension, options.size, this.applicationId)

    }

    smallImageURL(options = {}) {
        if(!this.smallImage) return null;
        if(!this.applicationId) return null;
        let id = this.smallImage
        if(this.smallImage.includes(":")) {
            const [type, imageId] = this.smallImage.split(":")
            id = imageId
        }

        return this.client.cdn.ApplicationAsset(id, options.extension, options.size, this.applicationId)
    }
}

module.exports = RichPresetAsset