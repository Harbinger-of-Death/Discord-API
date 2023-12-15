const AutoCompleteInteraction = require("../Structures/AutoCompleteInteraction");
const ButtonInteraction = require("../Structures/ButtonInteraction");
const ChatInputCommandInteraction = require("../Structures/ChatInputCommandInteraction");
const CommandInteraction = require("../Structures/CommandInteraction");
const ContextMenuMessageInteraction = require("../Structures/ContextMenuMessageInteraction");
const ContextMenuUserInteraction = require("../Structures/ContextMenuUserInteraction");
const Interaction = require("../Structures/Interaction");
const MessageComponentInteraction = require("../Structures/MessageComponentInteraction");
const ModalSubmitInteraction = require("../Structures/ModalSubmitInteraction");
const SelectMenuInteraction = require("../Structures/SelectMenuInteraction");
const { EventTypes, InteractionTypeEnums, ApplicationCommandTypesEnums, ComponentTypesEnums } = require("../Util/Constants");
const BaseAction = require("./BaseAction");

class InteractionCreate extends BaseAction {
    constructor(client, data) {
        super(client)
        this._patch(data)
    }

    _patch(data) {
        const packet = data.d
        let interaction
        switch(packet.type) {
            case InteractionTypeEnums.ApplicationCommand:
                switch(packet.data?.type) {
                    case ApplicationCommandTypesEnums.ChatInput:
                        interaction = ChatInputCommandInteraction
                        break;
                    case ApplicationCommandTypesEnums.Message:
                        interaction = ContextMenuMessageInteraction
                        break;
                    case ApplicationCommandTypesEnums.User:
                        interaction = ContextMenuUserInteraction
                        break;
                    default:
                        interaction = CommandInteraction
                        break;
                }
                break;
            case InteractionTypeEnums.MessageComponent:
                switch(packet.data?.component_type) {
                    case ComponentTypesEnums.Button:
                        interaction = ButtonInteraction
                        break;
                    case ComponentTypesEnums.ChannelSelect:
                    case ComponentTypesEnums.RoleSelect:
                    case ComponentTypesEnums.StringSelect:
                    case ComponentTypesEnums.UserSelect:
                    case ComponentTypesEnums.MentionableSelect:
                        interaction = SelectMenuInteraction
                        break;
                    default:
                        interaction = MessageComponentInteraction
                        break;
                }
                break;
            case InteractionTypeEnums.ApplicationCommandAutocomplete:
                interaction = AutoCompleteInteraction
                break;
            case InteractionTypeEnums.ModalSubmit:
                interaction = ModalSubmitInteraction
                break;
            default:
                interaction = Interaction
                break;
        }

        interaction = new interaction(packet, packet.guild_id, this.client)
        return this.client.emit(EventTypes.InteractionCreate, interaction)
    }
}

module.exports = InteractionCreate