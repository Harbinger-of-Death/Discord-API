const Base = require("../Base/base");

class PartialWidgetChannel extends Base {
    constructor(data = {}, client) {
        super(client)
        this.id = data.id ?? null
        this.name = data.name ?? null
        this.position = data.position ?? null
    }
}

module.exports = PartialWidgetChannel