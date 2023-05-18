module.exports.MessageTypeEnums = {
    Default: 0,
    RecipientAdd: 1,
    RecipientRemove: 2,
    Call: 3,
    ChannelNameChange: 4,
    ChannelIconChange: 5,
    ChannelPinnedMessage: 6,
    UserJoin: 7,
    GuildBoost: 8,
    GuildBoostTier1: 9,
    GuildBoostTier2: 10,
    GuildBoostTier3: 11,
    ChannelFollowAdd: 12,
    GuildDiscoveryDisqualified: 14,
    GuildDiscoveryRequalified: 15,
    GuildDiscoveryGracePeriodInitialWarning: 16,
    GuildDiscoveryGracePeriodFinalWarning: 17,
    ThreadCreated: 18,
    Reply: 19,
    ChatInputCommand: 20,
    ThreadStarterMessage: 21,
    GuildInviteReminder: 22,
    ContextMenuCommand: 23,
    AutoModerationAction: 24,
    RoleSubscriptionPurchase: 25,
    InteractionPremiumUpsell: 26,
    StageStart: 27,
    StageEnd: 28,
    StageSpeaker: 29,
    StageTopic: 31,
    GuildApplicationPremiumSubscription: 32
}

module.exports.ApplicationCommandTypesEnums = {
    ChatInput : 1,
    User : 2,
    Message : 3
}

module.exports.OptionTypesEnums = {
    SubCommand : 1,
    SubCommandGroup : 2,
    String : 3,
    Integer : 4,
    Boolean : 5,
    User : 6,
    Channel : 7,
    Role : 8, 
    Mentionable : 9,
    Number : 10, 
    Attachment : 11
}

module.exports.ChannelTypesEnums = {
    GuildText : 0,
    Dm : 1,
    GuildVoice : 2,
    GroupDm : 3,
    GuildCategory : 4,
    GuildAnnouncement : 5,
    AnnouncementThread : 10,
    PublicThread : 11,
    PrivateThread : 12,
    GuildStageVoice : 13,
    GuildDirectory : 14,
    GuildForum : 15,
}

module.exports.ButtonStylesEnums = {
    Primary : 1,
    Secondary : 2,
    Success : 3,
    Danger : 4,
    Link : 5
}

module.exports.ComponentTypesEnums = {
    ActionRow : 1,
    Button : 2,
    StringSelect : 3,
    InputText : 4,
    UserSelect : 5,
    RoleSelect : 6,
    MentionableSelect : 7,
    ChannelSelect : 8    
}

module.exports.OpCodes = {
    Dispatch : 0,
    Hearbeat : 1,
    Identify : 2,
    PresenceUpdate : 3,
    VoiceStateUpdate : 4,
    Resume : 6,
    Reconnect : 7,
    RequestGuildMembers : 8,
    InvalidSession : 9,
    Hello : 10,
    HeartbeatAck : 11
}

module.exports.VerificationLevelEnums = {
    None : 0,
    Low : 1,
    Medium : 2,
    High : 3,
    VeryHigh : 4
}

module.exports.DefaultMessageNotificationsEnums = {
    AllMessages : 0,
    OnlyMentions : 1
}

module.exports.ExplicitContentFilterEnums = {
    Disabled : 0,
    MembersWithoutRoles : 1,
    AllMembers : 2
}

module.exports.MfaLevelEnums = {
    None : 0,
    Elevated : 1
}

module.exports.NsfwLevelEnums = {
    Default : 0,
    Explicit : 1,
    Safe : 2,
    AgeRestricted : 3
}

module.exports.PremiumTierEnums = {
    None : 0,
    Tier1 : 1,
    Tier2 : 2,
    Tier3 : 3
}

module.exports.PartialsEnums = {
    Channel : 0,
    Message : 1,
    ApplicationCommand : 2
}

module.exports.VideoQualityModeEnums = {
    Auto : 1,
    Full : 2
}

