const Base = require("../Base/base");
const Acitivity = require("./Activity");
class ClientPresence extends Base {
    constructor(data = {}, client) {
        super(client)
        this.activities = data.activities?.map(o => new Acitivity(o, this.client)) ?? []
        this.status = data.status ?? null
        this.afk = data.afk ?? null
    }
}

module.exports = ClientPresence