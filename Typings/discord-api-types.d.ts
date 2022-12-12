import { ActionRowBuilder, ApplicationCommand, ApplicationCommandPermission, Attachment, AttachmentBuilder, AuditLogEntry, AutoModeration, AutoModerationRuleAction, BaseGuildTextChannel, BaseInteraction, ButtonBuilder, Channel, ChannelTypesEnums, Collection, DMChannel, EmbedBuilder, Emoji, ForumTags, Guild, GuildBan, GuildChannel, GuildIntegration, GuildMember, GuildScheduledEvent, GuildScheduledEventUser, GuildTemplate, InputTextBuilder, Interaction, Invite, Message, MessageReaction, OpCodes, Permissions, Presence, Role, SelectMenuBuilder, StageInstance, Sticker, ThreadChannel, ThreadMember, User, VoiceChannel, VoiceState } from ".."

export interface Choices {
    /**
     * The name of this choice
     */
    name: string
    /**
     * The name localizations of this choice
     */
    nameLocalizations: Record<Locales, string>
    /**
     * The value of this choice
     */
    value: string | number
}

export interface ComponentEmoji {
    /**
     * The name of this Emoji
     */
    name?: string
    /**
     * The id of this Emoji
     */
    id: string
    /**
     * Whether or not this Emoji is animated
     */
    animated?: boolean
}

export interface SelectMenuOptions {
    /**
     * The label of this option
     */
    label: string
    /**
     * The value of this option
     */
    value: string
    /**
     * The description of this option
     */
    description: string
    /**
     * The emoji of this option
     */
    emoji: EmojiIdentifierResolvable
    /**
     * Whether or not this option is select by default
     */
    default: boolean
}

export interface EmbedAuthor {
    /**
     * The name of this author
     */
    name: string
    /**
     * The icon url of this author
     */
    iconURL: string
    /**
     * The url of this author
     */
    url: string
    /**
     * The proxied icon url of this author
     */
    proxyiconURL: string
}

export interface EmbedImage {
    /**
     * The url of this image
     */
    url: string
    /**
     * The proxied url of this image
     */
    proxyURL: string
    /**
     * The height of this image
     */
    height: number
    /**
     * The width of this image
     */
    width: number
}


export interface EmbedThumbnail {
    /**
     * The url of this thumbnail
     */
    url: string
    /**
     * The proxied url of this thumbnail
     */
    proxyURL: string
    /**
     * The height of this thumbnail
     */
    height: number
    /**
     * The width of this thumbnail
     */
    width: number
}

export interface EmbedFooter {
    /**
     * The text of this footer
     */
    text: string
    /**
     * The icon url of this footer
     */
    iconURL: string
    /**
     * The proxied icon url of this footer
     */
    proxyiconURL: string
}

export interface EmbedFields {
    /**
     * The name of this field
     */
    name: string
    /**
     * The value of this field
     */
    value: string
    /**
     * Whether or not this field is inline with others
     */
    inline: boolean
}

export interface HTTPOptions {
    /**
     * The method to use for this request
     */
    method: RESTMethod
    /**
     * The headers to use for this request
     */
    headers: Headers
    /**
     * The form body of this request
     */
    body: FormData | string
    /**
     * The query of this request
     */
    query: {}
    /**
     * The authorization of this REST
     */
    authorization?: string
    /**
     * The type of authorization token
     */
    tokenType?: `Bearer` | `Bot`
}

export interface Headers {
    /**
     * The authorization header. Used for making requests with your bot
     */
    authorization: string
    /**
     * The content type of this request
     */
    "content-type": ContentType
}

export interface ClientOptions {
    /**
     * The token of this Client
     */
    token: string
    /**
     * The intents of this Client
     */
    intents: IntentsResolvable[] | IntentsResolvable
    /**
     * The API version to use
     */
    version?: number
    /**
     * The encoding to use
     */
    encoding?: "json"
    /**
     * Partials for this Client to use
     */
    partials?: Partials[]
    /**
     * Time to wait before cancelling the REST request
     */
    restRequestTimeout?: number
    /**
     * Time to wait for everything to be cached before emitting READY event
     */
    restReadyTimeout?: number
    /**
     * The Presence of this Client
     */
    presence?: CreateClientPresence
}

export interface ClientEvents {
    ready: []
    debug: [data: string]
    guildCreate: [guild: Guild]
    guildUpdate: [oldGuild: Guild, newGuild: Guild]
    guildDelete: [guild: Guild]
    channelCreate: [channel: GuildChannel]
    channelUpdate: [oldChannel: Channel | void, newChannel: Channel]
    channelDelete: [channel: Channel | void]
    guildMemberAdd: [member: GuildMember]
    guildMemberUpdate: [oldMember: GuildMember | void, newMember: GuildMember]
    guildMemberRemove: [member: GuildMember]
    guildBanAdd: [guildBan: GuildBan]
    guildBanRemove: [guildBan: GuildBan | void]
    guildRoleCreate: [role: Role]
    guildRoleUpdate: [oldRole: Role | void, newRole: Role]
    guildRoleDelete: [role: Role | void]
    guildIntegrationsUpdate: [guild: Guild]
    integrationCreate: [integration: GuildIntegration]
    integrationUpdate: [oldIntegration: GuildIntegration | void, newIntegration: GuildIntegration]
    integrationDelete: [integration: GuildIntegration]
    voiceStateUpdate: [oldState: VoiceState | void, newState: VoiceState]
    guildScheduledEventCreate: [scheduledEvent: GuildScheduledEvent]
    guildScheduledEventUpdate: [oldScheduledEvent: GuildScheduledEvent | void, newScheduledEvent: GuildScheduledEvent]
    guildScheduledEventDelete: [scheduledEvent: GuildScheduledEvent]
    guildScheduledEventUserAdd: [guildScheduledEventUser: GuildScheduledEventUser]
    guildScheduledEventUserRemove: [guildScheduledEventRemove: GuildScheduledEventUser]
    inviteCreate: [invite: Invite]
    inviteDelete: [invite: Invite]
    stageInstanceCreate: [stageInstance: StageInstance]
    stageInstanceUpdate: [oldStageInstance: StageInstance | void, newStageInstance: StageInstance]
    stageInstanceDelete: [stageInstance: StageInstance]
    stickersCreate: [sticker: Sticker]
    stickersUpdate: [oldSticker: Sticker | void, newSticker: Sticker]
    stickersDelete: [sticker: Sticker]
    messageCreate: [message: Message]
    messageUpdate: [oldMessage: Message | void, newMessage: Message]
    messageDelete: [Message: Message]
    interactionCreate: [interaction: BaseInteraction | Interaction]
    messageReactionAdd: [reaction: MessageReaction, user: GuildMember | User]
    messageReactionRemove: [reaction: MessageReaction, user: User]
    messageReactionRemoveAll: [message: Message]
    messageDeleteBulk: [messages: Collection<string, Message>]
    channelPinsUpdate: [channel: BaseGuildTextChannel | ThreadChannel | DMChannel]
    emojiCreate: [emoji: Emoji]
    emojiUpdate: [oldEmoji: Emoji, newEmoji: Emoji]
    emojiDelete: [emoji: Emoji]
    applicationCommandPermissionsUpdate: [oldPermission: ApplicationCommandPermission | void, newPermission: ApplicationCommandPermission]
    autoModerationRuleCreate: [rule: AutoModeration]
    autoModerationRuleUpdate: [oldRule: AutoModeration | void, newRule: AutoModeration]
    autoModerationRuleDelete: [rule: AutoModeration]
    autoModerationActionExecution: [action: AutoModerationRuleAction]
    presenceUpdate: [presence: Presence]
    threadMemberUpdate: [oldMember: ThreadMember, newMember: ThreadMember]
    userUpdate: [oldUser: User, newUser: User]
    messageReactionRemoveEmoji: [reaction: MessageReaction]
    ratelimit: [ratelimit: RateLimitData]
    guildMembersChunk: [data: {}]
}