module.exports.EventTypes = {
    Ready : "ready",
    ApplicationCommandPermissionsUpdate : "applicationCommandPermissionsUpdate",
    AutoModerationRuleCreate : "autoModerationRuleCreate",
    AutoModerationRuleUpdate : "autoModerationRuleUpdate",
    AutoModerationRuleDelete : "autoModerationRuleDelete",
    AutoModerationActionExecution : "autoModerationActionExecution",
    ChannelCreate : "channelCreate",
    ChannelUpdate : "channelUpdate",
    ChannelDelete : "channelDelete",
    ChannelPinsUpdate : "channelPinsUpdate",
    ThreadCreate : "threadCreate",
    ThreadUpdate : "threadUpdate",
    ThreadDelete : "threadDelete",
    ThreadListSync : "threadListSync",
    ThreadMemberUpdate : "threadMemberUpdate",
    ThreadMembersUpdate : "threadMembersUpdate",
    GuildCreate : "guildCreate",
    GuildUpdate : "guildUpdate",
    GuildDelete : "guildDelete",
    GuildUnavailable : "guildUnavailable",
    GuildBanAdd : "guildBanAdd",
    GuildBanRemove : "guildBanRemove",
    GuildEmojisUpdate : "guildEmojisUpdate",
    GuildStickersUpdate : "guildStickersUpdate",
    GuildIntegrationsUpdate : "guildIntegrationsUpdate",
    GuildMemberAdd : "guildMemberAdd",
    GuildMemberRemove : "guildMemberRemove",
    GuildMemberUpdate : "guildMemberUpdate",
    GuildMembersChunk : "guildMembersChunk",
    GuildRoleCreate : "guildRoleCreate",
    GuildRoleUpdate : "guildRoleUpdate",
    GuildRoleDelete : "guildRoleDelete",
    GuildScheduledEventCreate : "guildScheduledEventCreate",
    GuildScheduledEventUpdate :  "guildScheduledEventUpdate",
    GuildScheduledEventDelete : "guildScheduledEventDelete",
    GuildScheduledEventUserAdd : "guildScheduledEventUserAdd",
    GuildScheduledEventUserRemove : "guildScheduledEventUserRemove",
    IntegrationCreate : "integrationCreate",
    IntegrationUpdate : "integrationUpdate",
    IntegrationDelete : "integrationDelete",
    InteractionCreate : "interactionCreate",
    InviteCreate : "inviteCreate",
    InviteDelete : "inviteDelete",
    MessageCreate : "messageCreate",
    MessageUpdate : "messageUpdate",
    MessageDelete : "messageDelete",
    MessageDeleteBulk : "messageDeleteBulk",
    MessageReactionAdd : "messageReactionAdd",
    MessageReactionRemove : "messageReactionRemove",
    MessageReactionRemoveAll : "messageReactionRemoveAll",
    MessageReactionRemoveEmoji : "messageReactionRemoveEmoji",
    PresenceUpdate : "presenceUpdate",
    StageInstanceCreate : "stageInstanceCreate",
    StageInstanceUpdate : "stageInstanceUpdate",
    StageInstanceDelete : "stageInstanceDelete",
    TypingStart : "typingStart",
    UserUpdate : "userUpdate",
    VoiceStateUpdate : "voiceStateUpdate",
    VoiceServerUpdate : "voiceServerUpdate",
    WebhooksUpdate : "webhooksUpdate",
    Debug : "debug",
    StickersCreate : "stickersCreate",
    StickersUpdate : "stickersUpdate",
    StickersDelete : "stickersDelete",
    ThreadMemberAdd : "threadMemberAdd",
    ThreadMemberRemove : "threadMemberRemove",
    EmojiCreate : "emojiCreate",
    EmojiUpdate : "emojiUpdate",
    EmojiDelete : "emojiDelete",
    Ratelimit: "ratelimit",
    GuildAuditLogEntryCreate: "guildAuditLogEntryCreate"
}

module.exports.WsCloseCodes = {
    UnknownError: 4000,
    UnknownOpcode: 4001,
    DecodeError: 4002,
    NotAuthenticated: 4003,
    AuthenticationFailed: 4004,
    AlreadyAuthenticated: 4005,
    InvalidSeq: 4007,
    RateLimited: 4008,
    SessionTimedOut: 4009,
    InvalidShard: 4010,
    ShardingRequired: 4011,
    InvalidApiVersion: 4012,
    InvalidIntents: 4013,
    DisallowedIntents: 4014
}

