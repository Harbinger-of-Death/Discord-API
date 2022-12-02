const fs = require("fs");
const path = require("path");
const { WebsocketEvents } = require("../../Util/Constants");
let arrayOfHandlers = []
const dirname = path.dirname(__dirname)
const files = fs.readdirSync(dirname).filter(o => o !== "BaseAction.js" && !fs.statSync(path.join(dirname, o)).isDirectory())

for(const file of files) {
    const handlers = require(`../${file}`)

    arrayOfHandlers.push([WebsocketEvents[file.slice(0, -3)], handlers])
}

module.exports = Object.fromEntries(arrayOfHandlers)