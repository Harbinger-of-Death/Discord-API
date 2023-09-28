const Util = require("../Util/Util");
class EmbedBuilder {
    constructor(data = {}) {
        this.title = data.title
        this.description = data.description
        this.author = data.author ? { name: data.author.name, iconURL: data.author.iconURL ?? data.author.icon_url } : undefined
        this.image = data.image ? { url: data.image.url } : undefined
        this.thumbnail = data.thumbnail ? { url: data.thumbnail.url } : undefined
        this.color = data.color ? Util.resolveColor(data.color) : undefined
        this.footer = data.footer ? { text: data.footer.text, iconURL: data.footer.iconURL ?? data.footer.icon_url } : undefined
        this.timestamp = data.timestamp ? Util.generateDateISOString(data.timestamp) : undefined
        this.fields = data.fields?.map(o => EmbedBuilder.transformFields(o)) ?? []
        this.url = data.url ?? undefined
    }

    setTitle(title) {
        this.title = title
        return this;
    }

    setDescription(description) {
        this.description = description
        return this;
    }

    setAuthor(author = {}) {
        this.author = {
            name: author.name,
            iconURL: author.iconURL ?? author.icon_url
        }

        return this;
    }

    setImage(url) {
        this.image = { url }
        return this;
    }

    setThumbnail(url) {
        this.thumbnail = { url }
        return this;
    }

    setColor(color) {
        this.color = Util.resolveColor(color)
        return this;
    }

    setFooter(footer = {}) {
        this.footer = {
            text: footer.text,
            iconURL: footer.iconURL ?? footer.icon_url
        }

        return this;
    }

    setTimestamp(timestamp) {
        this.timestamp = Util.generateDateISOString(timestamp)
        return this;
    }

    addFields(...fields) {
        if(Array.isArray(fields[0])) {
            fields[0].map(o => this.fields.push(EmbedBuilder.transformFields(o)))
        } else {
            fields.map(o => this.fields.push(EmbedBuilder.transformFields(o)))
        }

        return this;
    }

    setFields(...fields) {
        if(Array.isArray(fields[0])) {
            this.fields = fields[0].map(o => EmbedBuilder.transformFields(o))
        } else {
            this.fields = fields.map(o => EmbedBuilder.transformFields(o))
        }

        return this;
    }

    setUrl(url) {
        this.url = url
        return this;
    }


    validation() {
        if(!this.title && !this.description && !this.fields?.length) throw new RangeError(`Embed must have title, description or fields`)
        if(this.title?.length > 256) throw new RangeError(`Embed title must be less than 256`)
        if(this.description?.length > 4096) throw new RangeError(`Embed description must be less than 4096`)
        if(this.fields?.length > 25) throw new RangeError(`Embed fields must be less than 25`)
        if(this.author) {
            if(this.author.name?.length > 256) throw new RangeError(`Embed author name must be less than 256`)
        }
        if(this.footer) {
            if(this.footer.text?.length > 2048) throw new RangeError(`Embed footer text must be less than 2048`)
        }
        if(typeof this.title !== "string" && this.title) throw new TypeError(`Embed title must be string`)
        if(typeof this.description !== "string" && this.description) throw new TypeError(`Embed description must be string`)
        if(typeof this.author?.name !== "string" && this.author?.name) throw new TypeError(`Embed author name must be string`)
        if(typeof this.footer?.text !== "string" && this.footer?.text) throw new TypeError(`Embed footer text must be string`)
        if(!EmbedBuilder.URLREGEX.test(this.footer?.iconURL) && this.footer?.iconURL) throw new TypeError(`Embed footer icon url must be valid`)
        if(!EmbedBuilder.URLREGEX.test(this.image?.url) && this.image?.url) throw new TypeError(`Embed image url must be valid`)
        if(!EmbedBuilder.URLREGEX.test(this.thumbnail?.url) && this.thumbnail?.url) throw new TypeError(`Embed thumbnail url must be valid`)
        if(!EmbedBuilder.URLREGEX.test(this.author?.iconURL) && this.author?.iconURL) throw new TypeError(`Embed author icon url must be valid`)
        if(this.fields?.length > 25) throw new RangeError(`Embed Fields must be less than 25`)
        for(const [index, value] of this.fields.entries()) {
            if(!value.name || !value.value) throw new RangeError(`Field[${index}]: name and value are required`)
            if(value.name?.length > 256) throw new RangeError(`Field[${index}]: name must be less than 256`)
            if(value.value?.length > 1024) throw new RangeError(`Field[${index}]: value must be less than 1024`)
            if(typeof value.name !== "string" || typeof value.value !== "string") throw new TypeError(`Field[${index}]: name and value must be string`)
            if(typeof value.inline !== "boolean" && value.inline) throw new TypeError(`Field[${index}]: inline property must be boolean`)
        }
        return;
    }

    toJSON() {
        this.validation()
        return {
            title: this.title,
            url: this.url,
            description: this.description,
            color: this.color,
            image: this.image,
            thumbnail: this.thumbnail,
            author: this.author ? { name: this.author.name, icon_url: this.author.iconURL } : undefined,
            footer: this.footer ? { text: this.footer.text, icon_url: this.footer.iconURL } : undefined,
            timestamp: this.timestamp,
            fields: this.fields
        }
    }

    static transformFields(fields = {}) {
        return {
            name: fields.name,
            value: fields.value,
            inline: fields.inline
        }
    }

    static from(embeds) {
        if(embeds) {
            return new EmbedBuilder(embeds)
        }

        throw new RangeError(`Please specify a valid Embed`)
    }
}

EmbedBuilder.URLREGEX = /^(http(s)?:\/\/|attachment:\/\/)/


module.exports = EmbedBuilder