module.exports.WSEventCodes = {
    Close: "close",
    Error: "error",
    Message: "message",
    Open: "open",
    Ping: "ping",
    Pong: "pong",
    UnexpectedResponse: "unexpected-response",
    Upgrade: "upgrade"
}

module.exports.WsReadyStateCodes = {
    Connecting: 0,
    Open: 1,
    Closing: 2,
    Closed: 3
}

module.exports.InviteTargetTypesEnums = {
    Stream: 1,
    EmbeddedApplication: 2,
    RoleSubscriptionsPurchase: 3
}

module.exports.GuildScheduledEventPrivacyEnums = {
    GuildOnly: 2
}

module.exports.GuildScheduledEventEntityEnums = {
    StageInstance: 1,
    Voice: 2,
    External: 3
}

module.exports.GuildScheduledEventStatusEnums = {
    Scheduled: 1,
    Active: 2,
    Completed: 3,
    Canceled: 4
}

module.exports.StageInstancePrivacyLevelEnums = {
    Public: 1,
    GuildOnly: 2
}

module.exports.TeamMemberMembershipStateEnums = {
    Invited: 1,
    Accepted: 2
}

module.exports.ApplicationCommandPermissionTypeEnums = {
    Role: 1,
    User: 2,
    Channel: 3
}

module.exports.InteractionTypeEnums = {
    Ping: 1,
    ApplicationCommand: 2,
    MessageComponent: 3,
    ApplicationCommandAutocomplete: 4,
    ModalSubmit: 5
}

module.exports.ForumChannelDefaultSortOrderTypeEnums = {
    LatestActivity: 0,
    CreationDate: 1
}


module.exports.InteractionResponsesEnums = {
    Pong: 1,
    ChannelMessageWithSource: 4,
    DeferredChannelMessageWithSource: 5,
    DeferredUpdateMessage: 6,
    UpdateMessage: 7,
    ApplicationCommandAutocompleteResult: 8,
    Modal: 9
}

module.exports.InputTextStyleEnums = {
    Short: 1,
    Paragraph: 2
}

module.exports.OverwriteTypeEnums = {
    Role: 0,
    Member: 1
}

module.exports.PremiumType = {
    None: 0,
    NitroClassic: 1,
    Nitro: 2,
    NitroBasic: 3
}

module.exports.AuditLogEventEnums = {
    GuildUpdate: 1,
    ChannelCreate: 10,
    ChannelUpdate: 11,
    ChannelDelete: 12,
    ChannelOverwriteCreate: 13,
    ChannelOverwriteUpdate: 14,
    ChannelOverwriteDelete: 15,
    MemberKick: 20,
    MemberPrune: 21,
    MemberBanAdd: 22,
    MemberBanRemove: 23,
    MemberUpdate: 24,
    MemberRoleUpdate: 25,
    MemberMove: 26,
    MemberDisconnect: 27,
    BotAdd: 28,
    RoleCreate: 30,
    RoleUpdate: 31,
    RoleDelete: 32,
    InviteCreate: 40,
    InviteUpdate: 41,
    InviteDelete: 42,
    WebhookCreate: 50,
    WebhookUpdate: 51,
    WebhookDelete: 52,
    EmojiCreate: 60,
    EmojiUpdate: 61,
    EmojiDelete: 62,
    MessageDelete: 72,
    MessageBulkDelete: 73,
    MessagePin: 74,
    MessageUnpin: 75,
    IntegrationCreate: 80,
    IntegrationUpdate: 81,
    IntegrationDelete: 82,
    StageInstanceCreate: 83,
    StageInstanceUpdate: 84,
    StageInstanceDelete: 85,
    StickerCreate: 90,
    StickerUpdate: 91,
    StickerDelete: 92,
    GuildScheduledEventCreate: 100,
    GuildScheduledEventUpdate: 101,
    GuildScheduledEventDelete: 102,
    ThreadCreate: 110,
    ThreadUpdate: 111,
    ThreadDelete: 112,
    ApplicationCommandPermissionUpdate: 121,
    AutoModerationRuleCreate: 140,
    AutoModerationRuleUpdate: 141,
    AutoModerationRuleDelete: 142,
    AutoModerationBlockMessage: 143,
    AutoModerationFlagToChannel: 144,
    AutoModerationUserCommunicationDisabled: 145,
    CreatorMonetizationRequestCreated: 150,
    CreatorMonetizationTermsAccepted: 151,
}