export interface SnowflakeData {
    /**
     * The Date generated from this Snowflake
     */
    createdAt: Date,
    /**
     * The worker id generated from this Snowflake
     */
    workerId: bigint
    /**
     * The process id generated from this Snowflake
     */
    processId: bigint
    /**
     * The increment
     */
    increment: bigint
}

export interface BaseFetchOptions {
    /**
     * Whether or not to cache this request
     */
    cache?: boolean
    /**
     * Whether or not to skip cache check
     */
    force?: boolean
}

export interface GuildFetchOptions extends BaseFetchOptions {
    /**
     * When true, will return approximate member and presence counts for the guild
     */
    withCounts?: boolean
    /**
     * Get Guilds after this Snowflake
     */
    after?: GuildResolvable
    /**
     * Get Guilds before this Snowflake
     */
    before?: GuildResolvable
    /**
     * The limit of Guilds to fetch
     */
    limit?: number
}

export interface BaseOptions {
    /**
     * The reason for this
     */
    reason?: string
}

export interface GuildCreateData extends BaseOptions {
    /**
     * The name of this Guild
     */
    name: string
    /**
     * The icon of this Guild
     */
    icon?: BufferResolvable
    /**
     * The Verification Level of this Guild
     */
    verificationLevel?: number
    /**
     * The Default Message Notifications Level of this Guild
     */
    defaultMessageNotifications?: number
    /**
     * The Explicit Content Filter Level of this Guild
     */
    explicitContentFilter?: number
    /**
     * The roles to create
     */
    roles?: string[]
    /**
     * The channels to create
     */
    channels?: PartialChannelData[]
    /**
     * The Afk Channel of this Guild
     */
    afkChannel?: string
    /**
     * The afk timeout of this Guild
     */
    afkTimeout?: number
    /**
     * The System Channel of this Guild
     */
    systemChannel?: string
    /**
     * The System Chanenl Flags of this Guild
     */
    systemChannelFlags?: SystemChannelFlagsResolvable
    /**
     * The id of the User to transfer ownership of this Guild to
     */
    owner?: UserResolvable
    /**
     * The Splash of this Guild
     */
    splash?: BufferResolvable
    /**
     * The Discovery Splash of this Guild
     */
    discoverySplash?: BufferResolvable
    /**
     * The Banner of this Guild
     */
    banner?: BufferResolvable
    /**
     * The Rule Channel of this Guild
     */
    rulesChannel?: string
    /**
     * The Public Updates Channel of this Guild
     */
    publicUpdatesChannel?: string
    /**
     * The Preferred Locale of this Guild
     */
    preferredLocale?: string
    /**
     * The Features of this Guild
     */
    features?: Array<Extract<GuildFeatures, "InvitesDisabled" | "Community" | "Discoverable" | "RaidAlertsEnabled">>
    /**
     * THe Description of this Guild
     */
    description?: string
    /**
     * Whether or not to enable the Premium Progress Bar of this Guild
     */
    premiumProgressBar?: boolean
    /**
     * The Channel where to send Raid Alerts to
     */
    safetyAlertsChannel?: ChannelResolvable
}

export interface PartialChannelData {
    /**
     * The type of this Channel
     */
    type?: number
    /**
     * The id of this Channel
     */
    channel?: string | number
    /**
     * The name of this Channel
     */
    name?: string
    /**
     * The parent of this Channel
     */
    parent?: string | number
    /**
     * The topic of this Channel
     */
    topic?: string
    /**
     * Whether or not this Channel is nsfw
     */
    nsfw?: boolean
    /**
     * The birate of this Voice Channel
     */
    bitrate?: number
    /**
     * The user limit of this Voice Channel
     */
    userLimit?: number
    /**
     * The rtc region of this Voice Channel
     */
    rtcRegion?: string
}

export interface PartialGuildData {
    /**
     * The id of this Guild
     */
    id: string
    /**
     * The name of this Guild
     */
    name: string
    /**
     * The icon of this Guild
     */
    icon: string
}


export interface CreateChannelData extends BaseOptions {
    /**
     * The type of this Channel
     */
    type?: number
    /**
     * The name of this Channel
     */
    name: string
    /**
     * The parent of this Channel
     */
    parent?: string | number
    /**
     * The topic of this Channel
     */
    topic?: string
    /**
     * Whether or not this Channel is nsfw
     */
    nsfw?: boolean
    /**
     * The birate of this Voice Channel
     */
    bitrate?: number
    /**
     * The user limit of this Voice Channel
     */
    userLimit?: number
    /**
     * The rtc region of this Voice Channel
     */
    rtcRegion?: string
    /**
     * The Video Quality Mode of this Voice Channel
     */
    videoQualityMode?: number
    /**
     * The Default Auto Archive Duration of this Channel
     */
    defaultAutoArchiveDuration?: number
    /**
     * The position of this Channel
     */
    position?: number
    /**
     * The Rate Limit Per User of this Channel
     */
    rateLimitPerUser?: number
    /**
     * The Overwrites of this Channel
     */
    permissionOverwrites?: PermissionOverwritesData[]
    /**
     * Emoji to show in the add Reaction button on a Thread in a Forum Channel
     */
    defaultReactionEmoji?: EmojiResolvable
    /**
     * Set of Tags that can be used in Forum Channel
     */
    availableTags?: ForumTags[]
    /**
     * The default sort order type used to order posts in this Forum Channel
     */
    defaultSortOrder?: number
    /**
     * Sets the applied tags for this Thread Channel in a Forum Channel
     */
    appliedTags?: ForumTagResolvable[]
}

