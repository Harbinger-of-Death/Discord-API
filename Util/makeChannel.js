const StageChannel = require("../Structures/StageChannel");
const TextChannel = require("../Structures/TextChannel");
const ThreadChannel = require("../Structures/ThreadChannel");
const VoiceChannel = require("../Structures/VoiceChannel");
const ForumChannel = require("../Structures/ForumChannel");
const GroupDmChannel = require("../Structures/GroupDMChannel");
const DirectoryChannel = require("../Structures/DirectoryChannel");
const DMChannel = require("../Structures/DMChannel");
const CategoryChannel = require("../Structures/CategoryChannel");
const { ChannelTypesEnums } = require("../Util/Constants");
const NewsChannel = require("../Structures/NewsChannel");
function makeChannel(channels, Holds) {
    let channel
    switch(channels.type) {
        case ChannelTypesEnums.GuildText:
            channel = TextChannel
            break;
        case ChannelTypesEnums.Dm:
            channel = DMChannel
            break;
        case ChannelTypesEnums.GroupDm:
            channel = GroupDmChannel
            break;
        case ChannelTypesEnums.GuildVoice:
            channel = VoiceChannel
            break;
        case ChannelTypesEnums.GuildCategory:
            channel = CategoryChannel
            break;
        case ChannelTypesEnums.GuildAnnouncement:
            channel = NewsChannel
            break;
        case ChannelTypesEnums.AnnouncementThread:
        case ChannelTypesEnums.PublicThread:
        case ChannelTypesEnums.PrivateThread:
            channel = ThreadChannel
            break;
        case ChannelTypesEnums.GuildStageVoice:
            channel = StageChannel
            break;
        case ChannelTypesEnums.GuildDirectory:
            channel = DirectoryChannel
            break;
        case ChannelTypesEnums.GuildForum:
            channel = ForumChannel
            break;
        default:
            channel = Holds
            break;
    }
    return channel
}

module.exports = makeChannel