module.exports.AuditLogEventUpdate = [
    this.AuditLogEventEnums.ApplicationCommandPermissionUpdate,
    this.AuditLogEventEnums.AutoModerationRuleUpdate,
    this.AuditLogEventEnums.GuildUpdate,
    this.AuditLogEventEnums.ChannelUpdate,
    this.AuditLogEventEnums.ChannelOverwriteUpdate,
    this.AuditLogEventEnums.MemberUpdate,
    this.AuditLogEventEnums.MemberRoleUpdate,
    this.AuditLogEventEnums.RoleUpdate,
    this.AuditLogEventEnums.InviteUpdate,
    this.AuditLogEventEnums.WebhookUpdate,
    this.AuditLogEventEnums.EmojiUpdate,
    this.AuditLogEventEnums.IntegrationUpdate,
    this.AuditLogEventEnums.StageInstanceUpdate,
    this.AuditLogEventEnums.GuildScheduledEventUpdate,
    this.AuditLogEventEnums.StickerUpdate,
    this.AuditLogEventEnums.ThreadUpdate,
    this.AuditLogEventEnums.AutoModerationRuleUpdate
]

module.exports.AutoModerationEventTypesEnums = {
    MessageSend: 1
}

module.exports.AutoModerationTriggerTypesEnums = {
    Keyword: 1,
    Spam: 3,
    KeywordPreset: 4,
    MentionSpam: 5
}

module.exports.AutoModerationKeywordPresetTypesEnums = {
    Profanity: 1,
    SexualContent: 2,
    Slurs: 3
}

module.exports.AutoModerationActionTypesEnums = {
    BlockMessage: 1,
    SendAlertMessage: 2,
    Timeout: 3
}

module.exports.GuildFeaturesEnums = {
    AnimatedBanner: "ANIMATED_BANNER",
    AnimatedIcon: "ANIMATED_ICON",
    AutoModeration: "AUTO_MODERATION",
    Banner: "BANNER",
    Community: "COMMUNITY",
    DeveloperSupportServer: "DEVELOPER_SUPPORT_SERVER",
    Discoverable: "DISCOVERABLE",
    Featurable: "FEATURABLE",
    InvitesDisabled: "INVITES_DISABLED",
    InviteSplash: "INVITE_SPLASH",
    MemberVerificationGateEnabled: "MEMBER_VERIFICATION_GATE_ENABLED",
    MonetizationEnabled: "MONETIZATION_ENABLED",
    MoreStickers: "MORE_STICKERS",
    News: "NEWS",
    Partnered: "PARTNERED",
    PreviewEnabled: "PREVIEW_ENABLED",
    RoleIcons: "ROLE_ICONS",
    TicketsEventsDisabled: "TICKETED_EVENTS_ENABLED",
    VanityUrl: "VANITY_URL",
    Verified: "VERIFIED",
    VipRegions: "VIP_REGIONS",
    WelcomeScreenEnabled: "WELCOME_SCREEN_ENABLED",
    ApplicationCommandPermissionsV2: "APPLICATION_COMMAND_PERMISSIONS_V2",
    RoleSubscriptionsAvailableForPurchase: "ROLE_SUBSCRIPTIONS_AVAILABLE_FOR_PURCHASE",
    RoleSubscriptionsEnabled: "ROLE_SUBSCRIPTIONS_ENABLED",
    RaidAlertsEnabled: "RAID_ALERTS_ENABLED",
}