export interface CreateThreadData extends BaseOptions {
    /**
     * The name of this Thread
     */
    name: string
    /**
     * Whether or not this Thread is archived
     */
    archived?: boolean
    /**
     * The Auto Archive Duration of this Thread
     */
    autoArchiveDuration?: number
    /**
     * Whether or not to lock this Thread
     */
    locked?: boolean
    /**
     * Whether or not non moderators can invite people to this Thread
     */
    invitable?: boolean
    /**
     * The flags of this Thread
     */
    flags?: ChannelFlagsResolvable
    /**
     * The rate limit per user of this Thread
     */
    rateLimitPerUser?: number
    /**
     * The type of this Thread
     */
    type?: ChannelTypesEnums
}

export interface PermissionOverwritesData {
    /**
     * The id of the Role or User
     */
    id: UserResolvable
    /**
     * The type of this Overwrite
     */
    type: number
    /**
     * The allowed Permissions of this Overwrite
     */
    allow: PermissionFlagsResolvable | PermissionFlagsResolvable[]
    /**
     * The denied Permissions of this Overwrite
     */
    deny: PermissionFlagsResolvable | PermissionFlagsResolvable[]
}

export interface ModifyChannelPositionData {
    /**
     * The Channel to modify position of 
     */
    channel: ChannelResolvable
    /**
     * The new position of this Channel
     */
    position: number
    /**
     * Whether or not to sync the Permissions of this Channel to its parent
     */
    lockPermissions?: boolean
    /**
     * The new parent of this Channel
     */
    parent?: ChannelResolvable
}

export interface CreateInviteData extends BaseOptions {
    /**
     * The max age this Invite has
     */
    maxAge?: number
    /**
     * The max uses this Invite can be use
     */
    maxUses?: number
    /**
     * Whether or not this Invite grants temporary membership
     */
    temporary?: boolean
    /**
     * Whether or not this Invite is unique
     */
    unique?: boolean
    /**
     * The Target Type of this Invite
     */
    targetType?: number
    /**
     * The Target User of this Invite
     */
    targetUser?: UserResolvable
    /**
     * The Target Application of this Invite
     */
    targetApplication?: string
}

export interface CdnEndpoints {
    /**
     * Forms a Guild icon url
     */
    GuildIcon: (icon: string, extension: ImageFormatWithoutLottie, size: number, guildId: string) => string
    /**
     * Forms a Guild splash url
     */
    GuildSplash: (splash: string, extension: ImageFormatWithoutLottieAnimate, size: number, guildId: string) => string
    /**
     * Forms a Guild discovery splash url
     */
    GuildDiscoverySplash: (discoverySplash: string, extension: ImageFormatWithoutLottieAnimate, size: number, guildId: string) => string
    /**
     * Forms a Guild banner url
     */
    GuildBanner: (banner: string, extension: ImageFormatWithoutLottie, size: number, guildId: string) => string
    /**
     * Forms a Role icon url
     */
    GuildRoleIcon: (icon: string, extension: ImageFormatWithoutLottieAnimate, size: number, roleId: string) => string
    /**
     * Forms a GuildMember avatar url
     */
    GuildMemberAvatar: (avatar: string, extension: ImageFormatWithoutLottie, size: number, guildId: string, userId: string) => string
    /**
     * Forms a User avatar url
     */
    UserAvatar: (avatar: string, extension: ImageFormatWithoutLottie, size: number, userId: string) => string
    /**
     * Forms a default User avatar url
     */
    DefaultUserAvatar: (discriminator: number, extension: ".png", size: number) => string
    /**
     * Forms a User banner url
     */
    UserBanner: (banner: string, extension: ImageFormatWithoutLottie, size: number, forceStatic: boolean, userId: string) => string
    /**
     * Forms a Guild Scheduled Event Cover Image URL
     */
    GuildScheduledEventCover: (cover: string, extension: ImageFormatWithoutLottieAnimate, size: number, scheduledEventId: string) => string
    /**
     * Forms a Sticker Pack Banner url
     */
    StickerPackBanner: (assetId: string, extension: ImageFormatWithoutLottieAnimate, size: number) => string
    /**
     * Forms an Application Icon url
     */
    ApplicationIcon: (icon: string, extension: ImageFormatWithoutLottieAnimate, size: number, applicationId: string) => string
    /**
     * Forms an Application Cover Image url
     */
    ApplicationCover: (cover: string, extension: ImageFormatWithoutLottieAnimate, size: number, applicationId: string) => string
    /**
     * Forms an Emoji image url
     */
    EmojiImage: (emoji: Emoji, extension: ImageFormatWithoutLottie, size: number, forceStatic: boolean) => string
    /**
     * Forms a Sticker image url
     */
    StickerImage: (stickerId: string, extension: ImageFormatWithPngLottie) => string
    /**
     * Forms a Guild Member Banner url
     */
    GuildMemberBanner: (banner: string, extension: ImageFormatWithoutLottie, size: number, forceStatic: boolean, guildId: string, userId: string) => string
}

export interface ImageURLOptions<T = undefined> {
    /**
     * The Extension of this Image
     */
    extension?: T
    /**
     * The size of this Image. Make sure its any number in base 2
     */
    size?: number
    /**
     * Whether or not to force the image to be static
     */
    forceStatic?: boolean
}

export interface GuildMemberFetchOptions extends BaseFetchOptions {
    /**
     * String that username starts with, or an empty string to return all members
     */
    query?: string
    /**
     * The limit of data to return
     */
    limit?: number
    /**
     * Whether or not you want the data to have Presence
     */
    withPresence?: boolean
    /**
     * An Array of Users or one you wish to fetch
     */
    user?: UserResolvable[] | UserResolvable
    /**
     * How long do you want to wait to receive GuildMember data
     */
    time?: number
}

export interface ModifyGuildMemberData extends BaseOptions {
    /**
     * The nickname of this GuildMember
     */
    nick?: string
    /**
     * The Roles of this GuildMember
     */
    roles?: RoleResolvable[]
    /**
     * Whether or not this GuildMember is server muted
     */
    mute?: boolean
    /**
     * Whether or not this GuildMember is server deafened
     */
    deaf?: boolean
    /**
     * The Channel to move this GuildMember to
     */
    channel?: ChannelResolvable
    /**
     * How long this GuildMember should be timeouted for
     */
    communicationDisabledUntil?: DateResolvable | null
}

export interface RoleTags {
    /**
     * The id of the bot this belongs to
     */
    botId: string
    /**
     * The id of the integration this Role belongs to
     */
    integrationId: string
    /**
     * Whether or not this Role is the Guild's premium subscriber Role
     */
    premiumSubscriber: boolean
}

export interface GuildBanFetchOption extends BaseFetchOptions {
    /**
     * The limit of GuildBans to fetch
     */
    limit?: number
    /**
     * Fetches the GuildBans before this Snowflake
     */
    before?: UserResolvable
    /**
     * Fetches the GUildBans after this Snowflake
     */
    after?: UserResolvable
}

