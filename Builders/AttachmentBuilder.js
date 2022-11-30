class AttachmentBuilder {
    constructor(data = {}) {
        this.filename = data.filename
        this.url = data.url
        this.spoiler = data.spoiler
        this.description = data.description
    }

    setURL(url) {
        this.url = url
        return this;
    }

    setDescription(description) {
        this.description = description
        return this;
    }

    setFilename(filename) {
        this.filename = filename
        return this;
    }

    setSpoiler() {
        this.spoiler = true
        return this;
    }

    parse() {
        return {
            url: this.url,
            filename: this.filename,
            spoiler: this.spoiler,
            description: this.description
        }
    }

    static from(attachment) {
        if(attachment) return new AttachmentBuilder(attachment)
        throw new RangeError(`Please specify an Attachment`)
    }
}

module.exports = AttachmentBuilder