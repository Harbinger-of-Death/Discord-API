const ActionRowBuilder = require("../Builders/ActionRowBuilder")
const EmbedBuilder = require("../Builders/EmbedBuilder")
const Collection = require("./Collection")
const { InteractionResponsesEnums } = require("./Constants")
const DataResolver = require("./DataResolver")
const MessageFlags = require("./MessageFlags")

class DataPayload {
    static async create(payload = {}, type) {
        let data = this.resolveData(payload)
        let files
        
        if(payload.files?.length) {
            files = await Promise.all(payload.files.map(o => DataResolver.resolveFile(o)))
            for(const [index, val] of files.entries()) {
                data.attachments.push({
                    id: index,
                    description: val.description,
                    filename: val.filename
                })
            }
        }

        if(type) {
            switch(type) {
                case InteractionResponsesEnums.Modal:
                    data = { type, data: this.resolveModal(payload) }
                    break;
                case InteractionResponsesEnums.ApplicationCommandAutocompleteResult:
                    data = { type, data: { choices: payload.choices } }
                    break;
                default:
                    data = { type, data }
                    break;
            }
        }

        return { data, files }
    }

    static resolveData(payload = {}) {
        if(payload.ephemeral) payload.flags = MessageFlags.Flags.Ephemeral
        return {
            content: payload.content,
            tts: payload.tts,
            embeds: payload.embeds?.map(o => new EmbedBuilder(o).toJSON()),
            allowed_mentions: payload.allowedMentions ? {
                parse: payload.allowedMentions.parse,
                roles: payload.allowedMentions.roles?.map(o => typeof o === "string" ? o : o.id),
                users: payload.allowedMentions.users?.map(o => typeof o === "string" ? o : o.id),
                replied_user: payload.allowedMentions.repliedUser
            } : undefined,
            message_reference: payload.reference ? { message_id: payload.reference.messageId, fail_if_not_exists: payload.reference.failIfNotExists } : undefined,
            components: payload.components?.map(o => new ActionRowBuilder(o).toJSON()),
            sticker_ids: payload.stickers?.map(o => typeof o === "string" ? o : o.id),
            attachments: payload.attachments ?? [],
            flags: payload.flags ? parseInt(MessageFlags.resolve(payload.flags)) : undefined,
            username: payload.username,
            avatar_url: payload.avatar,
            thread_name: payload.threadName,
            applied_tags: Array.isArray(payload.appliedTags) || payload.appliedTags instanceof Collection ? payload.appliedTags?.map(d => typeof d === "string" ? d : d.id) : [payload.appliedTags]
        }
    }

    static resolveModal(modal = {}) {
        return {
            title: modal.title,
            custom_id: modal.customId,
            components: modal.components?.map(o => new ActionRowBuilder(o).toJSON())
        }
    }
}

module.exports = DataPayload