export interface GuildRoleCreateData extends BaseOptions {
    /**
     * The name of this Role
     */
    name?: string
    /**
     * The permissions of this Role
     */
    permissions?: PermissionFlagsResolvable
    /**
     * The color of this Role
     */
    color?: ColorResolvable
    /**
     * Whether or not this Role should be hoisted
     */
    hoist?: boolean
    /**
     * The icon of this Role
     */
    icon?: BufferResolvable
    /**
     * the Role's unicode Emoji as a standard Emoji (if the Guild has the ROLE_ICONS feature)
     */
    unicodeEmoji?: string
    /**
     * Whether or not this Role is mentionable
     */
    mentionable?: boolean
    /**
     * The position of this Role
     */
    position?: number
}

export interface ModifyGuildRolePositions {
    /**
     * The Role to modify position of
     */
    role: RoleResolvable
    /**
     * The position
     */
    position?: number
}

export interface GuildPruneOptions extends BaseOptions {
    /**
     * Number of days to prune
     */
    days?: number
    /**
     * Whether pruned is returned, discouraged for large guilds
     */
    computePruneCount?: boolean
    /**
     * Roles to include
     */
    roles?: RoleResolvable[]
}

export interface GuildIntegrationAccount {
    /**
     * The id of the account
     */
    id: string
    /**
     * The name of the account
     */
    name: string
}

export interface ModifyGuildWelcomeScreenData extends BaseOptions {
    /**
     * Whether or not this Welcome Screen is enabled
     */
    enabled?: boolean
    /**
     * The Channels to put in this Welcome Screen
     */
    welcomeChannels?: WelcomeScreenChannelData[]
    /**
     * The description of this Welcome Screen
     */
    description?: string
}

export interface WelcomeScreenChannelData {
    /**
     * The channel 
     */
    channel?: ChannelResolvable
    /**
     * The description of this
     */
    description?: string
    /**
     * The id of the Emoji for this Welcome Screen Channel
     */
    emojiId?: string
    /**
     * The name of the EMoji for this Welcome Screen Channel
     */
    emojiName?: string
}

export interface ModifyVoiceStateData {
    /**
     * The Channel to move this User to
     */
    channel?: ChannelResolvable
    /**
     * Whether or not this User must be suppressed
     */
    suppress?: boolean
    /**
     * Sets the User's request to speak
     */
    requestToSpeak?: DateResolvable
}

export interface WebsocketPayload {
    /**
     * The OpCode of this Gateway Payload
     */
    op: number
    /**
     * The Payload to send
     */
    d: {}
}

export interface GuildScheduledEventFetchOptions extends BaseFetchOptions {
    /**
     * Whether or not to include the number of Users subscribed to this Guild Scheduled Event
     */
    withUserCount?: boolean
}

export interface CreateGuildScheduledEventData extends BaseOptions {
    /**
     * The Channel this Guild Scheduled Event would be hosted on. Optional for Entity Type of `External`
     */
    channel?: ChannelResolvable
    /**
     * The Entity Metadata of this Guild Scheduled Event. Required for Entity Type of `External`
     */
    entityMetadata?: GuildScheduledEventEntityMetadata
    /**
     * The name of this Guild Scheduled Event
     */
    name: string
    /**
     * The Privacy Level of this Guild Scheduled Event
     */
    privacyLevel: number
    /**
     * When this Guild Scheduled Event is scheduled to start
     */
    scheduledStart: DateResolvable
    /**
     * When this Guild Scheduled Event is scheduled to end. Required for Entity Type of `External`
     */
    scheduledEnd?: DateResolvable
    /**
     * The description of this Guild Scheduled Event
     */
    description?: string
    /**
     * The Entity Type of this Guild Scheduled Event
     */
    entityType: number
    /**
     * The Cover Image of this Guild Scheduled Event
     */
    image?: BufferResolvable
}

export interface GuildScheduledEventEntityMetadata {
    /**
     * The location this would be hosted on
     */
    location?: string
}

export interface ModifyGuildScheduledEventData extends BaseOptions {
        /**
     * The Channel this Guild Scheduled Event would be hosted on. Optional for Entity Type of `External` and must be set to null
     */
    channel?: ChannelResolvable
    /**
     * The Entity Metadata of this Guild Scheduled Event. Required for Entity Type of `External`
     */
    entityMetadata?: GuildScheduledEventEntityMetadata
    /**
     * The name of this Guild Scheduled Event
     */
    name?: string
    /**
     * The Privacy Level of this Guild Scheduled Event
     */
    privacyLevel?: number
    /**
     * When this Guild Scheduled Event is scheduled to start
     */
    scheduledStart?: DateResolvable
    /**
     * When this Guild Scheduled Event is scheduled to end. Required for Entity Type of `External`
     */
    scheduledEnd?: DateResolvable
    /**
     * The description of this Guild Scheduled Event
     */
    description?: string
    /**
     * The Entity Type of this Guild Scheduled Event
     */
    entityType?: number
    /**
     * The Cover Image of this Guild Scheduled Event
     */
    image?: BufferResolvable
}

export interface GuildScheduledEventUserFetchOptions extends BaseFetchOptions {
    /**
     * The limit of the results to fetch
     */
    limit?: number
    /**
     * Whether or not to include a Guild Member in the Guild Scheduled Event User data
     */
    withMember?: boolean
    /**
     * The User's to fetch before this id
     */
    before?: UserResolvable
    /**
     * The User's to fetch after this id
     */
    after?: UserResolvable
}

export interface CreateGuildTemplateData {
    /**
     * The name of the Guild Template
     */
    name: string
    /**
     * The description of the Guild Template
     */
    description?: string
}

export interface CreateTemplateFromGuildData {
    /**
     * The name of the Guild
     */
    name: string
    /**
     * The icon of the Guild
     */
    icon?: BufferResolvable
}

export interface InviteFetchOptions {
    /**
     * Whether or not this Invite should contian the approximate member counts
     */
    withCounts?: boolean
    /**
     * Whether or not this Invite should contain it's expiration date
     */
    withExpiration?: boolean
    /**
     * The Guild Scheduled Event to include in this Invite
     */
    guildScheduledEvent?: GuildScheduledEventResolvable
}

export interface CreateStageInstanceData extends BaseOptions {
    /**
     * The Stage Channel to host this Stage Instance at
     */
    channel: ChannelResolvable
    /**
     * The topic of this Stage Instance
     */
    topic: string
    /**
     * The Privacy Level of this Stage Instance
     */
    privacyLevel?: number
    /**
     * Whether or not to ping `@everyone` that the Stage Instance has started
     */
    sendStartNotification?: boolean
    /**
     * The Guild Scheduled Event that will be hosted on this Stage Instance
     */
    guildScheduledEvent?: GuildScheduledEventResolvable
}

