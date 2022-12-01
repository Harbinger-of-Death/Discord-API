const fs = require("fs");
const path = require("path");
const { WebsocketEvents } = require("../../Util/Constants");
let arr = []
const files = fs.readdirSync(path.dirname(__dirname)).filter(o => !o.startsWith("BaseAction") && !fs.statSync(path.join(path.dirname(__dirname), o)).isDirectory())

for(const file of files) {
    const handlers = require(`../${file}`)

    arr.push([WebsocketEvents[file.slice(0, -3)], handlers])
}


module.exports = Object.fromEntries(arr)