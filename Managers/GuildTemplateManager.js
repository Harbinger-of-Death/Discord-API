const Base = require("../Base/base");
const GuildTemplate = require("../Structures/GuildTemplate");
const Collection = require("../Util/Collection");
const Util = require("../Util/Util");
class GuildTemplateManager extends Base {
    constructor(guildId, client) {
        super(client)
        this.guildId = guildId
    }

    _add(templates, guildId = this.guildId) {
        if(!templates) return null;
        const templateCode = typeof templates === "string" ? templates : templates.code
        return new GuildTemplate(typeof templates === "string" ? {
            code: templateCode,
            partial: true
        } : templates, guildId, this.client)
    }

    async fetch(code) {
        if(code instanceof GuildTemplate || typeof code === "string") return this._fetchId(code)
        const templates = await this.client.api.get(`${this.client.root}/guilds/${this.guildId}/templates`)
        return new Collection(templates?.map(o => [o.code, this._add(o, this.guildId)]))
    }

    async _fetchId(code) {
        if(typeof code === "string") code = code.slice(code.lastIndexOf("/")+1)
        else code = code.code
        const template = await this.client.api.get(`${this.client.root}/guilds/templates/${code}`)
        return this._add(template)
    }

    async createTemplate(options = {}) {
        const body = { name: options.name, description: options.description }
        const template = await this.client.api.post(`${this.client.root}/guilds/${this.guildId}/templates`, { body })
        return this._add(template)
    }

    async createGuildFromTemplate(code, options = {}) {
        if(typeof code === "string") code = code.slice(code.lastIndexOf("/")+1)
        else code = code.code
        const body = { name: options.name, icon: await Util.generateDataURI(options.icon) }
        const guild = await this.client.api.post(`${this.client.root}/guilds/templates/${code}`, { body })
        return this.client.guilds._add(guild, { cache: true })
    }

    async syncTemplate(code) {
        if(typeof code === "string") code = code.slice(code.lastIndexOf("/")+1)
        else code = code.code
        const template = await this.client.api.put(`${this.client.root}/guilds/${this.guildId}/templates/${code}`)
        return this._add(template)
    }

    async edit(code, options = {}) {
        if(typeof code === "string") code = code.slice(code.lastIndexOf("/")+1)
        else code = code.code
        const body = { name: options.name, description: options.description }
        const template = await this.client.api.patch(`${this.client.root}/guilds/${this.guildId}/templates/${code}`, { body })
        return this._add(template)
    }

    async delete(code) {
        if(typeof code === "string") code = code.slice(code.lastIndexOf("/")+1)
        else code = code.code
        const template = await this.client.api.delete(`${this.client.root}/guilds/${this.guildId}/templates/${code}`)
        return this._add(template)
    }

}   

module.exports = GuildTemplateManager