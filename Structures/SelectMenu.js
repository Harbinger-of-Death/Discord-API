class SelectMenu {
    constructor(data = {}) {
        this.type = data.type ?? null
        this.customId = data.custom_id ?? null
        this.options = data.options?.map(o => { 
            return {
                label: o.label,
                value: o.value,
                description: o.description,
                emoji: o.emoji,
                disabled: o.disabled
            }
        }) ?? []
        this.placeholder = data.placeholder ?? null
        this.minValues = data.min_values ?? null
        this.maxValues = data.max_values ?? null
        this.channelTypes = data.channel_types ?? null
        this.defaultValues = data.default_values ?? null
        this.disabled = data.disalbed ?? null
    }
}

module.exports = SelectMenu