export interface CreateGuildStickerData extends BaseOptions {
    /**
     * The name of this Sticker
     */
    name: string
    /**
     * The description of this Sticker
     */
    description: string
    /**
     * The Autocomplete tags of this Sticker
     */
    tags: string
    /**
     * The Attachment to upload to this Sticker
     */
    file: BufferResolvable
}

export interface ModifyCurrentUserData {
    /**
     * The username of this Client User
     */
    username?: string
    /**
     * The avatar of this Client User
     */
    avatar?: BufferResolvable
}

export interface MessageOptionsData {
    /**
     * The content of the Message. Required for sending Components
     */
    content?: string
    /**
     * Whether or not this Message should be spoken
     */
    tts?: boolean
    /**
     * The Embeds to send
     */
    embeds?: EmbedBuilder[]
    /**
     * The Allowed Mentions for this Message
     */
    allowedMentions?: AllowedMentions
    /**
     * The Message Reference for this Message
     */
    reference?: MessageReferenceData
    /**
     * The components to send with this Message
     */
    components?: ActionRowBuilder[]
    /**
     * The Stickers to send with this Message
     */
    stickers?: StickerResolvable[]
    /**
     * The files to send with this Message
     */
    files: BufferResolvable[]
    /**
     * The Message Flags
     */
    flags?: MessageFlagsResolvable
    /**
     * The Attachments to keep
     */
    attachments?: Attachment[]
}

export interface AllowedMentions {
    /**
     * An array of allowed mention types
     */
    parse?: AllowedMentionTypes[]
    /**
     * List of Roles to mention
     */
    roles?: RoleResolvable[]
    /**
     * List of Users to mention
     */
    users?: RoleResolvable[]
    /**
     * Whether or not to ping the replied Message author
     */
    repliedUser?: boolean
}

export interface MessageReferenceData {
    /**
     * The id of the Message to reply to
     */
    messageId?: string
}

export interface EmbedVideo {
    /**
     * The url of this video
     */
    url: string
    /**
     * The proxied url of this video
     */
    proxyURL: string
    /**
     * The height of this video
     */
    height: number
    /**
     * The width of this video
     */
    width: number
}

export interface EmbedProvider {
    /**
     * The name of the provider
     */
    name: string
    /**
     * The url of the provider
     */
    url: string
}

export interface ApplicationInstallParams {
    /**
     * The Scopes of this Application
     */
    scopes: Scopes[]
    /**
     * The Permissions this Application requested for
     */
    permissions: Readonly<Permissions>
}

export interface MessageFetchOptions extends BaseFetchOptions {
    /**
     * Get Messages around this Message
     */
    around?: MessageResolvable
    /**
     * Get Messages before this Message
     */
    before?: MessageResolvable
    /**
     * Get Messages after this Message
     */
    after?: MessageResolvable
    /**
     * The limit to fetch Messages
     */
    limit?: number
}

export interface SlashCommandOption {
    /**
     * The type of this Slash Command Option
     */
    type: number
    /**
     * The name of this Slash Command Option
     */
    name: string
    /**
     * The name localization of this Slash Command Option
     */
    nameLocalizations: Record<Locales, string>
    /**
     * The description of this Slash Command Option
     */
    description: string
    /**
     * The description localizations of this Slash Command Option
     */
    descriptionLocalizations: Record<Locales, string>
    /**
     * Whether or not this Slash Command Option is required
     */
    required: boolean
    /**
     * The choices of this Slash Command Option
     */
    choices: Choices[]
    /**
     * If this a Sub Command or Sub Command group. The subcommands or options
     */
    options: Collection<string, SlashCommandOption>
    /**
     * The Channel type to filter if this is a Slash Command Channel Option type
     */
    channelTypes: number[]
    /**
     * The minimum value set for this Slash Command Integer/Number Option type
     */
    minValue: number
    /**
     * The maximum value set for this Slash Command Integer/Number Option type
     */
    maxValue: number
    /**
     * The minimum length set for this Slash Command String Option type
     */
    minLength: number
    /**
     * The maximum length set for this Slash Command String Option type
     */
    maxLength: number
    /**
     * Whether or not this is an Autocomplete Slash Option
     */
    autocomplete: boolean
}

export interface ApplicationCommandFetchOptions extends BaseFetchOptions {
    /**
     * Whether or not to return Application Commands with localizations
     */
    withLocalizations?: boolean
}

export interface ApplicationCommandData {
    /**
     * The type of this Application Command
     */
    type?: number
    /**
     * The name of this Application Command
     */
    name: string
    /**
     * The name localizations of this Application Command
     */
    nameLocalizations?: Record<Locales, string>
    /**
     * The description of this Application Command
     */
    description: string
    /**
     * The description localizations of this Application Command
     */
    descriptionLocalizations?: Record<Locales, string>
    /**
     * An array of Slash Command Option
     */
    options?: SlashCommandOption[]
    /**
     * The Permissions required for User's to use this Application Command
     */
    defaultMemberPermissions?: PermissionFlagsResolvable
    /**
     * Whether or not this Application Command works in Dm's
     */
    dmPermissions?: boolean
}

export interface ModifyApplicationCommandData {
    /**
     * The name of this Application Command
     */
    name?: string
    /**
     * The name localizations of this Application Command
     */
    nameLocalizations?: Record<Locales, string>
    /**
     * The description of this Application Command
     */
    description?: string
    /**
     * The description localizations of this Application Command
     */
    descriptionLocalizations?: Record<Locales, string>
    /**
     * An array of Slash Command Option
     */
    options?: SlashCommandOption[]
    /**
     * The Permissions required for User's to use this Application Command
     */
    defaultMemberPermissions?: PermissionFlagsResolvable
}

export interface ApplicationCommandPermissions {
    /**
     * The id of the Role, User or the Channel. Can also be a [Permission constant](https://discord.com/developers/docs/interactions/application-commands#application-command-permissions-object-application-command-permissions-constants)
     */
    id: string
    /**
     * The type of this Permission
     */
    type: number
    /**
     * Whether or not this Permission is enabled
     */
    permission: boolean
}

export interface InteractionReplyOptions extends MessageOptionsData {
    /**
     * Whether or not to make this Interaction Response ephemeral
     */
    ephemeral?: boolean
    /**
     * Whether or not to fetch the Interaction Reply
     */
    fetchReply?: boolean
}

export interface WebhookPayloadOptions extends MessageOptionsData {
    /**
     * Whether or not to wait for the Message before sending a response
     */
    wait?: boolean
    /**
     * The id of the Thread to send a Message to
     */
    thread?: ChannelResolvable
    /**
     * The username to use for this Webhook when sending a Message
     */
    username?: string
    /**
     * The avatar url to use for this Webhhok
     */
    avatar?: string
    /**
     * The name of the Thread to create
     */
    threadName?: string
}

