const Base = require("../Base/base");
const Cacher = require("./Handlers/Cacher");

class BaseAction extends Base {
    constructor(client) {
        super(client)
        this.cacher = new Cacher(this.client)
    }
}

module.exports = BaseAction