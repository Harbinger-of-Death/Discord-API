const AttachmentBuilder = require("../Builders/AttachmentBuilder");
const Util = require("./Util");
const path = require("path");
class DataResolver {
    static async resolveFile(file) {
        if(file instanceof Buffer) return { buffer: file, filename: "index.txt" }
        if(file instanceof AttachmentBuilder) return await this.resolveFile(file.parse())
        file["buffer"] = path.extname(file.filename) === ".txt" ? Buffer.from(file.attachment, "utf-8") : await Util.getBuffer(file.attachment)
        if(!file.filename) throw new RangeError(`No Filename specified`)
        return {
            buffer: file.buffer,
            filename: `${file.spoiler ? `SPOILER_` : ""}${file.filename}`,
            description: file.description
        }
    }
}

module.exports = DataResolver