module.exports.ImageFileTypes = {
    Png: ".png",
    Jpg: ".jpg",
    Jpeg: ".jpeg",
    Webp: ".webp",
    Gif: ".gif"
}

module.exports.ActivityTypesEnums = {
    Game: 0,
    Streaming: 1,
    Listening: 2,
    Watching: 3,
    Custom: 4,
    Competing: 5
}

module.exports.MessageActivityTypesEnums = {
    Join: 1,
    Spectate: 2,
    Listen: 3,
    JoinRequest: 5
}

module.exports.ConnectionVisibility = {
    None: 0,
    Everyone: 1
}

module.exports.cdnRoot = `https://cdn.discordapp.com`

module.exports.SnowflakeRegex = /^\d{17,19}/

module.exports.NonSystemMessageTypes = [
    this.MessageTypeEnums.Default,
    this.MessageTypeEnums.Reply,
    this.MessageTypeEnums.ChatInputCommand,
    this.MessageTypeEnums.ContextMenuCommand
]

module.exports.RepliableMessageTypes = [
    this.MessageTypeEnums.Default,
    this.MessageTypeEnums.UserJoin,
    this.MessageTypeEnums.Reply,
    this.MessageTypeEnums.ChatInputCommand,
    this.MessageTypeEnums.ContextMenuCommand,
    this.MessageTypeEnums.AutoModerationAction,
]

module.exports.CdnEndPoints = {
    GuildIcon: (icon, extension = ".png", size = 64, forceStatic = false, guildId) => {
        if(icon.startsWith("a_") && !forceStatic) extension = ".gif"
        return `${this.cdnRoot}/icons/${guildId}/${icon}${extension}${size ? `?size=${size}` : ""}`
    },
    GuildSplash: (splash, extension = ".png", size = 64, guildId) => {
        return `${this.cdnRoot}/splashes/${guildId}/${splash}${extension}${size ? `?size=${size}` : ""}`
    },
    GuildDiscoverySplash: (discoverySplash, extension = ".png", size = 64, guildId) => {
        return `${this.cdnRoot}/discovery-splashes/${guildId}/${discoverySplash}${extension}${size ? `?size=${size}` : ""}`
    },
    GuildBanner: (banner, extension = ".png", size = 64, forceStatic = false, guildId) => {
        if(banner.startsWith("a_") && !forceStatic) extension = ".gif"
        return `${this.cdnRoot}/banners/${guildId}/${banner}${extension}${size ? `?size=${size}` : ""}`
    },
    GuildRoleIcon: (icon, extension = ".png", size = 64, roleId) => {
        return `${this.cdnRoot}/role-icons/${roleId}/${icon}${extension}${size ? `?size=${size}` : ""}`
    },
    GuildMemberAvatar: (avatar, extension = ".png", size = 64, forceStatic = false, guildId, userId) => {
        if(avatar.startsWith("a_") && !forceStatic) extension = ".gif"
        return `${this.cdnRoot}/guilds/${guildId}/users/${userId}/avatars/${avatar}${extension}${size ? `?size=${size}` : ""}`
    },
    UserAvatar: (avatar, extension = ".png", size = 64, forceStatic = false, userId) => {
        if(avatar.startsWith("a_") && !forceStatic) extension = ".gif"
        return `${this.cdnRoot}/avatars/${userId}/${avatar}${extension}${size ? `?size=${size}` : ""}`
    },
    DefaultUserAvatar: (discriminator, extension = ".png") => {
        return `${this.cdnRoot}/embed/avatars/${discriminator % 5}${extension}`
    },
    UserBanner: (banner, extension = ".png", size = 64, forceStatic = false, userId) => {
        if(banner.startsWith("a_") && !forceStatic) extension = ".gif"
        return `${this.cdnRoot}/banners/${userId}/${banner}${extension}${size ? `?size=${size}` : ""}`
    },
    GuildScheduledEventCover: (cover, extension = ".png", size = 64, scheduledEventId) => {
        return `${this.cdnRoot}/guild-events/${scheduledEventId}/${cover}${extension}${size ? `?size=${size}` : ""}`
    },
    StickerPackBanner: (assetId, extension = ".png", size = 64) => {
        return `${this.cdnRoot}/app-assets/710982414301790216/store/${assetId}${extension}${size ? `?size=${size}` : ""}`
    },
    ApplicationIcon: (icon, extension = ".png", size = 64, applicationId) => {
        return `${this.cdnRoot}/app-icons/${applicationId}/${icon}${extension}${size ? `?size=${size}` : ""}`
    },
    ApplicationCover: (cover, extension = ".png", size = 64, applicationId) => {
        return `${this.cdnRoot}/app-icons/${applicationId}/${cover}${extension}${size ? `?size=${size}` : ""}`
    },
    EmojiImage: (emoji, extension = ".png", size = 64, forceStatic = false) => {
        if(emoji.animated && !forceStatic) extension = ".gif"
        return `${this.cdnRoot}/emojis/${emoji.id}${extension}${size ? `?size=${size}` : ""}`
    },
    StickerImage: (stickerId, extension = ".png") => {
        return `${this.cdnRoot}/stickers/${stickerId}${extension}`
    },
    GuildMemberBanner: (banner, extension = ".png", size = 64, forceStatic = false, guildId, userId) => {
        if(banner.startsWith("a_") && !forceStatic) extension = ".gif"
        return `${this.cdnRoot}/guilds/${guildId}/users/${userId}/banners/${banner}${extension}${size ? `?size=${size}` : ""}`
    },
    TeamIcon: (icon, extension = ".png", size = 64, teamId) => {
        return `${this.cdnRoot}/team-icons/${teamId}/${icon}${extension}${size ? `?size=${size}` : ""}`
    },
    ApplicationAsset: (asset, extension = ".png", size = 64, applicationId) => {
        return `${this.cdnRoot}/app-assets/${applicationId}/${asset}${extension}${size ? `?size=${size}` : ""}`
    }
}

