const Base = require("../Base/base");
const Collection = require("../Util/Collection");
const Sticker = require("./Sticker");

class StickerPack extends Base {
    constructor(data = {}, client) {
        super(client)
        this.id = data.id ?? null
        this.stickers = new Collection(data.stickers?.map(o => [o.id, new Sticker(o, o.guild_id, this.client)]))
        this.name = data.name ?? null
        this.skuId = data.sku_id ?? null
        this.coverStickerId = data.cover_sticker_id ?? null
        this.description = data.description ?? null
        this.bannerAssetId = data.banner_asset_id
    }

    async fetch() {
        return (await this.client.fetchPremiumStickerPack()).get(this.id) ?? null
    }

    bannerAssetURL(options = {}) {
        if(!this.bannerAssetId) return null;
        return this.client.cdn.StickerPackBanner(this.bannerAssetId, options.extension, options.size)
    }
}

module.exports = StickerPack