export interface ArchiveThreadFetchOptions {
    /**
     * Returns Threads before this timestamp
     */
    before?: DateResolvable
    /**
     * The limit of Threads to fetch
     */
    limit?: number
    /**
     * Whether or not to fetch public or private Threads
     */
    private?: boolean
}

export interface CreateForumPostData extends BaseOptions {
    /**
     * The name of this Channel
     */
    name: string
    /**
     * Duration in minutes to automatically archive the Thread after recent activity, can be set to: 60, 1440, 4320, 10080
     */
    autoArchiveDuration?: number
    /**
     * Amount of seconds a User has to wait before sending another Message (0-21600)
     */
    rateLimitPerUser?: number
    /**
     * The Message to send in this Thread
     */
    message: MessageOptionsData
    /**
     * The tags to apply for this Thread
     */
    appliedTags?: ForumTagResolvable[]
}

export interface ModalFieldData {
    /**
     * The value inputted in this Input Text
     */
    value: string
    /**
     * The type of this Component
     */
    type: number
    /**
     * The custom id of this Component
     */
    customId: string
}

export interface ModalData {
    /**
     * The title of this Modal
     */
    title: string
    /**
     * The custom id of this Modal
     */
    customId: string
    /**
     * Array of Components to show in this Modal
     */
    components: ComponentResolvable[]
}

export interface ReactionUserFetchOptions extends BaseFetchOptions {
    /**
     * Fetches User's after this snowflake
     */
    after?: UserResolvable
    /**
     * The limit of results to fetch
     */
    limit?: number
}

export interface ForumDefaultReactionEmoji {
    /**
     * The id of the Emoji
     */
    emojiId: string
    /**
     * The name of the Emoji
     */
    emojiName: string
}

export interface ChanenlOverwritesData extends BaseOptions {
    /**
     * The type of this Overwrite
     */
    type: number
    /**
     * The Permissions to set
     */
    permissions: Record<PermissionFlagsStrings, boolean | null>
}

export interface MessageDeleteBulkOptions extends BaseOptions {
    /**
     * Whether or not to filter 2 weeks old Messages
     */
    filterOld?: boolean
}

export interface CreateGuildEmojiData extends BaseOptions {
    /**
     * The name of this Emoji
     */
    name?: string
    /**
     * The image to use as an Emoji
     */
    image?: BufferEncoding
    /**
     * Array of Roles who are allowed to use this Emoji
     */
    roles?: RoleResolvable[]
}

export interface AuditLogEntryChanges {
    /**
     * The new value of the key
     */
    newValue: any
    /**
     * The old value of the key
     */
    oldValue: any
    /**
     * The name of the changed entity
     */
    key: string
}

export interface AuditLogEntryOptions {
    /**
     * The id of the Application whose Permissions were targeted
     */
    applicationId: string
    /**
     * The name of the Auto Moderation Rule that was triggered
     */
    autoModerationRuleName: string
    /**
     * The trigger type of the Auto Moderation Rule that was triggered
     */
    autoModerationRuleTriggerType: string
    /**
     * Channel in which entities were targeted
     */
    channelId: string
    /**
     * Number of entities that were targeted
     */
    count: string
    /**
     * Number of days after which inactive Guild Members were kicked
     */
    deleteMemberDays: string
    /**
     * The id of the overwritten entity
     */
    id: string
    /**
     * Number of Guild Members removed by the prune
     */
    membersRemoved: string
    /**
     * THe id of the Message that were targeted
     */
    nessageId: string
    /**
     * Name of the Role if type is `0` not present if type `1`
     */
    roleName: string
    /**
     * The type of the overwritten entity. `0` - Role or `1` - Guild Member
     */
    type: string
}

export interface AuditLogFetchOptions {
    /**
     * The User to filter for
     */
    user?: UserResolvable
    /**
     * The Action Type to filter for
     */
    actionType?: number
    /**
     * Fetches Audit Log Entries before this Snowflake
     */
    before?: AuditLogEntryResolvable
    /**
     * The limit of Audit Log Entries to fetch
     */
    limit?: number
}

export interface CreateAutoModerationData extends BaseOptions {
    /**
     * The name of this Auto Moderation
     */
    name: string
    /**
     * The type of event this Auto Moderation should be checked
     */
    eventType: number
    /**
     * The type of content which can trigger this Auto Moderation
     */
    triggerType: number
    /**
     * The trigger metadata which can trigger this Auto Moderation
     */
    triggerMetadata?: AutoModerationTriggerMetadata
    /**
     * The action which will be executed when the Auto Moderation is triggered
     */
    actions: AutoModerationActionData[]
    /**
     * Whether or not to enabled this Auto Moderation Rule
     */
    enabled?: boolean
    /**
     * The exempt Roles that should not be affected when the Rule is triggered
     */
    exemptRoles?: RoleResolvable[]
    /**
     * The exempt Channels that should not be affected whenm the Rule is triggered
     */
    exemptChannels?: ChannelResolvable[]
}

export interface AutoModerationActionData {
    /**
     * The Action type
     */
    type: number
    /**
     * The metadata to use for the Auto Moderation action
     */
    metadata: AutoModerationActionMetadata
}

export interface AutoModerationActionMetadata {
    /**
     * The id of the Channel to send alert Message to
     */
    channelId: string
    /**
     * The Channel to send alert Message to. Used for Creating/Editing Auto Moderation Rule
     */
    channel: BaseGuildTextChannel
    /**
     * Timeout duration in seconds
     */
    durationSeconds: number
}

export interface AutoModerationTriggerMetadata {
    /**
     * Array of strings which can trigger the Auto Moderation Rule if found on Message content
     */
    keywordFilter?: string[]
    /**
     * Array of Keyword Preset Types which are pre-defined wordsets which will be searched for on Message content
     */
    presets?: number
    /**
     * List of allowed keywords that won't trigger the Auto Moderation Rule if found on Message content
     */
    allowList?: string[]
    /**
     * Limit of total User and Roles mention to check for in the Message content
     */
    mentionTotalLimit: number
    /**
     * Array of Regex Patterns to run against Message content
     */
    regexPatterns?: Array<string>
}

export interface InteractionWebhookOptions {
    /**
     * The id of the Application
     */
    id: string
    /**
     * The token of the invoked Interaction Webhook
     */
    token: string
    /**
     * The id of the invoked Interaction
     */
    interactionId?: string
    /**
     * The id of the Guild this belongs to
     */
    guildId?: string
    /**
     * The id of the Channel this belongs to
     */
    channelId?: string
}

export interface WebhookClientOptions {
    /**
     * The id of the Webhook to use
     */
    id: string
    /**
     * The token of the Webhook to use
     */
    token: string
    /**
     * The url of the Webhook
     */
    url?: string
}

export interface WebhookMessageOptions<T> extends MessageOptionsData {
    /**
     * Whether or not to wait for the Message to send before Response
     */
    wait?: T
    /**
     * The Thread to send a Message to
     */
    thread?: ThreadChannel | string
}

