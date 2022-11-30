class Button {
    constructor(data = {}) {
        this.type = data.type ?? null
        this.style = data.style ?? null
        this.label = data.label ?? null
        this.emoji = data.emoji ?? null
        this.customId = data.custom_id ?? null
        this.url = data.url ?? null
        this.disabled = data.disabled ?? null
    }
}

module.exports = Button