module.exports.WebsocketEvents = {
    Ready: 'READY',
    Hello: "HELLO",
    Resumed: "RESUMED",
    Reconnect: "RECONNECT",
    InvalidSession: "INVALID_SESSION",
    ApplicationCommandPermissionsUpdate: 'APPLICATION_COMMAND_PERMISSIONS_UPDATE',
    AutoModerationRuleCreate: 'AUTO_MODERATION_RULE_CREATE',
    AutoModerationRuleUpdate: 'AUTO_MODERATION_RULE_UPDATE',
    AutoModerationRuleDelete: 'AUTO_MODERATION_RULE_DELETE',
    AutoModerationActionExecution: 'AUTO_MODERATION_ACTION_EXECUTION',
    ChannelCreate: 'CHANNEL_CREATE',
    ChannelUpdate: 'CHANNEL_UPDATE',
    ChannelDelete: 'CHANNEL_DELETE',
    ChannelPinsUpdate: 'CHANNEL_PINS_UPDATE',
    ThreadCreate: 'THREAD_CREATE',
    ThreadUpdate: 'THREAD_UPDATE',
    ThreadDelete: 'THREAD_DELETE',
    ThreadListSync: 'THREAD_LIST_SYNC',
    ThreadMemberUpdate: 'THREAD_MEMBER_UPDATE',
    ThreadMembersUpdate: 'THREAD_MEMBERS_UPDATE',
    GuildCreate: 'GUILD_CREATE',
    GuildUpdate: 'GUILD_UPDATE',
    GuildDelete: 'GUILD_DELETE',
    GuildUnavailable: 'GUILD_UNAVAILABLE',
    GuildBanAdd: 'GUILD_BAN_ADD',
    GuildBanRemove: 'GUILD_BAN_REMOVE',
    GuildEmojisUpdate: 'GUILD_EMOJIS_UPDATE',
    GuildStickersUpdate: 'GUILD_STICKERS_UPDATE',
    GuildIntegrationsUpdate: 'GUILD_INTEGRATIONS_UPDATE',
    GuildMemberAdd: 'GUILD_MEMBER_ADD',
    GuildMemberRemove: 'GUILD_MEMBER_REMOVE',
    GuildMemberUpdate: 'GUILD_MEMBER_UPDATE',
    GuildMembersChunk: 'GUILD_MEMBERS_CHUNK',
    GuildRoleCreate: 'GUILD_ROLE_CREATE',
    GuildRoleUpdate: 'GUILD_ROLE_UPDATE',
    GuildRoleDelete: 'GUILD_ROLE_DELETE',
    GuildScheduledEventCreate: 'GUILD_SCHEDULED_EVENT_CREATE',
    GuildScheduledEventUpdate: 'GUILD_SCHEDULED_EVENT_UPDATE',
    GuildScheduledEventDelete: 'GUILD_SCHEDULED_EVENT_DELETE',
    GuildScheduledEventUserAdd: 'GUILD_SCHEDULED_EVENT_USER_ADD',
    GuildScheduledEventUserRemove: 'GUILD_SCHEDULED_EVENT_USER_REMOVE',
    IntegrationCreate: 'INTEGRATION_CREATE',
    IntegrationUpdate: 'INTEGRATION_UPDATE',
    IntegrationDelete: 'INTEGRATION_DELETE',
    InteractionCreate: 'INTERACTION_CREATE',
    InviteCreate: 'INVITE_CREATE',
    InviteDelete: 'INVITE_DELETE',
    MessageCreate: 'MESSAGE_CREATE',
    MessageUpdate: 'MESSAGE_UPDATE',
    MessageDelete: 'MESSAGE_DELETE',
    MessageDeleteBulk: 'MESSAGE_DELETE_BULK',
    MessageReactionAdd: 'MESSAGE_REACTION_ADD',
    MessageReactionRemove: 'MESSAGE_REACTION_REMOVE',
    MessageReactionRemoveAll: 'MESSAGE_REACTION_REMOVE_ALL',
    MessageReactionRemoveEmoji: 'MESSAGE_REACTION_REMOVE_EMOJI',
    PresenceUpdate: 'PRESENCE_UPDATE',
    StageInstanceCreate: 'STAGE_INSTANCE_CREATE',
    StageInstanceUpdate: 'STAGE_INSTANCE_UPDATE',
    StageInstanceDelete: 'STAGE_INSTANCE_DELETE',
    TypingStart: 'TYPING_START',
    UserUpdate: 'USER_UPDATE',
    VoiceStateUpdate: 'VOICE_STATE_UPDATE',
    VoiceServerUpdate: 'VOICE_SERVER_UPDATE',
    WebhooksUpdate: 'WEBHOOKS_UPDATE',
    Debug: 'DEBUG',
    StickersCreate: 'STICKERS_CREATE',
    StickersUpdate: 'STICKERS_UPDATE',
    StickersDelete: 'STICKERS_DELETE',
    ThreadMemberAdd: 'THREAD_MEMBER_ADD',
    ThreadMemberRemove: 'THREAD_MEMBER_REMOVE',
    EmojiCreate: 'EMOJI_CREATE',
    EmojiUpdate: 'EMOJI_UPDATE',
    EmojiDelete: 'EMOJI_DELETE',
    GuildAuditLogEntryCreate: "GUILD_AUDIT_LOG_ENTRY_CREATE"
}

module.exports.WebsocketStatus = {
    Ready: "READY",
    Closing: "CLOSING",
    Closed: "CLOSED",
    Reconnecting: "RECONNECTING"
}

module.exports.ForumLayoutTypesEnums = {
    NotSet: 0,
    ListView: 1,
    GalleryView: 2
}

module.exports.ApplicationRoleConnectionMetadataTypeEnums = {
    IntegerLessThanOrEqual: 1,
    IntegerGreaterThanOrEqual: 2,
    IntegerEqual: 3,
    IntegerNotEqual: 4,
    DatetimeLessThanOrEqual: 5,
    DatetimeGreaterThanOrEqual: 6,
    BooleanEqual: 7,
    BooleanNotEqual: 8
}

module.exports.CollectorEventTypes = {
    Collect: "collect",
    End: "end",
    Dispose: "dispose",
    Remove: "remove"
}