export interface WebhookCreateOptions extends BaseOptions {
    /**
     * The name of this Webhook
     */
    name: string
    /**
     * The avatar of this Webhook
     */
    avatar?: BufferResolvable
}

export interface ClientStatus {
    /**
     * User's status set if they are on Windows, Linux, and Mac
     */
    desktop: PresenceStatus
    /**
     * User's status set if they are on mobile IOS, and Android
     */
    mobile: PresenceStatus
    /**
     * User's status set if they are on Discord Web
     */
    web: PresenceStatus
}

export interface ActivityTimestamps {
    /**
     * When this Activity started
     */
    start: Date
    /**
     * When this Acitvity ends
     */
    end: Date
}

export interface ActivityParty {
    /**
     * The id of the Party
     */
    id: string
    /**
     * The Party's current and maximum size
     */
    size: number[]
}

export interface ActivityAssets {
    /**
     * The Activity's Asset large image
     */
    largeImage: string
    /**
     * The text shown when hovering over the large image of the Activity
     */
    largeText: string
    /**
     * The Activity's Asset small image
     */
    smallImage: string
    /**
     * The Text shown wehn hovering over the smaill image of the Activity
     */
    smallText: string
}

export interface ActivityButtons {
    /**
     * The Text shown on the button
     */
    label: string
    /**
     * The url opened when clicking the button
     */
    url: string
}

export interface Oauth2Options {
    /**
     * The Oauth2 grant type
     */
    grantType: "authorization_code" | "client_credentials",
    /**
     * The code from query string
     */
    code?: string,
    /**
     * The redirect uri
     */
    redirectUri: string
    /**
     * An Array or a string of Scopes
     */
    scopes?: Array<Scopes> | Scopes
}

export interface GroupDMChannelCreateOptions {
    /**
     * An Array of access tokens you wish to be in this Group DM Chanenl
     */
    accessTokens: Array<string>
    /**
     * Array of Users
     */
    users: Array<UserResolvable>
}

export interface AddRemoveRoleMember extends BaseOptions {
    /**
     * The Role to add to a GuildMember
     */
    role: RoleResolvable
}

export interface CreateApplicationCommandPermission {
    /**
     * The Application Command to set permissions on
     */
    command?: ApplicationCommandResolvable
    /**
     * The Access Token received from Oauth
     */
    accessToken: string
    /**
     * Array of permissions to give this Application Command
     */
    permissions: Array<Omit<ApplicationCommandPermissions, "id"> | { id: UserResolvable | RoleResolvable }>
}

export interface CreateClientPresence {
    /**
     * The Activities to set for this Presence
     */
    activities: Array<PresenceActivity>
    /**
     * The status to set for this Presence
     */
    status?: PresenceStatus
    /**
     * Whether or not the Client is AFK
     */
    afk?: boolean
}

export interface PresenceActivity {
    /**
     * The name of this Activity
     */
    name: string
    /**
     * The type of this Activity
     */
    type?: number
    /**
     * The url of this Activity. Only used when in Streaming Activity type
     */
    url?: string
}

export interface VoiceStateData {
    /**
     * Whether or not the Client is muted
     */
    selfMute?: boolean
    /**
     * Whether or not the Client is deafened
     */
    selfDeaf?: boolean
}

export interface PartialEmoji {
    /**
     * The id of this Emoji
     */
    id: string
    /**
     * The name of this Emoji
     */
    name: string
    /**
     * Whether or not this Emoji is animated
     */
    animated: boolean
}

export interface RateLimitData {
    /**
     * The remaining request you can make to an endpoint until you are ratelimited
     */
    remaining: number
    /**
     * When the endpoiint ratelimit is scheduled to reset. In milliseconds
     */
    reset: number
    /**
     * The total limit of requests you can make to this endpoint
     */
    limit: number
    /**
     * The route this ratelimit belongs to
     */
    route: string
    /**
     * Whether or not this route is ratelimited
     */
    ratelimited: boolean
    /**
     * The method used for this request
     */
    method: RESTMethod
    /**
     * The bucket this request belongs to. [Docs](https://discord.com/developers/docs/topics/rate-limits#header-format-rate-limit-header-examples)
     */
    bucket: string
}

export interface RoleConnectionMetadata {
    /**
     * The type of the metadata
     */
    type: number
    /**
     * The key of the metadata
     */
    key: string
    /**
     * The name of the Role Connection metadata
     */
    name: string
    /**
     * Translations of the name
     */
    nameLocalizations: Record<Locales, string>
    /**
     * The description of this metadata
     */
    description: string
    /**
     * The translations of the description
     */
    descriptionLocalizations: Record<Locales, string>

}

export interface Oauth2ClientOptions {
    /**
     * The id of the Client
     */
    clientId?: string
    /**
     * The Client secret
     */
    clientSecret: string
}

export interface TextInputComponent {
    /**
     * The custom id of this Text Input
     */
    customId: string
    /**
     * The style of this Text Input
     */
    style: number
    /**
     * The label of this Text Input
     */
    label: string
    /**
     * The minimum length set for this Text input
     */
    minLength: number
    /**
     * The maximum length set for this Text Input
     */
    maxLength: number
    /**
     * Whether or not this Text Input is required to be filled
     */
    required: boolean
    /**
     * The pre-filled value of this Text Input
     */
    value: string
    /**
     * The placeholder of this Text Input
     */
    placeholder: string
}
/**
 * Identifiers that can be resolved to an emoji
 * @example
 * <a:name:id>
 * a:name:id
 * ❌
 */
