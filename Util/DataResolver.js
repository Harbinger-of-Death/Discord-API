const AttachmentBuilder = require("../Builders/AttachmentBuilder");
const Util = require("./Util");
class DataResolver {
    static async resolveFile(file) {
        if(file instanceof Buffer) return { buffer: file, filename: "index.png" }
        if(file instanceof AttachmentBuilder) return await this.resolveFile(file.parse())
        file["buffer"] = await Util.getBuffer(file.url)
        if(!file.filename) throw new RangeError(`No Filename specified`)
        return {
            buffer: file.buffer,
            filename: `${file.spoiler ? `SPOILER_` : ""}${file.filename}`,
            description: file.description
        }
    }
}

module.exports = DataResolver