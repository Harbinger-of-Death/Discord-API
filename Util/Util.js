const fetch = require("node-fetch");
const fs = require("fs");
const AttachmentBuilder = require("../Builders/AttachmentBuilder");
class Util {
    static resolveColor(color) {
        if(typeof color === "string") {
            if(color === "Random") color = Math.floor(Math.random() * (0xffffff + 1))
            else color = parseInt(color.replace("#", ""), 16)
        }

        if(Array.isArray(color)) {
            color = (color[0] << 16) + (color[1] << 8) + color[2]
        }

        if(color > 0xffffff || color < 0) throw new RangeError(`Color must be between 0-255 in range`)
        else if(isNaN(color)) throw new RangeError(`Invalid Color type`)
        return color
    }

    static generateDateISOString(date = Date.now()) {
        if(!date) return;
        if(date instanceof Date) return date.toISOString()
        return new Date(date).toISOString()
    }

    static async getBuffer(attachment) {
        if(attachment instanceof Buffer) return attachment
        if(attachment instanceof AttachmentBuilder) return this.getBuffer(attachment.url)
        if(/^(http(s)?:\/\/)/gi.test(attachment)) {
            attachment = await fetch(attachment)
            return await attachment.buffer()
        }

        if(fs.statSync(attachment).isFile()) {
            return fs.readFileSync(attachment)
        }

        if(attachment.startsWith("data") || typeof attachment === "string") return Util.base64ToBuffer(attachment)
        throw new TypeError(`Invalid Attachment Type`)
    }

    static async generateDataURI(buffer, mimeType) {
        if(!buffer) return;
        if(typeof buffer === "string") {
            if(buffer.startsWith("data")) return buffer
        }
        if(!(buffer instanceof Buffer)) buffer = await this.getBuffer(buffer)
        switch(mimeType) {
            case ".png":
            case ".webp":
            default:
                mimeType = "png"
                break;
            case ".jpg":
            case ".jpeg":
                mimeType = "jpeg"
                break;
            case ".gif":
                mimeType = "gif"
                break;

        }
        return `data:image/${mimeType};base64,${buffer.toString("base64")}`
    }

    static base64ToBuffer(base64) {
        if(base64 instanceof Buffer) return base64
        if(base64.startsWith("data")) base64 = base64.replace(/^(data\:image\/\w{1,5};base64,)/, "")
        return Buffer.from(base64, "base64")
    }

    static codeBlock(text, language = "js") {
        return `\`\`\`${language}\n${text}\`\`\``
    }
}

module.exports = Util