export type EmojiIdentifierResolvable = Emoji | string
export type PresenceStatus = "online" | "offline" | "idle" | "dnd" | "invisible"
export type GuildMemberFlagsStrings = "DidRejoin" | "CompletedOnboarding"
export type GuildMemberFlagsResolvable = bigint | GuildMemberFlagsStrings
export type ActivityFlagsResolvable = bigint | ActivityFlagsStrings
export type ActivityFlagsStrings = "Instance" | "Join" | "Spectate" | "JoinRequest" | "Sync" | "Play" | "PartyPrivacyFriends" | "PartyPrivacyVoiceChannel" | "Embedded"
export type BaseInteractionMixIns = Omit<BaseInteraction, "showModal">
export type AutomoderationResolvable = string | AutoModeration
export type AuditLogEntryResolvable = string | AuditLogEntry
export type MessageBulkResolvable = Array<MessageResolvable> | Collection<string, Message>
export type ForumTagResolvable = string | ForumTags
export type ApplicationCommandResolvable = string | ApplicationCommand
export type EmojiResolvable = Emoji | string
export type MessageResolvable = Message | string
export type ApplicationFlagsResolvable = ApplicationFlagsStrings | bigint
export type ApplicationFlagsStrings = "GatewayPresence" | "GatewayPresenceLimited" | "GatwewayGuildMembers" | "GatewayGuildMembersLimited" | "VerificationPendingGuildLimit" | "Embedded" | "GatewayMessageContent" | "GatewayMessageContentLimited" | "ApplicationCommandBadge" | "Active"
export type MessageFlagsResolvable = MessageFlagsStrings | bigint
export type MessageFlagsStrings = "Crossposted" | "IsCrosspost" | "SuppressEmbeds" | "SourceMessageDeleted" | "Urgent" | "HasThread" | "Ephemeral" | "Loading" | "FailedToMentionSomeRolesInThread"
export type AllowedMentionTypes = "users" | "roles" | "everyone"
export type StickerResolvable = string | Sticker
export type InviteResolvable = string | Invite
export type GuildTemplateResolvable = string | GuildTemplate
export type GuildScheduledEventResolvable = string | GuildScheduledEvent
export type Scopes = "activities.read" | "activities.write" | "applications.builds.read" | "applications.builds.upload" | "applications.commands" | "applications.commands.update" | "applications.commands.permissions.update" | "applications.entitlements" | "applications.store.update" | "bot" | "connections" | "dm_channels.read" | "email" | "gdm.join" | "guilds" | "guilds.join" | "guilds.members.read" | "identify" | "messages.read" | "relationships.read" | "rpc" | "rpc.activities.write" | "rpc.notifications.read" | "rpc.voice.read" | "rpc.voice.write" | "voice" | "webhook.incoming"
export type MultiRoleResolvable = Collection<string, Role> | Array<Role>
export type RoleResolvable = Role | string
export type Languages = "js" | "html" | "css" | "diff" | "cpp"
export type UserResolvable = GuildMember | User | string
export type UserFlagsResolvable = bigint | UserFlagsStrings
export type UserFlagsStrings = "Staff" | "Partner" | "Hypesquad" | "BugHunterLevel1" | "HypeSquadOnlineHouse1" | "HypeSquadOnlineHouse2" | "HypeSquadOnlineHouse3" | "PremiumEarlySupporter" | "TeamPseudoUser" | "BugHunterLevel2" | "VerifiedBot" | "VerifiedDeveloper" | "CertifiedModerator" | "BotHttpInteractions" | "ActiveDeveloper" | "Spammer"
export type ImageFormats = ".jpg" | ".jpeg" | ".png" | ".webp" | ".gif" | ".json"
export type Partials = "CHANNEL"
export type ChannelResolvable = string | Channel | GuildChannel | ThreadChannel
export type ChannelFlagsResolvable = ChannelFlagsString | bigint
export type ChannelFlagsString = "Pinned" | "RequireTag"
export type BufferResolvable = string | Buffer | AttachmentBuilder
export type GuildResolvable = Guild | string
export type SystemChannelFlagsResolvable = bigint | SystemChannelFlagsStrings
export type SystemChannelFlagsStrings = "SuppressJoinNotifications" | "SuppresPremiumSubscriptions" | "SuppressGuildReminderNotifications" | "SuppressJoinNotificationReplies"
export type GuildFeatures = "AnimatedBanner" | "AnimatedIcon" | "AutoModeration" | "Banner" | "Community" | "DeveloperSupportServer" | "Discoverable" | "Featurable" | "InvitesDisabled" | "InviteSplash" | "MemberVerificationGateEnabled" | "MonetizationEnabled" | "MoreStickers" | "News" | "Partnered" | "PreviewEnabled" | "RoleIcons" | "TicketsEventsDisabled" | "VanityUrl" | "Verified" | "VipRegions" | "WelcomeScreenEnabled" | "ApplicationCommandPermissionsV2"
export type IntentsResolvable = bigint | IntentStrings
export type IntentStrings = "Guilds" | "GuildMembers" | "GuildBans" | "GuildEmojisAndStickers" | "GuildIntegrations" | "GuildWebhooks" | "GuildInvites" | "GuildVoiceStates" | "GuildPresences" | "GuildMessages" | "GuildMessageReactions" | "GuildMessageTyping" | "DirectMessages" | "DirectMessageReactions" | "DirectMessageTyping" | "MessageContent" | "GuildScheduledEvents" | "AutoModerationConfiguration" | "AutoModerationExecution"
export type RESTMethod = "GET" | "POST" | "DELETE" | "PUT" | "PATCH" 
export type ContentType = "application/json" | "text/html" | "application/javascript"
export type DateResolvable = Date | number
export type ColorResolvable = string | number | Array<number>
export type PermissionFlagsResolvable = PermissionFlagsStrings | bigint
export type Locales = "id" | "da" | "de" | "en-GB" | "en-US" | "es-ES" | "fr" | "hr" | "it" | "lt" | "hu" | "nl" | "no" | "pl" | "pt-BR" | "ro" | "fi" | "sv-SE" | "vi" | "tr" | "cs" | "el" | "bg" | "ru" | "uk" | "hi" | "th" | "zh-CN" | "ja" | "zh-TW" | "ko"
export type PermissionFlagsStrings = "CreateInstantInvite" | "KickMembers" | "BanMembers" | "Administrator" | "ManageChannels" | "ManageGuild" | "AddReactions" | "ViewAuditLog" | "PrioritySpeaker" | "Stream" | "ViewChannel" | "SendMessages" | "SendTTSMessage" | "ManageMessages" | "EmbedLinks" | "AttachFiles" | "ReadMessageHistory" | "MentionEveryone" | "UseExternalEmojis" | "ViewGuildInsights" | "Connect" | "Speak" | "MuteMembers" | "DeafenMembers" | "MoveMembers" | "UseVad" | "ChangeNickname" | "ManageNicknames" | "ManageRoles" | "ManageWebhooks" | "ManageEmojisAndStickers" | "UseApplicationCommands" | "RequestToSpeak" | "ManageEvents" | "ManageThreads" | "CreatePublicThreads" | "CreatePrivateThreads" | "UseExternalStickers" | "SendMessagesInThreads" | "UseEmbeddedActivities" | "ModerateMembers" | "ViewCreatorMonetizationAnalytics"
export type ComponentResolvable = ButtonBuilder | SelectMenuBuilder | InputTextBuilder
export type ImageFormatWithoutAnimate = Exclude<ImageFormats, ".gif">
export type ImageFormatWithoutLottie = Exclude<ImageFormats, ".json">
export type ImageFormatWithoutLottieAnimate = Exclude<ImageFormats, ".json" | ".gif">
export type ImageFormatWithoutWebp = Exclude<ImageFormats, ".webp">
export type ImageFormatWithoutWebpLottieAnimate = Exclude<ImageFormats, ".webp" | ".json" | ".gif">
export type ImageFormatWithoutWebpLottie = Exclude<ImageFormats, ".webp" | ".json">
export type ImageFormatWithPngLottie = Extract<ImageFormats, ".png" | ".json">