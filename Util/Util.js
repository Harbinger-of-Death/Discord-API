const fetch = require("node-fetch");
const fs = require("fs");
const { Stream } = require("node:stream");
const AttachmentBuilder = require("../Builders/AttachmentBuilder");
class Util {
    static resolveColor(color) {
        if(typeof color === "string") {
            if(color === "Random") color = Math.floor(Math.random() * (0xffffff + 1))
            if(color.startsWith(`#`)) color = BigInt(`0x${color.replace("#", "")}`)
            else if(color.startsWith(`0x`)) color = BigInt(color)
            else color = BigInt(`0x${color}`)
        }
        if(Array.isArray(color)) color = (color[0] << 16) + (color[1] << 8) + color[2]
        if(color > 0xffffff || color < 0) throw new RangeError(`Color must be between 0-255 in range`)
        if(typeof color !== "number" && typeof color !== "bigint") throw new TypeError(`Color must be a valid decimal`)
        return Number(color)
    }

    static generateDateISOString(date = Date.now()) {
        if(!date) return;
        if(date instanceof Date) return date.toISOString()
        return new Date(date).toISOString()
    }

    static async getBuffer(attachment) {
        if(attachment instanceof Buffer) return attachment
        if(attachment instanceof AttachmentBuilder) return this.getBuffer(attachment.attachment)
        if(typeof attachment === "string") {
            if(/^(http(s)?:\/\/)/.test(attachment)) {
                attachment = await fetch(attachment)
                return await this.getBuffer(await attachment.arrayBuffer())
            }
            if(/^(?:[\.]{1,2}\/|[a-zA-Z]+:\/.+\.\w{3,5})/.test(attachment)) { 
                if(fs.statSync(attachment).isFile()) return fs.readFileSync(attachment)
            }

            return Util.base64ToBuffer(attachment)
        }
        if(attachment instanceof ArrayBuffer) return Buffer.from(attachment)
        if(attachment instanceof Stream) return await this.getStreamData(attachment)
        throw new TypeError(`Invalid Attachment Type`)
    }

    static async getStreamData(stream) {
        const buffers = []
        for await (const chunk of stream) buffers.push(Buffer.from(chunk))
        return Buffer.concat(buffers)
    }

    static async generateDataURI(buffer, mediaType = ".png") {
        if(!buffer) throw new RangeError(`No Buffer resolvable specified`);
        if(typeof buffer === "string") {
            if(buffer.startsWith("data")) return buffer
        }
        if(!(buffer instanceof Buffer)) buffer = await this.getBuffer(buffer)
        let mimeType
        switch(mediaType) {
            case ".png":
            case ".webp":
                mimeType = "image/png"
                break;
            case ".jpg":
            case ".jpeg":
                mimeType = "image/jpeg"
                break;
            case ".gif":
                mimeType = "image/gif"
                break;
            case ".pdf":
                mimeType = "application/pdf"
                break;
            case ".mp3":
                mimeType = "audio/mpeg"
                break;
            case ".wav":
                mimeType = "audio/wav"
                break;
            case ".mp4":
                mimeType = "video/mp4"
                break;
            case ".webm":
                mimeType = "video/webm"
                break;
            default:
                mimeType = "text/plain"
                break;
        
        }
        return `data:${mimeType};base64,${buffer.toString("base64")}`
    }

    static base64ToBuffer(base64) {
        if(base64 instanceof Buffer) return base64
        if(base64.startsWith("data")) {
            base64 = /^(?:data:[A-Za-z]+\/[A-Za-z]+;base64,(.+))/.exec(base64)
            if(base64[1]) base64 = base64[1]
        }
        return Buffer.from(base64, "base64")
    }

    static async downloadFile(file, directory = "./index.txt") {
        if(!(file instanceof Buffer)) file = await this.getBuffer(file)
        return fs.writeFileSync(directory, file)
    }

    static discordTimestamp(timestamp, format = "R") {
        if(Number.isNaN(timestamp) && !(timestamp instanceof Date)) throw new TypeError(`Invalid time`)
        timestamp = Math.floor(timestamp / 1000)
        return `<t:${timestamp}:${format}>`
    }

    static codeBlock(text, language = "js") {
        return `\`\`\`${language}\n${text}\`\`\``
    }

    static createPaginationArrays(arr = [], arrLength = 2) {
        return Array.from({ length: Math.ceil(arr.length / arrLength) }, (_, i) => arr.slice(i * arrLength, i * arrLength + arrLength))
    }

    static async promisifiedTimeout(ms) {
        return new Promise(res => setTimeout(res, ms))
    }

    static setTimeout(ms, callback = () => {}) {
        return setTimeout(callback, ms)
    }

    static setInterval(ms, callback) {
        return setInterval(callback, ms)

    }
}

module.exports = Util