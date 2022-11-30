const Base = require("../Base/base");
class Embed extends Base {
    constructor(data = {}, client) {
        super(client)
        this.title = data.title ?? null
        this.description = data.description ?? null
        this.url = data.url ?? null
        this.timestamp = data.timestamp ? new Date(data.timestamp) : null
        this.color = data.color ?? null
        this.footer = data.footer ? { text: data.footer.text, iconURL: data.footer.icon_url, proxyIconURL: data.footer.proxyIconURL } : null
        this.image = data.image ? { url: data.image.url, proxyURL: data.image.proxy_url, height: data.image.height, width: data.image.width } : null
        this.thumbnail = data.thumbnail ? { url: data.thumbnail.url, proxyURL: data.thumbnail.proxy_url, height: data.thumbnail.height, width: data.thumbnail.width } : null
        this.video = data.video ? { url: data.video.url, proxyURL: data.video.proxy_url, height: data.video.height, width: data.video.width } : null
        this.provider = data.provider ? { name: data.provider.name, url: data.provider.url } : null
        this.author = data.author ? { name: data.author.name, url: data.author.url, iconURL: data.author.icon_url, proxyIconURL: data.proxyIconURL } : null
        this.fields = data.fields?.map(o => Embed.resolveFields(o)) ?? []
    }

    static resolveFields(fields = {}) {
        return {
            name: fields.name,
            value: fields.value,
            inline: fields.inline
        }
    }

    equals(embeds) {
        return this === embeds || this.title === embeds.title &&
        this.description === embeds.description &&
        this.url === embeds.url &&
        this.timestamp === embeds.timestamp &&
        this.color === embeds.color &&
        (this.footer === embeds.footer || this.footer?.text === embeds.footer?.text && this.footer?.iconURL === embeds.footer?.iconURL && this.footer?.proxyIconURL === embeds.footer?.proxyIconURL) &&
        (this.image === embeds.image || this.image?.url === embeds.image?.url && this.image?.proxyURL === embeds.image?.proxyURL && this.image?.height === embeds.image?.height && this.image?.width === embeds.image?.width) &&
        (this.thumbnail === embeds.thumbnail || this.thumbnail?.url === embeds.thumbnail?.url && this.thumbnail?.proxyURL === embeds.thumbnail?.proxyURL && this.thumbnail?.height === embeds.thumbnail?.height && this.thumbnail?.width === embeds.thumbnail?.width) &&
        (this.video === embeds.video || this.video?.url === embeds.video?.url && this.video?.proxyURL === embeds.video?.proxyURL && this.video?.height === embeds.video?.height && this.video?.width === embeds.video?.width) &&
        (this.provider === embeds.provider || this.provider?.name === embeds.provider?.name && this.provider?.url === embeds.provider?.url) &&
        (this.author === embeds.author || this.author?.name === embeds.author?.name && this.author?.url === embeds.author?.url && this.author?.iconURL === embeds.author?.iconURL && this.author?.proxyIconURL === embeds.author?.proxyIconURL) &&
        this.fields.length === embeds.fields.length &&
        this.fields.every((fields, index) => { return fields.name === embeds.fields[index]?.name && fields.value === embeds.fields[index]?.value && fields.inline === embeds.fields[index]?.inline })
    }
}

module.exports = Embed