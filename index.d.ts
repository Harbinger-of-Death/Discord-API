import { ApplicationCommandData, ApplicationCommandFetchOptions, ApplicationCommandPermissions, ApplicationCommandResolvable, ApplicationFlagsResolvable, ApplicationFlagsStrings, ApplicationInstallParams, ArchiveThreadFetchOptions, BaseFetchOptions, BufferResolvable, CdnEndpoints, ChannelFlagsResolvable, ChannelFlagsString, PermissionOverwritesData, ChannelResolvable, ClientEvents, ClientOptions, ColorResolvable, ComponentEmoji, ComponentResolvable, CreateChannelData, CreateForumPostData, CreateGuildScheduledEventData, CreateGuildStickerData, CreateGuildTemplateData, CreateInviteData, CreateStageInstanceData, CreateTemplateFromGuildData, CreateThreadData, DateResolvable, EmbedAuthor, EmbedFields, EmbedFooter, EmbedImage, EmbedProvider, EmbedThumbnail, EmbedVideo, EmojiResolvable, ForumTagResolvable, GuildBanFetchOption, GuildCreateData, GuildFeatures, GuildFetchOptions, GuildIntegrationAccount, GuildMemberFetchOptions, GuildPruneOptions, GuildResolvable, GuildRoleCreateData, GuildScheduledEventEntityMetadata, GuildScheduledEventFetchOptions, GuildScheduledEventResolvable, GuildScheduledEventUserFetchOptions, GuildTemplateResolvable, HTTPOptions, ImageFormatWithoutLottie, ImageFormatWithoutLottieAnimate, ImageURLOptions, IntentsResolvable, IntentStrings, InteractionReplyOptions, InviteFetchOptions, InviteResolvable, Languages, Locales, MessageFetchOptions, MessageFlagsResolvable, MessageFlagsStrings, MessageOptionsData, MessageResolvable, ModifyApplicationCommandData, ModifyChannelPositionData, ModifyCurrentUserData, ModifyGuildMemberData, ModifyGuildRolePositions, ModifyGuildScheduledEventData, ModifyGuildWelcomeScreenData, ModifyVoiceStateData, MultiRoleResolvable, PartialChannelData, PartialGuildData, PermissionFlagsResolvable, PermissionFlagsStrings, RoleResolvable, RoleTags, Scopes, SelectMenuOptions, SlashCommandOption, Choices, SnowflakeData, StickerResolvable, SystemChannelFlagsResolvable, SystemChannelFlagsStrings, UserFlagsResolvable, UserFlagsStrings, UserResolvable, WebhookPayloadOptions, WebsocketPayload, ModalFieldData, ModalData, ForumDefaultReactionEmoji, ChanenlOverwritesData, BaseOptions, MessageBulkResolvable, MessageDeleteBulkOptions, CreateGuildEmojiData, AuditLogEntryChanges, AuditLogEntryOptions, AuditLogFetchOptions, AutomoderationResolvable, AutoModerationActionData, CreateAutoModerationData, AutoModerationTriggerMetadata, InteractionWebhookOptions, BaseInteractionMixIns, ImageFormatWithoutAnimate, ImageFormatWithPngLottie, WebhookClientOptions, WebhookMessageOptions, ImageFormats, WebhookCreateOptions, ClientStatus, ActivityTimestamps, ActivityParty, ActivityAssets, ActivityButtons, ActivityFlagsResolvable, ActivityFlagsStrings, Oauth2Options, GroupDMChannelCreateOptions, AddRemoveRoleMember, CreateApplicationCommandPermission, CreateClientPresence, VoiceStateData, PartialEmoji, GuildMemberFlagsStrings, GuildMemberFlagsResolvable, PresenceStatus, RoleConnectionMetadata, Oauth2ClientOptions, TextInputComponent, EmojiIdentifierResolvable } from "./Typings/discord-api-types";
import { EventEmitter } from "node:events"
import { WebSocket } from "ws";

export class RoleConnections extends Base {
    public constructor(data: {}, client: Client)
    /**
     * The vanity name of the platform a Client has connected
     */
    public platformName: string
    /**
     * The username on the platform a Client has connected
     */
    public platformUsername: string
    /**
     * Object mapping keys to their `string`-ified value (max 100 characters) for the user on the platform a Client has connected
     */
    public metadata: RoleConnectionMetadata
}

export class ReactionEmoji extends Base {
    public constructor(data: {}, guildId: string, reaction: MessageReaction, client: Client)
    /**
     * The id of this Emoji
     */
    public id: string
    /**
     * The name of this Emoji
     */
    public name: string
    /**
     * Whether or not this Emoji is animated
     */
    public animated: boolean
    /**
     * The id of the Guild this belongs to
     */
    public guildId: string
    /**
     * The Emoji representation of this Reaction Emoji. If it's a Guild Emoji
     */
    public emoji: Readonly<Emoji | void>
    /**
     * The Message Reaction this belongs to
     */
    public reaction: MessageReaction
    /**
     * The Guild this belongs to
     */
    public guild: Guild
}

export class ClientPresence extends Base {
    constructor(data: {}, client: Client)
    /**
     * The Activities of this Presence
     */
    public activities: Array<Activity>
    /**
     * The status of this Presence
     */
    public status: string
    /**
     * Whether or not the Client is afk
     */
    public afk: boolean
}


export class OauthGuild extends Base {
    public constructor(data: {}, client: Client)
    /**
     * The id of this Guild
     */
    public id: string
    /**
     * The name of this Guild
     */
    public name: string
    /**
     * The icon of this Guild
     */
    public icon: string
    /**
     * Whether or not the User is an owner
     */
    public owner: boolean
    /**
     * The Permissions the User have
     */
    public permissions: Readonly<Permissions>
    /**
     * The Guild Features
     */
    public features: GuildFeatures[]
    /**
     * When this Guild was created at
     */
    public createdAt: Date
    /**
     * The timestamp of when this Guild was created at
     */
    public createdTimestamp: number
    /**
     * The Icon url of this Guild
     */
    public iconURL(options?: ImageURLOptions<ImageFormatWithoutLottie>): string | void
}

export class RichPresetAssets extends Base {
    public constructor(data: {}, client: Client)
    /**
     * The Large image of this Asset
     */
    public largeImage: string
    /**
     * The Large text of this Asset when you hover over it
     */
    public largeText: string
    /**
     * The Small image of this Asset
     */
    public smallImage: string
    /**
     * The Small text of this Asset
     */
    public smallText: string
    /**
     * The Large image url of this Asset
     */
    public largeImageURL(options?: Omit<ImageURLOptions<ImageFormatWithoutLottieAnimate>, "forceStatic">): string | void
    /**
     * The Small image url of this Asset
     */
    public smallImageURL(options?: Omit<ImageURLOptions<ImageFormatWithoutLottieAnimate>, "forceStatic">): string | void
}

export class EmojiManager extends CachedManager {
    public constructor(client: Client)
    /**
     * The cache of Emojis this holds
     */
    public cache: Collection<string, Emoji>
}

export class CachedManager extends Base {
    public constructor(holds: {}, client: Client, iterable: [], extras: {})
}

export class GroupDMChannel extends DMBasedChannels {
    /**
     * The id of the Application if this is created by one
     */
    public applicationId: string
    /**
     * The icon of this Group DM Channel
     */
    public icon: string
    /**
     * The id of the User that created this Group DM
     */
    public ownerId: string
}

export class DMBasedChannels extends Channel {
    public constructor(data: {}, client: Client)
    /**
     * The recipients of this Channel
     */
    public recipients: Collection<string, User>
    /**
     * The id of the Message sent in this Channel recently
     */
    public lastMessageId: string
    /**
     * When the last time a Message was pinned in this Channel
     */
    public lastPinnedAt: Date
    /**
     * The timestamp of when the last time a Message was pinned in this Channel
     */
    public lastPinnedTimestamp: number
    /**
     * The Message Manager of this Channel
     */
    public messages: Readonly<MessageManager>
    /**
     * Sends a Message to this Channel
     */
    public send(options: MessageOptionsData): Promise<Message>
    /**
     * Bulk-Deletes Messages in this Channel
     */
    public bulkDelete(messages: MessageBulkResolvable | number, options?: MessageDeleteBulkOptions): Promise<Collection<string, Message>>
    /**
     * Triggers a typing indicator in this Channel
     */
    public sendTyping(): Promise<this>
}

export class OauthUserConnections extends Base {
    public constructor(data: {}, client: Client)
    /**
     * The id of the Connection account
     */
    public id: string
    /**
     * The username on the Connection account
     */
    public name: string
    /**
     * The service of this Connection
     */
    public type: string
    /**
     * Whether or not this Connection is revoked
     */
    public revoked: boolean
    /**
     * Array of Partial Guild Integrations
     */
    public integrations: Array<GuildIntegration>
    /**
     * Whether or not this Connection is verified
     */
    public verified: boolean
    /**
     * Whether or not friend sync is enabled on this Connection
     */
    public friendSync: boolean
    /**
     * Whether or not the Activities related to this Connection will be shown in Presence Updates
     */
    public shownActivity: boolean
    /**
     * Whether or not this Connection has corresponding Oauth2 token
     */
    public twoWayLink: boolean
    /**
     * The visibility of this Connection
     */
    public visibility: number
}

export class OauthUser extends User {
    /**
     * The Language chosen by this User
     */
    public locale: string
    /**
     * Whether or not if this User has 2fa enabled
     */
    public mfaEnabled: boolean
    /**
     * The Nitro type this User has
     */
    public premiumType: number
    /**
     * The Email of this User. Only available if you authorized with email oauth scope
     */
    public email: string
    /**
     * Whether or not if this User's email is verified. Only available if you authorized with email oauth scope
     */
    public verified: boolean
}

export class Oauth2 extends Base {
    public constructor(data: {}, client: Client)
    /**
     * The Access Token that can be use to request data of someone
     */
    public accessToken: string
    /**
     * When this Access Token is going to expire
     */
    public expiresAt: Date
    /**
     * The timestamp of when this Access Token is going to expire
     */
    public expiresTimestamp: number
    /**
     * The Scope that is used to request this Token
     */
    public scope: Scopes
    /**
     * The type of this Token
     */
    public tokenType: string
    /**
     * The refresh token that can be used to make a new access token
     */
    public refreshToken: string
}

export class Oauth2Client extends Base {
    public constructor(client: Client, options: Oauth2ClientOptions)
    /**
     * The id of the Client this belongs to
     */
    public clientId: string
    /**
     * The Client Secret this has
     */
    public clientSecret: string
    /**
     * The root oauth2 url
     */
    public oauth2: string
    /**
     * Gets an Oauth2 Token
     */
    public getToken(options: Oauth2Options): Promise<Oauth2>
    /**
     * Refreshes an access token
     */
    public refreshToken(refreshToken: string): Promise<Oauth2>
}

export class SlashSubCommandGroup extends BaseSlashCommand {
    /**
     * The Sub Commands this Sub Command Group holds
     */
    public options: Collection<string, SlashSubCommand>
}

export class SlashSubCommand extends BaseSlashCommand {
    /**
     * The Slash Command options this Sub Command holds
     */
    public options: Collection<string, SlashOption>
}

export class BaseSlashCommand {
    public constructor(data: {})
    /**
     * The type of this Slash Command Option
     */
    public type: number
    /**
     * The name of this Slash Command Option
     */
    public name: string
    /**
     * The Name Localizations of this Slash Command Option
     */
    public nameLocalizations: Record<Locales, string>
    /**
     * The description of this Slash Command Option
     */
    public description: string
    /**
     * The Description Localizations of this Slash Command Option
     */
    public descriptionLocalizations: Record<Locales, string>
    /**
     * Whether or not this is a Slash Command Option
     */
    public isOption(): this is SlashOption
    /**
     * Whether or not this is a Slash Sub Command
     */
    public isSubcommand(): this is SlashSubCommand
    /**
     * Whether or not this is a Slash Sub Command Group
     */
    public isSubcommandGroup(): this is SlashSubCommandGroup
}

export class SlashOption extends BaseSlashCommand {
    public constructor(data: {})
    /**
     * Wheether or not this Slash Option is required
     */
    public required: boolean
    /**
     * The Choices that belongs to this Slash Option
     */
    public choices: Choices[]
    /**
     * The Channel types this Slash Option is registerd with
     */
    public channelTypes: number[]
    /**
     * The Minimum value set for this Slash Option
     */
    public minValue: number
    /**
     * The Maximum value set for this Slash Option
     */
    public maxValue: number
    /**
     * The Minimum length value set for this Stirng Option
     */
    public minLength: number
    /**
     * The Maximum length value set for this String option
     */
    public maxLength: number
    /**
     * Whether or not this Slash Option is autocomplete
     */
    public autocomplete: boolean
}

export class Activity extends Base {
    public constructor(data: {}, client: Client)
    /**
     * The name of this Activity
     */
    public name: string
    /**
     * The type of this Activity
     */
    public type: number
    /**
     * The url of this Activity stream
     */
    public url: string
    /**
     * When this Activity was added to User's session
     */
    public createdAt: Date
    /**
     * The timestamp of when this Activity was added to User's session
     */
    public createdTimestamp: number
    /**
     * The Timestamps object of when this Activity starts and ends
     */
    public timestamps: ActivityTimestamps
    /**
     * The id of the Application for the game
     */
    public applicationId: string
    /**
     * The details of what the player is currently doing
     */
    public details: string
    /**
     * User's current party status
     */
    public state: string
    /**
     * The Emoji used for the custom status
     */
    public emoji: PartialEmoji
    /**
     * The information about the current party of the player
     */
    public party: ActivityParty
    /**
     * The images and their hover texts
     */
    public assets: RichPresetAssets
    /**
     * Whether or not this Activity is an instanced of a game session
     */
    public instance: boolean
    /**
     * The Activity Flags
     */
    public flags: ActivityFlags
    /**
     * The Buttons for this Activity
     */
    public buttons: Array<ActivityButtons>
    /**
     * Checks if every properties of this Activity is equals another
     */
    public equals(activity: Activity): boolean
}

export class Presence extends Base {
    public constructor(data: {}, client: Client, extras: { guildId: string })
    /**
     * Whether or not this Presence is Partial
     */
    public partial: boolean
    /**
     * The id of the User this Presence belongs to
     */
    public userId: string
    /**
     * The id of the Guild this Presence belongs to
     */
    public guildId: string
    /**
     * The status of this Presence
     */
    public status: PresenceStatus
    /**
     * The Array of activities this Presence has
     */
    public activities: Array<Activity>
    /**
     * The platform the User of this Presence is on
     */
    public clientStatus: ClientStatus
    /**
     * The User this Presence belongs to
     */
    public user: User
    /**
     * The Guidl this Presence belongs to
     */
    public guild: Guild
    /**
     * Checks if every single properties of this Presence is equals another
     */
    public equals(presence: Presence): boolean
}

export class PresenceManager extends Base {
    public constructor(guildId: string, client: Client)
    /**
     * The id of the Guild this belongs to
     */
    public guildId: string
    /**
     * The cache of Presences this holds
     */
    public cache: Collection<string, Presence>
}

export class WebhookClient extends Base {
    public constructor(data: WebhookClientOptions, client: Client)
    /**
     * The id of this Webhook
     */
    public id: string
    /**
     * The token of this Webhook
     */
    public token: string
    /**
     * The url of this Webhook
     */
    public url: string
    /**
     * Sends a Message as this Webhook
     */
    public send<T extends boolean>(options: WebhookMessageOptions<T>): T extends true ? Promise<Message> : Promise<void>
    /**
     * Fetch the Webhook this Client represents
     */
    public fetchWebhook(): Promise<Webhook>
}

export class AutoModerationRuleAction extends Base {
    public constructor(data: {}, guildId: string, client: Client)
    /**
     * The id of the Guild this was triggered at
     */
    public guildId: string
    /**
     * The action that has been triggered
     */
    public action: AutoModerationActionData
    /**
     * The id of the Auto Moderation Rule this belongs to
     */
    public ruleId: string
    /**
     * The Rule Trigger Type which was triggered
     */
    public ruleTriggerType: number
    /**
     * The id of the User that triggers this Action
     */
    public userId: string
    /**
     * The id of the Channel that this Action was triggered in
     */
    public channelId: string
    /**
     * The id of the Message that this Action was triggered from
     */
    public messageId: string
    /**
     * The system Auto Moderation Message id that has been posted as a result of this Action
     */
    public alertSystemMessageId: string
    /**
     * The content that triggers the Action
     */
    public content: string
    /**
     * The Matched Keyword that triggered the Auto Moderation Rule
     */
    public matchedKeyword: string
    /**
     * The Matched Content that triggered the Auto Moderation Rule
     */
    public matchedContent: string
    /**
     * The Guild this was triggered from
     */
    public guild: Guild
    /**
     * The Channel this was triggered from
     */
    public channel: BaseGuildTextChannel | ThreadChannel | VoiceChannel
    /**
     * The User that triggered this Action
     */
    public user: User
    /**
     * Fetches the Message that triggered this Action. Cannot be done if you configured the Auto Moderation Rule to delete or block the Message
     */
    public fetchMessage(options?: BaseFetchOptions): Promise<Message>
    /**
     * Fetches the System Message that was posted because of this Action
     */
    public fetchAlertSystemMessage(options?: BaseFetchOptions): Promise<Message>
    /**
     * Fetches the Auto Moderation Rule this Action belongs to
     */
    public fetchRule(options?: BaseFetchOptions): Promise<AutoModeration>
}

export class AutoModeration extends Base {
    public constructor(data: {}, extras)
    /**
     * Whether or not this is a Partial object
     */
    public partial: boolean
    /**
     * The id of this Auto Moderation
     */
    public id: string
    /**
     * The id of the Guild this belongs to
     */
    public guildId: string
    /**
     * The name of this Auto Moderation
     */
    public name: string
    /**
     * The id of the User that made this Auto Moderation
     */
    public creatorId: string
    /**
     * The type of event in context of which the Auto Moderation should be checked
     */
    public eventType: number
    /**
     * Characterizes the type of content which can trigger the Auto Moderation
     */
    public triggerType: number
    /**
     * Array of strings which would be used to search for in the Message content.
     */
    public keywordFilter: string[]
    /**
     * Array of Regexes which would be used against Message content
     */
    public regexPatterns: string[]
    /**
     * The pre-defined wordsets which will be searched for in the Message content
     */
    public presets: number[]
    /**
     * List of allowed text which will be exempt from being checked in the Message content
     */
    public allowList: string[]
    /**
     * Total number of unique Roles and User mentions allowed per Message
     */
    public mentionTotalLimit: number
    /**
     * Collection of exempt Roles that should not be affected by this Auto Moderation Rule
     */
    public exemptRoles: Collection<string, Role>
    /**
     * Collection of exempt Channels that should not be affected by this Auto Moderation Rule
     */
    public exemptChannels: Collection<string, BaseGuildTextChannel | VoiceChannel>
    /**
     * Array of actions that happens when this Auto Moderation Rule is triggered
     */
    public actions: Array<AutoModerationActionData>
    /**
     * When this Auto Moderation Rule was created at
     */
    public createdAt: Date
    /**
     * The timestamp of when this this Auto Moderation was created at
     */
    public createdTimestamp: number
    /**
     * The User representation of who created this
     */
    public creator: Readonly<User>
    /**
     * Fetches this Auto Moderation
     */
    public fetch(options?: BaseFetchOptions): Promise<this>
    /**
     * Modifies this Auto Moderation Rule
     */
    public edit(options?: Omit<CreateAutoModerationData, "triggerType">): Promise<this>
    /**
     * Deletes this Auto Moderation Rule
     */
    public delete(reason?: string): Promise<this>
    /**
     * Sets the name of this Auto Moderation Rule
     */
    public setName(name: string, reason?: string): Promise<this>
    /**
     * Sets the Event Type of this Auto Moderation Rule
     */
    public setEventType(eventType: number, reason?: string): Promise<this>
    /**
     * Sets the Trigger Metadata of this Auto Moderation Rule
     */
    public setTriggerMetadata(triggerMetadata: AutoModerationTriggerMetadata, reason?: string): Promise<this>
    /**
     * Sets the Actions which will be executed when this Auto Moderation Rule is triggered
     */
    public setActions(actions: AutoModerationActionData[], reason?: string): Promise<this>
    /**
     * Sets the enabled state of this Auto Moderation Rule
     */
    public setEnabled(enabled: boolean, reason?: string): Promise<this>
    /**
     * Sets the Exempt Roles of this Auto Moderation Rule
     */
    public setExemptRoles(exemptRoles: RoleResolvable[], reason?: string): Promise<this>
    /**
     * Sets the Exempt Channels of this Auto Moderation Rule
     */
    public setExemptChannels(exemptChannels: ChannelResolvable[], reason?: string): Promise<this>
}

export class GuildAutomoderationManager extends CachedManager {
    public constructor(guildId: string, client: Client)
    /**
     * Fetches multiple or single Auto Moderation Rule(s)
     */
    public fetch(rule: AutomoderationResolvable, options?: BaseFetchOptions): Promise<AutoModeration>
    public fetch(options?: BaseFetchOptions): Promise<Collection<string, AutoModeration>>
    /**
     * Creates an Auto Moderation Rule
     */
    public create(options: CreateAutoModerationData): Promise<AutoModeration>
    /**
     * Modifies an Auto Moderation Rule
     */
    public edit(rule: AutomoderationResolvable, options?: Omit<CreateAutoModerationData, "triggerType">): Promise<AutoModeration>
    /**
     * Deletes an Auto Moderation Rule
     */
    public delete(rule: AutomoderationResolvable, reason?: string): Promise<AutoModeration>
    /**
     * The id of the Guild this belongs to
     */
    public guildId: string
    /**
     * The cache of Auto Moderation Rule this holds
     */
    public cache: Collection<string, AutoModeration>
}

export class AutomoderationManager extends Base {
    public constructor(client: Client)
    /**
     * The cache of Auto Moderation Rules this holds
     */
    public cache: Collection<string, AutoModeration>
}

export class AuditLogEntry extends Base {
    public constructor(data: {}, client: Client)
    /**
     * The id of the affected entity
     */
    public targetId: string
    /**
     * Changes made to targetId
     */
    public changes: Array<AuditLogEntryChanges>
    /**
     * The id of the User that made the changes
     */
    public userId: string
    /**
     * The id of the Audit Log Entry
     */
    public id: string
    /**
     * The Action Type that occured
     */
    public actionType: number
    /**
     * Additional info for certain event types
     */
    public options: Array<AuditLogEntryOptions>
    /**
     * The reason for the change
     */
    public reason: string
    /**
     * The User that made the changes
     */
    public executor: User
}

export class GuildAuditLog extends Base {
    public constructor(data: {}, guildId: string, client: Client)
    /**
     * The id of the Guild this belongs to
     */
    public guildId: string
    /**
     * List of Application Commands referenced in the Audit Log
     */
    public applicationCommands: Collection<string, ApplicationCommand>
    /**
     * List of Auto Moderation Rules referenced in the Audit Log
     */
    public autoModerationRules: Collection<string, AutoModeration>
    /**
     * List of Audit Log Entries referenced in the Audit Log
     */
    public entries: Collection<string, AuditLogEntry>
    /**
     * List of Guild Scheduled Events referenced in the Audit Log
     */
    public guildScheduledEvents: Collection<string, GuildScheduledEvent>
    /**
     * List of Guild Integrations referenced in the Audit Log
     */
    public integrations: Collection<string, GuildIntegration>
    /**
     * List of Threads referenced in the Audit Log
     */
    public threads: Collection<string, ThreadChannel>
    /**
     * List of Users referenced in the Audit Log
     */
    public users: Collection<string, User>
    /**
     * List of Webhooks referenced in the Audit Log
     */
    public webhooks: Collection<string, Webhook>
}

export class ReactionUserManager extends CachedManager {
    public constructor(channelId: string, messageId: string, emoji: Emoji, client: Client)
    /**
     * The id of the Chanenl this belongs to
     */
    public channelId: string
    /**
     * The id of the Message this belongs to
     */
    public messageId: string
    /**
     * The Emoji 
     */
    public emoji: Emoji
    /**
     * Fetches the User's that reacted to a Message
     */
    public fetch(options?: ReactionUserManager): Promise<Collection<string, User>>
    /**
     * Removes a User reaction or the Client
     */
    public remove(user?: UserResolvable): Promise<User | void>
    /**
     * The cache of User's that reacted to a Message
     */
    public cache: Collection<string, User>
}

export class InputTextBuilder {
    public constructor(data: InputTextBuilder)
    /**
     * The type of this Input Text
     */
    public type: 4
    /**
     * The custom id of this Input Text
     */
    public customId: string
    /**
     * The style of this Input Text
     */
    public style: number
    /**
     * The label of this Input Text
     */
    public label: string
    /**
     * Minimum input length of this Input Text
     */
    public minLength: number
    /**
     * Maximum input length of this Input Text
     */
    public maxLength: number
    /**
     * Whether or not this Input Text is required to be filled in
     */
    public required: boolean
    /**
     * The pre-filled value of this Input Text
     */
    public value: string
    /**
     * The placeholder of this Input Text
     */
    public placeholder: string
    /**
     * Sets the custom id of this Input Text
     */
    public setCustomId(customId: string): this
    /**
     * Sets the style of this Input Text
     */
    public setStyle(style: number): this
    /**
     * Sets the label of this Input Text
     */
    public setLabel(label: string): this
    /**
     * Sets the minimum input length of this Input Text
     */
    public setMinLength(minLength: number): this
    /**
     * Sets the maximum input length of this Input Text
     */
    public setMaxLength(maxLength: number): this
    /**
     * Sets whether or not this Input Text is required to be filled in
     */
    public setRequired(required: boolean): this
    /**
     * Sets the pre-filled value of this Input Text
     */
    public setValue(value: string): this
    /**
     * Sets the placeholder of this Input Text
     */
    public setPlaceholder(placeholder: string): this
    /**
     * Makes a Builder from an API Input Text data
     */
    public static from(inputText: TextInputComponent): InputTextBuilder
    toJSON(): {}
}

export class ThreadMemberManager extends CachedManager {
    public constructor(guildId: string, threadId: string, client: Client)
    /**
     * The id of the Guild this belongs to
     */
    public guildId: string
    /**
     * The id of the Thread this belongs to
     */
    public threadId: string
    /**
     * Fetches Thread Member(s) in a Thread
     */
    public fetch(member: UserResolvable, options?: BaseFetchOptions): Promise<ThreadMember>
    public fetch(options?: BaseFetchOptions): Promise<Collection<string, ThreadMember>>
    /**
     * Adds a Thread Member to a Thread
     */
    public add(member?: UserResolvable): Promise<ThreadMember>
    /**
     * Removes a Thread Member from a Thread
     */
    public remove(member?: UserResolvable): Promise<ThreadMember | void>
    /**
     * The cache of Thread Member this holds
     */
    public cache: Collection<string, ThreadMember>
}

export class ThreadManager extends CachedManager {
    public constructor(guildId: string, channelId: string, client: Client, iterable: [])
    /**
     * The id of the Guild this belongs to
     */
    public guildId: string
    /**
     * The id of the Parent this belongs to
     */
    public channelId: string
    /**
     * Creates a Thread either from a Message or not
     */
    public create(message: MessageResolvable, options: Pick<CreateThreadData, "name" | "autoArchiveDuration" | "rateLimitPerUser" | "reason">): Promise<ThreadChannel>
    public create(options: Omit<CreateThreadData, "archived" | "flags" | "locked">): Promise<ThreadChannel>
    /**
     * Fetches Public and Private Archived Threads
     */
    public fetchArchiveThreads(options?: ArchiveThreadFetchOptions): Promise<FetchedThreads>
    /**
     * The cache of Threads this holds
     */
    public cache: Collection<string, ThreadChannel>
}

export class GuildForumThreadManager extends CachedManager {
    public constructor(guildId: string, channelId: string, client: Client, iterable: [])
    /**
     * The id of the Guild this belongs to
     */
    public guildId: string
    /**
     * The id of the Parent this belongs to
     */
    public channelId: string
    /**
     * Fetches archived Threads in this Forum
     */
    public fetchArchiveThreads(options?: ArchiveThreadFetchOptions): Promise<FetchedThreads>
    /**
     * Creates a post in the Forum Channel
     */
    public createPost(options: CreateForumPostData): Promise<ThreadChannel>
    /**
     * The cache of Threads this holds
     */
    public cache: Collection<string, ThreadChannel>
}

export class ForumTags extends Base {
    public constructor(data: {}, guildId: string, client: Client)
    /**
     * The id of this Forum Tag
     */
    public id: string
    /**
     * The name of this Forum Tag
     */
    public name: string
    /**
     * Whether or not this Forum Tag can only be removed by User's with ManageThreads permission
     */
    public moderated: boolean
    /**
     * The id of the Guild this belongs to
     */
    public guildId: string
    /**
     * The id of the Emoji used for this Forum Tag
     */
    public emojiId: string
    /**
     * The name of the Emoji used for this Forum Tag
     */
    public emojiName: string
    /**
     * The Emoji used for this Forum Tag
     */
    public emoji: Emoji
    /**
     * The Guild this belongs to
     */
    public guild: Guild
}

export class InteractionWebhook extends Webhook {
    public constructor(data: InteractionWebhookOptions, client: Client)
    /**
     * The id of this Webhook
     */
    public id: string
    /**
     * The id of the Interaction this belongs to
     */
    public interactionId: string
    /**
     * The token of this Webhook
     */
    public token: string
    /**
     * The id of the Guild this belongs to
     */
    public guildId: string
    /**
     * The id of the Channel this belongs to
     */
    public channelId: string
    /**
     * Make an Interaction Response
     */
    public reply(options: InteractionReplyOptions, type?: number): Promise<void | Message>
    /**
     * Sends a Message using this Webhook
     */
    public sendMessage(options: Omit<InteractionReplyOptions, "fetchReply">): Promise<void | Message>;
    /**
     * Fetches the Message sent by this Webhook
     * @param message - The Message or `@original`
     */
    public fetchMessage(message: MessageResolvable): Promise<void | Message>;
    /**
     * Modifies a Message sent by this Webhook
     * @param message - The Message or `@original`
     */
    public editMessage(message: MessageResolvable, options: Omit<InteractionReplyOptions, "fetchReply">): Promise<void | Message>;
}

export class ContextMenuOptionResolver extends Base {
    public constructor(data: {}, guildId: string, channelId: string, client: Client)
    /**
     * The resolved data
     */
    public data: {}
    /**
     * The id of the Guild this belongs to
     */
    public guildId: string
    /**
     * The id of the Channel this belongs to
     */
    public channelId: string
    /**
     * The Guild this belongs to
     */
    public guild: Guild
    /**
     * The Channel this belongs to
     */
    public channel: BaseGuildTextChannel | DMChannel | ThreadChannel | VoiceChannel
    /**
     * Gets the User for this Context Menu
     */
    public getUser(): User | GuildMember
    /**
     * Gets the Message for this Context Menu
     */
    public getMessage(): Message
}

export class ButtonInteraction extends MessageComponentInteraction {
    /**
     * Button Interaction
     */
}

export class ModalSubmitInteraction implements BaseInteractionMixIns {
    public constructor(data: {}, guildId: string, client: Client)
    /**
     * The Client that instantiated this
     */
    public client: Client
    /**
     * The id of this Interaction
     */
    public id: string
    /**
     * The id of the Application that this Interaction is for
     */
    public applicationId: string
    /**
     * The type of this Interaction
     */
    public type: number
    /**
     * The id of the Guild this belongs to
     */
    public guildId: string
    /**
     * The id of the Channel this belongs to
     */
    public channelId: string
    /**
     * The Guild Member that invoked this Interaction
     */
    public member: GuildMember
    /**
     * The User that invoked this Interaction
     */
    public user: User
    /**
     * The token of this Interaction
     */
    public token: string
    /**
     * The Permissions of the Application that this Interaction is for
     */
    public appPermissions: Readonly<Permissions>
    /**
     * The Locale of the invoking User
     */
    public locale: string
    /**
     * The Guild preferred Locale
     */
    public guildLocale: string
    /**
     * When this Interaction was invoked at
     */
    public createdAt: Date
    /**
     * The timestamp of when this Interaction was invoked at
     */
    public createdTimestamp: number
    /**
     * The Guild this belongs to
     */
    public guild: Readonly<Guild>
    /**
     * The Channel this belongs to
     */
    public channel: Readonly<BaseGuildTextChannel | DMChannel | ThreadChannel | VoiceChannel>
    /**
     * The Webhook of this Interaction
     */
    public webhook: Readonly<InteractionWebhook>
    /**
     * The custom id of this Modal
     */
    public customId: Readonly<string>
    /**
     * Array of inputted fields in the Modal
     */
    public fields: Readonly<Array<ModalFieldData>>
    /**
     * The Message this Modal was invoked on. If Modal was invoked from a Component
     */
    public message: Readonly<Message> | void
    /**
     * Gets the Input Text value in this Modal
     * @param customId - The custom id to search for in the Modal
     * @param required - Whether or not to throw an Error when customId isn't found
     */
    public getTextInputValue(customId: string, required?: boolean): string | void
    /**
     * Replies to this Interaction
     */
    public reply(options: InteractionReplyOptions): Promise<void | Message>
    /**
     * Replies to this Interaction with type 5
     */
    public deferReply(options?: Pick<InteractionReplyOptions, "ephemeral" | "fetchReply">): Promise<void | Message>
    /**
     * Replies to this Interaction with type 6
     */
    public deferUpdate(options?: Pick<InteractionReplyOptions, "ephemeral" | "fetchReply">): Promise<void | Message>
    /**
     * Replies to this Interaction with type 7
     */
    public update(options: InteractionReplyOptions): Promise<void | Message>
    /**
     * Modifies the Reply to this Interaction
     */
    public editReply(options: MessageOptionsData): Promise<Message>
    /**
     * Deletes the Reply to this Interaction
     */
    public deleteReply(): Promise<void>
    /**
     * Follows Up this Interaction Reply
     */
    public followUp(options?: Omit<InteractionReplyOptions, "fetchReply">): Promise<Message>
    /**
     * Fetches the Reply to this Interaction
     */
    public fetchReply(): Promise<Message>
    /**
     * Whether or not this Interaction is a Chat Input Interaction
     */
    public isChatInput(): this is ChatInputCommandInteraction
    /**
     * Whether or not this Interaction is a Command Interaction
     */
    public isCommand(): this is CommandInteraction
    /**
     * Whether or not this Interaction is a Context Menu Interaction
     */
    public isContextMenu(): this is ContextMenuInteraction
    /**
     * Whether or not this Interaction is a Context Menu User Interaction
     */
    public isContextUser(): this is ContextMenuUserInteraction
    /**
     * Whether or not this Interaction is a Context Menu Message Interaction
     */
    public isContextMessage(): this is ContextMenuMessageInteraction
    /**
     * Whether or not this Interaction is a Button Interaction
     */
    public isButton(): this is ButtonInteraction
    /**
     * Whether or not this Interaction is Select Menu Interaction
     */
    public isSelect(): this is SelectMenuInteraction
    /**
     * Whether or not this Interaction is Message Component Interaction
     */
    public isComponent(): this is MessageComponentInteraction
    /**
     * Whether or not this Interaction is an AutoComplete Interaction
     */
    public isAutoComplete(): this is AutoCompleteInteraction
    /**
     * Whether or not this Interaction is a Modal Submit Interaction
     */
    public isModal(): this is ModalSubmitInteraction
    /**
     * Whether or not this Interaction is repliable. Meaning an Interaction with all Interaction Responses available. AutoComplete is not repliable as it only can use Interaction Response type 8
     */
    public isRepliable(): this is BaseInteraction
    /**
     * Whether or not this Modal is invoked from a Component Based Interaction
     */
    public isFromMessage(): boolean
    /**
     * Whether or not this Interaction happened in a Guild
     */
    public inGuild(): boolean
}

export class MessageComponentInteraction extends BaseInteraction {
    /**
     * The type of this Component Interaction
     */
    public componentType: number
    /**
     * The custom id of the Component this Interaction was invoked on
     */
    public customId: string
    /**
     * The Component this Interaction was invoked on
     */
    public component: Readonly<SelectMenu | Button>
    /**
     * Replies to this Interaction with type 7
     */
    public update(options: InteractionReplyOptions): Promise<void | Message>
    /**
     * Replies to this Interaction with typr 6
     */
    public deferUpdate(options?: Pick<InteractionReplyOptions, "fetchReply" | "ephemeral">): Promise<void | Message>
}

export class ContextMenuMessageInteraction extends ContextMenuInteraction {
    /**
     * Context Menu Message Interaction
     */
}

export class ContextMenuUserInteraction extends ContextMenuInteraction {
    /**
     * Context Menu User Interaction
     */
}

export class ContextMenuInteraction extends CommandInteraction {
    public constructor(data: {}, guildId: string, client: Client)
    /**
     * The Context Menu Resolver
     */
    public options: ContextMenuOptionResolver
}

export class ChatInputCommandInteractionOptionResolver extends Base {
    public constructor(data: {}, guildId: string, client: Client)
    /**
     * The Interaction data
     */
    public data: {}
    /**
     * The id of the Guild this belongs to
     */
    public guildId: string
    /**
     * Gets the selected Attachment in the Option
     * @param name - The name of the option
     * @param required - Whether or not to throw an Error if not found
     */
    public getAttachment(name: string, required?: boolean): Attachment
    /**
     * Gets the selected Number in the Option
     * @param name - The name of the option
     * @param required - Whether or not to throw an Error if not found
     */
    public getNumber(name: string, required?: boolean): number
    /**
     * Gets the selected Mentionable in the Option
     * @param name - The name of the option
     * @param required - Whether or not to throw an Error if not found
     */
    public getMentionable(name: string, required?: boolean): User | GuildMember | Role
    /**
     * Gets the selected Role in the Option
     * @param name - The name of the option
     * @param required - Whether or not to throw an Error if not found
     */
    public getRole(name: string, required?: boolean): Role
    /**
     * Gets the selected Channel in the Option
     * @param name - The name of the option
     * @param required - Whether or not to throw an Error if not found
     */
    public getChannel(name: string, required?: boolean): Channel
    /**
     * Gets the selected User in the Option
     * @param name - The name of the option
     * @param required - Whether or not to throw an Error if not found
     */
    public getUser(name: string, required?: boolean): User
    /**
     * Gets the selected Boolean in the Option
     * @param name - The name of the option
     * @param required - Whether or not to throw an Error if not found
     */
    public getBoolean(name: string, required?: boolean): boolean
    /**
     * Gets the selected Integer in the Option
     * @param name - The name of the option
     * @param required - Whether or not to throw an Error if not found
     */
    public getInteger(name: string, required?: boolean): number
    /**
     * Gets the selected String in the Option
     * @param name - The name of the option
     * @param required - Whether or not to throw an Error if not found
     */
    public getString(name: string, required?: boolean): string
    /**
     * Gets the selected GuildMember in the Option
     * @param name - The name of the option
     * @param required - Whether or not to throw an Error if not found
     */
    public getMember(name: string, required?: boolean): GuildMember
    /**
     * Gets the selected Subcommand in the option
     */
    public getSubcommand(): string
    /**
     * Gets the selected Subcommand Group in the option
     */
    public getSubcommandGroup(): string
}

export class CommandInteraction extends BaseInteraction {
    public constructor(data: {}, guildId: string, client: Client)
    /**
     * The type of the invoked Application Command
     */
    public commandType: number
    /**
     * The name of the invoked Application Command
     */
    public commandName: string
    /**
     * The id of the invoked Application Command
     */
    public commandId: string
}

export class ChatInputCommandInteraction extends CommandInteraction {
    public constructor(data: {}, guildId: string, client: Client)
    /**
     * The options resolver for this Chat Input Command Interaction
     */
    public options: ChatInputCommandInteractionOptionResolver
}

export class SelectMenuInteraction extends MessageComponentInteraction {
    /**
     * The selected options in this Interaction
     */
    public values: string[]
    /**
     * Gets the Channels that have been Selected in the Select Menu
     */
    public channels(): Collection<string, GuildChannel>
    /**
     * Gets the Users that have been Selected in the Select Menu
     */
    public users(): Collection<string, User>
    /**
     * Gets the Guild Members that have been Selected in the Select Menu
     */
    public members(): Collection<string, GuildMember>
    /**
     * Gets the Roles that have been Selected in the Select Menu
     */
    public roles(): Collection<string, Role>
    /**
     * Gets the Selected mentionables in the Select Menu
     */
    public mentionables(): Collection<string, GuildMember | Role | User>
}

export class BaseInteraction extends Interaction {
    /**
     * Replies to this Interaction
     */
    public reply(options: InteractionReplyOptions): Promise<void | Message>
    /**
     * Replies to this Interaction with type 5
     */
    public deferReply(options?: Pick<InteractionReplyOptions, "ephemeral" | "fetchReply">): Promise<void | Message>
    /**
     * Modifies the Reply to this Interaction
     */
    public editReply(options: MessageOptionsData): Promise<Message>
    /**
     * Deletes the Reply to this Interaction
     */
    public deleteReply(): Promise<void>
    /**
     * Follows Up this Interaction Reply
     */
    public followUp(options?: Omit<InteractionReplyOptions, "fetchReply">): Promise<Message>
    /**
     * Fetches the Reply to this Interaction
     */
    public fetchReply(): Promise<Message>
    /**
     * Replies to this Interaction with type 9
     */
    public showModal(options: ModalData): Promise<Message | void>
}

export class AutoCompleteInteraction extends Interaction {
    /**
     * The id of the invoked Application Command
     */
    public commandId: string
    /**
     * The type of the invoked Application Command
     */
    public commandType: number
    /**
     * The name of the invoked Application Command
     */
    public commandName: string
    /**
     * Gets the focused option value in this Interaction
     * @param required - Whether or not to throw an Error if no focused option is found
     */
    public getFocused(required?: boolean): string | number
    /**
     * Replies to this Interaction with type 8
     */
    public respond(choices: Choices[]): Promise<void>
}

export class Interaction extends Base {
    public constructor(data: {}, guildId: string, client: Client)
    /**
     * The id of this Interaction
     */
    public id: string
    /**
     * The id of the Application that this Interaction is for
     */
    public applicationId: string
    /**
     * The type of this Interaction
     */
    public type: number
    /**
     * The id of the Guild this belongs to
     */
    public guildId: string
    /**
     * The id of the Channel this belongs to
     */
    public channelId: string
    /**
     * The Guild Member that invoked this Interaction
     */
    public member: GuildMember
    /**
     * The User that invoked this Interaction
     */
    public user: User
    /**
     * The token of this Interaction
     */
    public token: string
    /**
     * The Permissions of the Application that this Interaction is for
     */
    public appPermissions: Readonly<Permissions>
    /**
     * The Locale of the invoking User
     */
    public locale: string
    /**
     * The Guild preferred Locale
     */
    public guildLocale: string
    /**
     * When this Interaction was invoked at
     */
    public createdAt: Date
    /**
     * The timestamp of when this Interaction was invoked at
     */
    public createdTimestamp: number
    /**
     * The Guild this belongs to
     */
    public guild: Guild
    /**
     * The Channel this belongs to
     */
    public channel: BaseGuildTextChannel | DMChannel | ThreadChannel | VoiceChannel
    /**
     * The Webhook of this Interaction
     */
    public webhook: InteractionWebhook
    /**
     * Whether or not this Interaction happened in a Guild
     */
    public inGuild(): boolean
    /**
     * Whether or not this Interaction is a Chat Input Interaction
     */
    public isChatInput(): this is ChatInputCommandInteraction
    /**
     * Whether or not this Interaction is a Command Interaction
     */
    public isCommand(): this is CommandInteraction
    /**
     * Whether or not this Interaction is a Context Menu Interaction
     */
    public isContextMenu(): this is ContextMenuInteraction
    /**
     * Whether or not this Interaction is a Context Menu User Interaction
     */
    public isContextUser(): this is ContextMenuUserInteraction
    /**
     * Whether or not this Interaction is a Context Menu Message Interaction
     */
    public isContextMessage(): this is ContextMenuMessageInteraction
    /**
     * Whether or not this Interaction is a Button Interaction
     */
    public isButton(): this is ButtonInteraction
    /**
     * Whether or not this Interaction is Select Menu Interaction
     */
    public isSelect(): this is SelectMenuInteraction
    /**
     * Whether or not this Interaction is Message Component Interaction
     */
    public isComponent(): this is MessageComponentInteraction
    /**
     * Whether or not this Interaction is an AutoComplete Interaction
     */
    public isAutoComplete(): this is AutoCompleteInteraction
    /**
     * Whether or not this Interaction is a Modal Submit Interaction
     */
    public isModal(): this is ModalSubmitInteraction
    /**
     * Whether or not this Interaction is repliable. Meaning an Interaction with all Interaction Responses available. AutoComplete is not repliable as it only can use Interaction Response type 8
     */
    public isRepliable(): this is BaseInteraction
}

export class ApplicationCommandPermission extends Base {
    public constructor(data: {}, guildId: string, commandId: string, client: Client)
    /**
     * Whether or not this Application Command Permission is Partial
     */
    public partial: boolean
    /**
     * The id of the Application Command this belongs to
     */
    public commandId: string
    /**
     * The id of the Application this belongs to
     */
    public applicationId: string
    /**
     * The id of the Guild this belongs to
     */
    public guildId: string
    /**
     * A Collection of the Application Command Permissions
     */
    public permissions: Collection<string, ApplicationCommandPermissions>
    /**
     * The Guild this belongs to
     */
    public guild: Guild
    /**
     * The Application Command this belongs to
     */
    public command: ApplicationCommand
}

export class GuildApplicationCommandPermissionsManager<T = false> extends CachedManager {
    public constructor(guildId: string, commandId: string, client: Client)
    /**
     * The id of the Application Command this belongs to
     */
    public commandId: string
    /**
     * The id of the Guild this belongs to
     */
    public guildId: string
    /**
     * Fetches an Application Command Permission
     */
    public fetch(command: ApplicationCommandResolvable, options?: BaseFetchOptions): Promise<ApplicationCommandPermission>
    public fetch(options?: BaseFetchOptions): T extends true ? Promise<ApplicationCommandPermission> : Promise<Collection<string, ApplicationCommandPermission>>
    /**
     * Creates an Application Command Permissions. Requires authorization
     */
    public create(options: CreateApplicationCommandPermission): Promise<ApplicationCommandPermission>
    /**
     * The cache of Application Command Permissions this holds
     */
    public cache: Collection<string, ApplicationCommandPermission>
}


export class ApplicationCommand extends Base {
    public constructor(data: {}, guildId: string, client: Client)
    /**
     * Whether or not this Application Command is Partial
     */
    public partial: boolean
    /**
     * The id of this Application Command
     */
    public id: string
    /**
     * The type of this Application Command
     */
    public type: number
    /**
     * The id of the Application this belongs to
     */
    public applicationId: string
    /**
     * The id of the Guild this belongs to
     */
    public guildId: string
    /**
     * The name of this Application Command
     */
    public name: string
    /**
     * The name localizations set for this Application Command
     */
    public nameLocalizations: Record<Locales, string>
    /**
     * The description of this Application Command
     */
    public description: string
    /**
     * The description localizations set for this Application Command
     */
    public descriptionLocalizations: Record<Locales, string>
    /**
     * A Collection of options this Application Command has
     */
    public options: Collection<string, BaseSlashCommand>
    /**
     * The Default Permissions that User's are required to have to use this Application Command
     */
    public defaultMemberPermissions: Readonly<Permissions>
    /**
     * Whether or not User's can use this Application Command in a DM Channel
     */
    public dmPermission: boolean
    /**
     * Autoincrementing version identifier updated during substantial record changes
     */
    public version: string
    /**
     * When this Application Command was created at
     */
    public createdAt: Date
    /**
     * The timestamp of when this Application Command was created at
     */
    public createdTimestamp: number
    /**
     * The Guild this belongs to
     */
    public guild: Guild
    /**
     * Fetches this Application Command
     */
    public fetch(options?: BaseFetchOptions): Promise<this>
    /**
     * Modifies this Application Command
     */
    public edit(options?: ModifyApplicationCommandData): Promise<this>
    /**
     * Delete this Application Command
     */
    public delete(): Promise<this>
    /**
     * The Permission Manager of this Application Command
     */
    public permissions: GuildApplicationCommandPermissionsManager<true>
}

export class GuildApplicationCommandManager extends ApplicationCommandManager {
    public constructor(guildId: string, client: Client)
    /**
     * The Application Permission Manager
     */
    public permissions: GuildApplicationCommandPermissionsManager
    /**
     * The id of the Guild this belongs to
     */
    public guildId: string
}

export class ApplicationCommandManager extends CachedManager {
    public constructor(client: Client, extras: { guildId: string })
    /**
     * Fetches Application Command(s)
     */
    public fetch(command: ApplicationCommandResolvable, options?: BaseFetchOptions): Promise<ApplicationCommand>
    public fetch(options?: ApplicationCommandFetchOptions): Promise<Collection<string, ApplicationCommand>>
    /**
     * Creates an Application Command
     */
    public create(options: ApplicationCommandData): Promise<ApplicationCommand>
    /**
     * Bulk-Overwrites Application Commands
     */
    public set(options: ApplicationCommandData[]): Promise<Collection<string, ApplicationCommand>>
    /**
     * Modifies an Application Command
     */
    public edit(command: ApplicationCommandResolvable, options?: ModifyApplicationCommandData): Promise<ApplicationCommand>
    /**
     * Deletes an Application Command
     */
    public delete(command: ApplicationCommandResolvable): Promise<void | ApplicationCommand>
    /**
     * The cache of Application Commands this holds
     */
    public cache: Collection<string, ApplicationCommand>
}

export class MessageReaction extends Base {
    public constructor(data: {}, client: Client, extras: { guildId: string, messageId: string })
    /**
     * The id of the User this belongs to
     */
    public userId: string
    /**
     * The id of the Channel this belongs to
     */
    public channelId: string
    /**
     * The id of the Message this belongs to
     */
    public messageId: string
    /**
     * The id of the Guild this belongs to
     */
    public guildId: string
    /**
     * The GuildMember this belongs to
     */
    public member: GuildMember
    /**
     * The Reaction Emoji of this Reaction
     */
    public emoji: ReactionEmoji
    /**
     * The count of reactions
     */
    public count: number
    /**
     * Whether or not this Reaction is made by the Client User
     */
    public me: boolean
    /**
     * The Guild this belongs to
     */
    public guild: Guild
    /**
     * The Channel this belongs to
     */
    public channel: BaseGuildTextChannel | DMChannel | ThreadChannel | VoiceChannel
    /**
     * The Message this belongs to
     */
    public message: Message
    /**
     * The User this belongs to
     */
    public user: User
    /**
     * The Reaction User Manager
     */
    public users: ReactionUserManager
    /**
     * Whether or not this MessageReaction is equals to another
     */
    public equals(reaction: MessageReaction): boolean
    /**
     * Removes this Reaction
     */
    public remove(): Promise<this>
}

export class TeamMember extends Base {
    public constructor(data: {}, client: Client)
    /**
     * The User's membership state on the team
     */
    public memberShipState: number
    /**
     * The Permissions
     */
    public permissions: string[]
    /**
     * The id of the parent Team of which they are a member of
     */
    public teamId: string
    /**
     * The User 
     */
    public user: User
}

export class Team extends Base {
    public constructor(data: {}, client: Client)
    /**
     * The icon of this Team
     */
    public icon: string
    /**
     * The id of this Team
     */
    public id: string
    /**
     * The members that is a part of this Team
     */
    public members: Array<TeamMember>
    /**
     * The name of this Team
     */
    public name: string
    /**
     * The id of the owner this Team belongs to
     */
    public ownerUserId: string
    /**
     * When this Team was created at
     */
    public createdAt: Date
    /**
     * The timestamp of when this Team was created at
     */
    public createdTimestamp: number
    /**
     * Returns this Team icon url
     */
    public iconURL(options?: Omit<ImageURLOptions<ImageFormatWithoutLottieAnimate>, "forceStatic">): string | void
}

export class ClientApplication extends Application {
    /**
     * The Application Command Manager
     */
    public commands: ApplicationCommandManager
    /**
     * Fetches this Application
     */
    public fetch(): Promise<this>
}

export class Emoji extends Base {
    public constructor(data: {}, client: Client, extras: { guildId: string })
    /**
     * Whether or not this is Partial
     */
    public partial: boolean
    /**
     * The id of this Emoji
     */
    public id: string
    /**
     * The name of this Emoji
     */
    public name: string
    /**
     * The id of the Guild this belongs to
     */
    public guildId: string
    /**
     * The Collection of Roles allowed to use this Emoji
     */
    public roles: Readonly<Collection<string, Role>>
    /**
     * The User who created this Emoji
     */
    public user: User
    /**
     * Whether or not this Emoji must be wrapped in colons
     */
    public requireColons: boolean
    /**
     * Whether or not this Emoji is managed
     */
    public managed: boolean
    /**
     * Whether or not this Emoji is animated
     */
    public animated: boolean
    /**
     * Whether or not this Emoji can be use
     */
    public available: boolean
    /**
     * Fetches this Emoji
     */
    public fetch(options?: BaseFetchOptions): Promise<this>
    /**
     * Modifies this Emoji
     */
    public edit(options?: Omit<CreateGuildEmojiData, "image">): Promise<this>
    /**
     * Deletes this Emoji
     */
    public delete(reason?: string): Promise<this>
    /**
     * Sets the name of this Emoji
     */
    public setName(name: string, reason?: string): Promise<this>
    /**
     * Sets the Roles that can only use this Emoji
     */
    public setRoles(roles: RoleResolvable[], reason?: string): Promise<this>
    /**
     * Returns the CDN url of this Emoji. Returns `null` if no id
     */
    public imageURL(options?: ImageURLOptions<ImageFormatWithoutLottie>): string | null
    /**
     * Checks if every single properties of this Emoji is equals another
     */
    public emoji(emoji: Emoji): boolean
}

export class GuildEmojiManager extends CachedManager {
    public constructor(guildId: string, client: Client, iterable: [])
    /**
     * The id of the Guild this belongs to
     */
    public guildId: string
    /**
     * Fetches multiple Guild Emojis or single Guild Emoji
     */
    public fetch(emoji: EmojiResolvable, options?: BaseFetchOptions): Promise<Emoji>
    public fetch(options?: BaseFetchOptions): Promise<Collection<string, Emoji>>
    /**
     * Creates a Guild Emoji
     */
    public create(options?: CreateGuildEmojiData): Promise<Emoji>
    /**
     * Modifies an Emoji
     */
    public edit(emoji: EmojiResolvable, options?: Omit<CreateGuildEmojiData, "image">): Promise<Emoji>
    /**
     * Deletes an Emoji
     */
    public delete(emoji: EmojiResolvable, reason?: string): Promise<Emoji | void>
    /**
     * The Cache of Emojis this holds
     */
    public cache: Collection<string, Emoji>
}

export class Component extends Base {
    public constructor(data: {}, client: Client)
    /**
     * The type of the this Component
     */
    public type: number
    /**
     * The Components in this Action Row
     */
    public components: Button[] | SelectMenu[]
}

export class SelectMenu {
    public constructor(data: {})
    /**
     * The type of this Select Menu
     */
    public type: number
    /**
     * The Custom ID of this Select Menu
     */
    public customId: string
    /**
     * The options of this Select Menu
     */
    public options: SelectMenuOptions[]
    /**
     * The placeholder of this Select Menu
     */
    public placeholder: string
    /**
     * The minimum value set for this Select Menu
     */
    public minValues: number
    /**
     * The maximum value set for this Select Menu
     */
    public maxValues: number
    /**
     * Whether or not this Select Menu is disabled
     */
    public disabled: boolean
}

export class Button {
    public constructor(data: {})
    /**
     * The type of this Button
     */
    public type: number
    /**
     * The style of this Button
     */
    public style: number
    /**
     * The label of this Button
     */
    public label: string
    /**
     * The Component Emoji in this Button
     */
    public emoji: ComponentEmoji
    /**
     * The Custom ID of this Button
     */
    public customId: string
    /**
     * The url of this Button if it's a Link one
     */
    public url: string
    /**
     * Whether or not this Button is disabled
     */
    public disabled: boolean
}

export class MessageInteraction extends Base {
    public constructor(data: {}, guildId: string, client: Client)
    /**
     * The type of this Interaction
     */
    public type: number
    /**
     * The id of this Interaction
     */
    public id: string
    /**
     * The name of this Interaction
     */
    public name: string
    /**
     * The id of the Guild this belongs to
     */
    public guildId: string
    /**
     * The User that invoked this Interaction
     */
    public user: User
    /**
     * The Guild Member that invoked this Interaction
     */
    public member: GuildMember
    /**
     * The Guild this belongs to
     */
    public guild: Guild
}

export class MessageReference extends Base {
    public constructor(data: {}, client: Client)
    /**
     * The id of the Message this belongs to
     */
    public messageId: string
    /**
     * The id of the Channel this belongs to
     */
    public channelId: string
    /**
     * The id of the Guild this belongs to
     */
    public guildId: string
    /**
     * Whether or not to fail if the Message Reference doesn't exist
     */
    public failIfNotExists: boolean
    /**
     * The Message this is a reply of
     */
    public message: Message
    /**
     * The Channel this belongs to
     */
    public channel: BaseGuildTextChannel | ThreadChannel | VoiceChannel
}

export class Application extends Base {
    public constructor(data: {}, client: Client)
    /**
     * The id of this Application
     */
    public id: string
    /**
     * The name of this Application
     */
    public name: string
    /**
     * The icon of this Application
     */
    public icon: string
    /**
     * The description of this Application
     */
    public description: string
    /**
     * An array of rpc origin urls, if rpc is enabled
     */
    public rpcOrigins: string[]
    /**
     * When false only app owner can join the Application's bot to guilds
     */
    public botPublic: boolean
    /**
     * When true the Application's bot will only join upon completion of the full oauth2 code grant flow
     */
    public botRequireCodeGrant: boolean
    /**
     * The url of the Application's terms of service
     */
    public termsOfServiceURL: string
    /**
     * The url of the Application's privacy policy
     */
    public privacyPolicyURL: string
    /**
     * When this Application was created at
     */
    public createdAt: Date
    /**
     * The timestamp of when this Application was created at
     */
    public createdTimestamp: number
    /**
     * The User that owned this Application
     */
    public owner: User
    /**
     * The hex encoded key for verification in Interactions and the GameSDK's GetTicket
     */
    public verifyKey: string
    /**
     * The Team this Application belongs to
     */
    public team: Team
    /**
     * If this Application is a game sold on Discord, this field will be the Guild to which it has been linked
     */
    public guildId: string
    /**
     * If this Application is a game sold on Discord, this field will be the id of the "Game SKU" that is created, if exists
     */
    public primarySkuId: string
    /**
     * If this Application is a game sold on Discord, this field will be the URL slug that links to the store page
     */
    public slug: string
    /**
     * The Application's default rich presence invite cover image hash
     */
    public coverImage: string
    /**
     * The Application Flags
     */
    public flags: Readonly<ApplicationFlags>
    /**
     * Up to 5 tags describing the content and functionality of the Application
     */
    public tags: string[]
    /**
     * Settings for the Application's default in-app authorization link, if enabled
     */
    public installParams: ApplicationInstallParams
    /**
     * The Application's default custom authorization link, if enabled
     */
    public customInstallURL: string
    /**
     * The Icon url of this Application
     */
    public iconURL(options?: Omit<ImageURLOptions<ImageFormatWithoutLottieAnimate>, "forceStatic">): string | void
    /**
     * The Cover Image url of this Application
     */
    public coverImageURL(options?: Omit<ImageURLOptions<ImageFormatWithoutLottieAnimate>, "forceStatic">): string | void
}

export class MessageActivity extends Base {
    public constructor(data: {}, client: Client)
    /**
     * The type of this Message Activity
     */
    public type: number
    /**
     * The Party id from the Rich Presence event
     */
    public partyId
}

export class ReactionManager extends CachedManager {
    public constructor(client: Client, messageId: string, guildId: string, channelId: string, iterable: [])
    /**
     * The id of the Message this belongs to
     */
    public messageId: string
    /**
     * The id of the Channel this belongs to
     */
    public channelId: string
    /**
     * Removes all Reactions in a Message
     */
    public removeAll(): Promise<Message | void>
    /**
     * The cache of Message Reaction this holds
     */
    public cache: Collection<string, MessageReaction>
}

export class Embed extends Base {
    public constructor(data: {}, client: Client)
    /**
     * The title of this Embed
     */
    public title: string
    /**
     * The description of this Embed
     */
    public description: string
    /**
     * The url of this Embed
     */
    public url: string
    /**
     * The timestamp of this Embed
     */
    public timestmap: Date
    /**
     * The color of this Embed
     */
    public color: number
    /**
     * The Embed Footer
     */
    public footer: EmbedFooter
    /**
     * The Embed Image
     */
    public image: EmbedImage
    /**
     * The Embed Thumbnail
     */
    public thumbnail: EmbedThumbnail
    /**
     * The Embed Video
     */
    public video: EmbedVideo
    /**
     * The Embed Provider
     */
    public provider: EmbedProvider
    /**
     * The Embed Author
     */
    public author: EmbedAuthor
    /**
     * The Embed Fields
     */
    public fields: EmbedFields[]
}

export class Attachment extends Base {
    public constructor(data: {}, client: Client)
    /**
     * The id of this Attachment
     */
    public id: Readonly<string>
    /**
     * The filename of this Attachment
     */
    public filename: Readonly<string>
    /**
     * The description of this Attachment
     */
    public description: Readonly<string>
    /**
     * The MIME type of this Attachment
     */
    public contentType: Readonly<string>
    /**
     * The file size of this Attachment
     */
    public size: Readonly<number>
    /**
     * The url of this Attachment
     */
    public url: Readonly<string>
    /**
     * The proxied url of this Attachment
     */
    public proxyURL: Readonly<string>
    /**
     * The height of this Attachment
     */
    public height: Readonly<number>
    /**
     * The width of this Attachment
     */
    public width: Readonly<number>
    /**
     * Whether or not this is an Ephemeral Attachment
     */
    public ephemeral: Readonly<boolean>
    /**
     * Whether or not this Attachment is spoilered
     */
    public spoiler: Readonly<boolean>
}

export class MessageMentions extends Base {
    public constructor(data: {}, guildId: string, client: Client)
    /**
     * The id of the Guild this belongs to
     */
    public guildId: string
    /**
     * The mentioned Users in the Message
     */
    public users: Collection<string, User>
    /**
     * The mentioned Guild Members in the Message
     */
    public members: Collection<string, GuildMember>
    /**
     * The mentioned Roles in the Message
     */
    public roles: Collection<string, Role>
    /**
     * The mentioned Channels in the Message
     */
    public channels: Collection<string, GuildChannel>
    /**
     * The Crossposted Channels
     */
    private _crossPostedChannels: Collection<string, GuildChannel>
    /**
     * Whether or not the Messagee has @everyone or @here mention on it
     */
    public everyone: boolean
    /**
     * The replied User this belongs to
     */
    public repliedUser: User 
    /**
     * The Guild this belongs to
     */
    public guild: Guild
}

export class Message extends Base {
    public constructor(data: {}, guildId: string, channelId: string, client: Client)
    /**
     * Whether or not this is Partial
     */
    public partial: boolean
    /**
     * The id of this Message
     */
    public id: string
    /**
     * The id of the Guild this belongs to
     */
    public guildId: string
    /**
     * The id of the Channel this belongs to
     */
    public channelId: string
    /**
     * The content of this Message
     */
    public content: string
    /**
     * The User who sent this Message
     */
    public author: User
    /**
     * The Guild Member who sent this Message. Returns `null` if fetching a Message
     */
    public member: GuildMember
    /**
     * When this Message was created at
     */
    public createdAt: Date
    /**
     * The timestamp of when this Message was created at
     */
    public createdTimestamp: number
    /**
     * When this Message was edited at
     */
    public editedAt: Date
    /**
     * The timestamp of when this Message was edited at
     */
    public editedTimestamp: number
    /**
     * Whether or not this Message is text-to-speech
     */
    public tts: boolean
    /**
     * The Message Mentions
     */
    public mentions: MessageMentions
    /**
     * The Attachments in this Message
     */
    public attachments: Collection<string, Attachment>
    /**
     * The Embeds in this Message
     */
    public embeds: Embed[]
    /**
     * The Reaction Manager of this Message
     */
    public reactions: ReactionManager
    /**
     * The nonce value of this Message
     */
    public nonce: string
    /**
     * Whether or not this Message is pinned
     */
    public pinned: boolean
    /**
     * The id of the Webhook if this is sent within Webhook
     */
    public webhookId: string
    /**
     * The type of this Message
     */
    public type: number
    /**
     * Sent with Rich Presence-related chat embeds
     */
    public activity: MessageActivity
    /**
     * Sent with Rich Presence-related chat embeds
     */
    public application: Application
    /**
     * The id of the Application
     */
    public applicationId: string
    /**
     * The reference object of this Message
     */
    public reference: MessageReference
    /**
     * The Message Flags of this Message
     */
    public flags: Readonly<MessageFlags>
    /**
     * The Interaction object if this Message was a reply to one
     */
    public interaction: MessageInteraction
    /**
     * The Thread Channel that was started from this Message
     */
    public thread: ThreadChannel
    /**
     * The components in this Message
     */
    public components: Component[]
    /**
     * Whether or not this Message is a Discord system Message.
     */
    public system: boolean
    /**
     * The Stickers sent within this Message
     */
    public stickers: Collection<string, Sticker>
    /**
     * The position of this Message in a Thread Channel
     */
    public position: number
    /**
     * The Guild this belongs to
     */
    public guild: Guild
    /**
     * The Channel this belongs to
     */
    public channel: BaseGuildTextChannel | DMChannel | ThreadChannel | VoiceChannel
    /**
     * Fetches this Message
     */
    public fetch(options?: BaseFetchOptions): Promise<this>
    /**
     * Modifies this Message
     */
    public edit(options?: MessageOptionsData): Promise<this>
    /**
     * Delete this Message
     */
    public delete(reason?: string): Promise<this>
    /**
     * Crosspost this Message to all following Channels
     */
    public crosspost(): Promise<this>
    /**
     * Reacts to this Message
     */
    public react(emoji: EmojiIdentifierResolvable): Promise<this>
    /**
     * Pins this Message
     */
    public pin(reason?: string): Promise<this>
    /**
     * Unpin this Message
     */
    public unpin(reason?: string): Promise<this>
    /**
     * Removes the Embeds in this Message
     */
    public removeEmbeds(): Promise<this>
    /**
     * Removes the Attachments in this Message
     */
    public removeAttachments(): Promise<this>
    /**
     * Removes an Attachment in this Message
     */
    public removeAttachment(attachment?: Attachment | string): Promise<this>
    /**
     * Creates a Thread from this Message
     */
    public createThread(options: Pick<CreateThreadData, "name" | "rateLimitPerUser" | "autoArchiveDuration" | "reason">): Promise<ThreadChannel>
    /**
     * Fetches the Webhook that created this Message
     */
    public fetchWebhook(): Promise<Webhook>
    /**
     * Gets the Embed fields of this Message
     */
    public getEmbedFields(): EmbedFields[]
    /**
     * Reply to this Message
     */
    public reply(options: MessageOptionsData): Promise<this>
}

export class MessageManager extends Base {
    public constructor(channelId: string, guildId: string, client: Client)
    /**
     * The id of the Channel this belogs to
     */
    public channelId: string
    /**
     * The id of the Guild this belongs to
     */
    public guildId: string
    /**
     * Fetches Message(s)
     */
    public fetch(message: MessageResolvable, options?: BaseFetchOptions): Promise<Message>
    public fetch(options?: MessageFetchOptions): Promise<Collection<string, Message>>
    /**
     * Modifies a Message
     */
    public edit(message: MessageResolvable, options?: MessageOptionsData): Promise<Message>
    /**
     * Deletes a Message
     */
    public delete(message: MessageResolvable, reason?: string): Promise<Message | void>
    /**
     * Reactions to a Message
     */
    public react(message: MessageResolvable, emoji: EmojiResolvable): Promise<Message | void>
    /**
     * Crossposts a Message to all following Channels
     */
    public crosspost(message: MessageResolvable): Promise<Message>
    /**
     * Make a reaction to a message
     * @example
     * <MessageManager>.react(message, "<a:name:id>")
     * <MessageManager>.react(message, unicode)
     * <MessageManager>.react(message, emoji)
     */
    public react(message: MessageResolvable, emoji: EmojiResolvable): Promise<Message | void>
    /**
     * Bulk-Deletes Messages in a Channel
     */
    public bulkDelete(messages: MessageBulkResolvable | number, options?: MessageDeleteBulkOptions): Promise<Collection<string, Message>>
    /**
     * Fetches Pinned Messages in this Channel
     */
    public fetchPinnedMessages(options?: BaseFetchOptions): Promise<Collection<string, Message>>
    /**
     * Pins a Message in a Channel
     */
    public pin(message: MessageResolvable, reason?: string): Promise<Message | void>
    /**
     * Unpins a Message in a Channel
     */
    public unpin(message: MessageResolvable, reason?: string): Promise<Message | void>
    /**
     * The cache of Messages this holds
     */
    public cache: Collection<string, Message>
}

export class ActivityFlags extends Bitfield {
    public constructor(...bits: ActivityFlagsResolvable[] | ActivityFlagsResolvable[][])
    /**
     * Whether or not this Bitfield has any of the specified bits
     */
    public any(...bits: ActivityFlagsResolvable[] | ActivityFlagsResolvable[][]): boolean
    /**
     * Whether or not this Bitfield has the specified bits
     */
    public has(...bits: ActivityFlagsResolvable[] | ActivityFlagsResolvable[][]): boolean
    /**
     * Adds bits to this Bitfield
     */
    public add(...bits: ActivityFlagsResolvable[] | ActivityFlagsResolvable[][]): this
    /**
     * Removes bits from this Bitfield
     */
    public remove(...bits: ActivityFlagsResolvable[] | ActivityFlagsResolvable[][]): this
    /**
     * Returns an Array of missing bitfield strings from this bitfield
     */
    public missing(): ActivityFlagsStrings[]
    /**
     * Whether or not this bitfield is equals another
     */
    public equals(bitfield: ActivityFlags): boolean
    /**
     * Serialize this Bitfield
     */
    public serialize(): Record<ActivityFlagsStrings, bigint>
    /**
     * Maps the Bitfields to an Array
     */
    public toArray(): ActivityFlagsResolvable[]
    /**
     * Stringifies the Bitfield
     */
    public toString(): string
    /**
     * Freezes this Bitfield
     */
    public freeze(): Readonly<this>
    /**
     * The FLAGS of this Bitfield
     */
    public static Flags: Record<ActivityFlagsStrings, bigint>
    /**
     * Combine ALL Bitfields in to one
     */
    public static All: bigint
}

export class MessageFlags extends Bitfield {
    public constructor(...bits: MessageFlagsResolvable[] | MessageFlagsResolvable[][])
    /**
     * Whether or not this Bitfield has any of the specified bits
     */
    public any(...bits: MessageFlagsResolvable[] | MessageFlagsResolvable[][]): boolean
    /**
     * Whether or not this Bitfield has the specified bits
     */
    public has(...bits: MessageFlagsResolvable[] | MessageFlagsResolvable[][]): boolean
    /**
     * Adds bits to this Bitfield
     */
    public add(...bits: MessageFlagsResolvable[] | MessageFlagsResolvable[][]): this
    /**
     * Removes bits from this Bitfield
     */
    public remove(...bits: MessageFlagsResolvable[] | MessageFlagsResolvable[][]): this
    /**
     * Returns an Array of missing bitfield strings from this bitfield
     */
    public missing(): MessageFlagsStrings[]
    /**
     * Whether or not this bitfield is equals another
     */
    public equals(bitfield: MessageFlags): boolean
    /**
     * Serialize this Bitfield
     */
    public serialize(): Record<MessageFlagsStrings, bigint>
    /**
     * Maps the Bitfields to an Array
     */
    public toArray(): MessageFlagsResolvable[]
    /**
     * Stringifies the Bitfield
     */
    public toString(): string
    /**
     * Freezes this Bitfield
     */
    public freeze(): Readonly<this>
    /**
     * The FLAGS of this Bitfield
     */
    public static Flags: Record<MessageFlagsStrings, bigint>
    /**
     * Combine ALL Bitfields in to one
     */
    public static All: bigint
}

export class StickerPack extends Base {
    public constructor(data: {}, client: Client)
    /**
     * The id of this Sticker Pack
     */
    public id: string
    /**
     * The Collection of Stickers this holds
     */
    public stickers: Collection<string, Sticker>
    /**
     * The name of this Sticker Pack
     */
    public name: string
    /**
     * The id of the Sticker Pack Sku
     */
    public skuId: string
    /**
     * The id of the Sticker which is shown in Sticker Pack icon
     */
    public coverStickerId: string
    /**
     * The description of this Sticker Pack
     */
    public description: string
    /**
     * The id of the Sticker Pack's banner image
     */
    public bannerAssetId: string
    /**
     * Fetches this Sticker Pack
     */
    public fetch(): Promise<this>
    /**
     * The Banner Asset URL of this Sticker Pack
     */
    public bannerAssetURL(options?: Omit<ImageURLOptions<ImageFormatWithoutLottieAnimate>, "forceStatic">): string | void
}

export class Sticker extends Base {
    public constructor(data: {}, guildId: string, client: Client)
    /**
     * Whether or not this is Partial
     */
    public partial: boolean
    /**
     * The id of this Sticker
     */
    public id: string
    /**
     * The id of the Sticker Pack this Sticker belongs to
     */
    public packId: string
    /**
     * The name of this Sticker
     */
    public name: string
    /**
     * The description of this Sticker
     */
    public description: string
    /**
     * When this Sticker was created at
     */
    public createdAt: Date
    /**
     * The timestamp of when this Sticker was created at
     */
    public createdTimestamp: number
    /**
     * Autocomplete suggestion tags of this Sticker
     */
    public tags: string
    /**
     * The type of this Sticker
     */
    public type: number
    /**
     * The Format Type of this Sticker
     */
    public formatType: number
    /**
     * Whether or not this Sticker can be used
     */
    public available: boolean
    /**
     * The id of the Guild this belongs to
     */
    public guildId: string
    /**
     * The User that created this Sticker
     */
    public user: User
    /**
     * The sort order of this Sticker in the pack
     */
    public sortValue: number
    /**
     * The Guild this belongs to
     */
    public guild: Guild
    /**
     * Fetches this Sticker
     */
    public fetch(options?: BaseFetchOptions): Promise<this>
    /**
     * Modifies this Sticker
     */
    public edit(options?: Pick<CreateGuildStickerData, "description" | "reason" | "tags" | "name">): Promise<this>
    /**
     * Deletes this Sticker
     */
    public delete(reason?: string): Promise<this>
    /**
     * Sets the name of this Sticker
     */
    public setName(name: string, reason?: string): Promise<this>
    /**
     * Sets the description of this Sticker
     */
    public setDescription(description: string, reason?: string): Promise<this>
    /**
     * Sets the tags of this Sticker
     */
    public setTags(tags: string, reason?: string): Promise<this>
    /**
     * Fetches the Nitro Pack this Sticker is from
     */
    public fetchPack(): Promise<StickerPack>
    /**
     * Whether or not this Sticker is equals to another Sticker
     */
    public equals(sticker: Sticker): boolean
    /**
     * The Sticker image url
     */
    public imageURL(options?: Omit<ImageURLOptions<ImageFormatWithPngLottie>, "size" | "forceStatic">): string | void
}

export class GuildStickerManager extends CachedManager {
    public constructor(guildId: string, client: Client, iterable: [])
    /**
     * The id of the Guild this belongs to
     */
    public guildId: string
    /**
     * Fetches Guild Sticker(s)
     */
    public fetch(sticker: StickerResolvable, options?: BaseFetchOptions): Promise<Sticker>
    public fetch(options?: BaseFetchOptions): Promise<Collection<string, Sticker>>
    /**
     * Creates a Guild Sticker
     */
    public create(options: CreateGuildStickerData): Promise<Sticker>
    /**
     * Modifies a Guild Sticker
     */
    public edit(sticker: StickerResolvable, options?: Pick<CreateGuildStickerData, "name" | "description" | "tags" | "reason">): Promise<Sticker>
    /**
     * Deletes a Guild Sticker
     */
    public delete(sticker: StickerResolvable, reason?: string): Promise<Sticker | void>
    /**
     * The cache of Stickers this holds
     */
    public cache: Collection<string, Sticker>
}

export class StageInstance extends Base {
    public constructor(data: {}, client: Client, extras: { guildId: string })
    /**
     * Whether or not this is Partial
     */
    public partial: boolean
    /**
     * The id of this Stage Instance
     */
    public id: string
    /**
     * The id of the Guild this belongs to
     */
    public guildId: string
    /**
     * The id of the Stage Chanenl this is currently being hosted at
     */
    public channelId: string
    /**
     * The topic of this Stage Instance
     */
    public topic: string
    /**
     * The Privacy Level of this Stage Instance
     */
    public privacyLevel: number
    /**
     * The id of the Guild Scheduled Event for this Stage Instance
     */
    public guildScheduledEventId: string
    /**
     * When this Stage Instance was created at
     */
    public createdAt: Date
    /**
     * The timestamp of when this Stage Instance was created at
     */
    public createdTimestamp: number
    /**
     * The Guild this belongs to
     */
    public guild: Guild
    /**
     * The Stage Channel this is currently being hosted on
     */
    public stageChannel: StageChannel
    /**
     * The Guild Scheduled Event that is hosted on this Stage Channel
     */
    public guildScheduledEvent: GuildScheduledEvent | void
    /**
     * Fetches this Stage Instance
     */
    public fetch(options?: BaseFetchOptions): Promise<this>
    /**
     * Modifies this Stage Instance
     */
    public edit(options?: Pick<CreateStageInstanceData, "privacyLevel" | "topic" | "reason">): Promise<this>
    /**
     * Deletes this Stage Instance
     */
    public delete(reason?: string): Promise<this>
    /**
     * Sets the topic of this Stage Instance
     */
    public setTopic(topic: string, reason?: string): Promise<this>
    /**
     * Sets the privacy level of this Stage Instance
     */
    public setPrivacyLevel(privacyLevel: number, reason?: string): Promise<this>
    /**
     * Whether or not this Stage Instance is equals another
     */
    public equals(stageInstance: StageInstance): boolean
}

export class StageInstanceManager extends CachedManager {
    public constructor(guildId: string, client: Client, iterable: [])
    /**
     * The id of the Guild this belongs to
     */
    public guildId: string
    /**
     * Creates a Guild Stage Instance
     */
    public create(options: CreateStageInstanceData): Promise<StageInstance>
    /**
     * Modify a Guild Stage Instance
     */
    public edit(channel: ChannelResolvable, options?: Pick<CreateStageInstanceData, "reason" | "topic" | "privacyLevel">): Promise<StageInstance>
    /**
     * Deletes a Stage Instance
     */
    public delete(channel: ChannelResolvable, reason?: string): Promise<void>
    /**
     * The cache of Stage Instances this holds
     */
    public cache: Collection<string, StageInstance>
}

export class PartialChannel extends Base {
    public constructor(data: {}, client: Client)
    /**
     * The name of this Channel
     */
    public name: string
    /**
     * The position of this Channel in the Guild
     */
    public position: number
    /**
     * The topic of this Channel
     */
    public topic: string
    /**
     * The bitrate of this Channel if it's a Voice Channel
     */
    public bitrate: number
    /**
     * The limit of Users that can join this Voice Channel
     */
    public userLimit: number
    /**
     * Whether or not this Channel is nsfw
     */
    public nsfw: boolean
    /**
     * The Rate Limit Per User of this Channel
     */
    public rateLimitPerUser: number
    /**
     * The id of the Parent of this Channel
     */
    public parentId: number
    /**
     * The Permission Overwrites of this Channel
     */
    public permissionOverwrites: PermissionOverwritesData[]
    /**
     * The id of this Channel
     */
    public id: number
    /**
     * The type of this Channel
     */
    public type: number
}

export class PartialRole extends Base {
    public constructor(data: {}, client: Client)
    /**
     * The id of this Role
     */
    public id: number
    /**
     * The name of this Role
     */
    public name: string
    /**
     * The color of this Role
     */
    public color: number
    /**
     * Whether or not this Role appears separately in the sidebar
     */
    public hoist: boolean
    /**
     * The Permissions of this Role
     */
    public permissions: Readonly<Permissions>
    /**
     * Whether or not this Role is mentionable
     */
    public mentionable: boolean
}

export class PartialGuild extends Base {
    public constructor(data: {}, client: Client)
    /**
     * The name of this Guild
     */
    public name: string
    /**
     * The description of this Guild
     */
    public description: string
    /**
     * The Verification Level of this Guild
     */
    public verificationLevel: number
    /**
     * The Default Message Notification of this Guild
     */
    public defaultMessageNotifications: number
    /**
     * The Explicit Content Filter of this Guild
     */
    public explicitContentFilter: number
    /**
     * The Preferred Locale of this Guild
     */
    public preferredLocale: string
    /**
     * The Afk Timeout of this Guild
     */
    public afkTimeout: number
    /**
     * A Collection of Roles this Guild holds
     */
    public roles: Collection<number, PartialRole>
    /**
     * A Collection of Channels this Guild holds
     */
    public channels: Collection<number, PartialChannel>
    /**
     * The id of the Afk Channel of this Guild
     */
    public afkChannelId: string
    /**
     * The id of the System Channel of this Guild
     */
    public systemChannelId: string
    /**
     * The System Channel Flags of this Guild
     */
    public systemChannelFlags: SystemChannelFlags
    /**
     * The hash of the icon of this Guild
     */
    public iconHash: string
}

export class GuildTemplate extends Base {
    public constructor(data: {}, guildId: string, client: Client)
    /**
     * Whether or not this is Partial
     */
    public partial: boolean
    /**
     * The code of this Guild Template
     */
    public code: string
    /**
     * The name of this Guild Template
     */
    public name: string
    /**
     * The description of this Guild Template
     */
    public description: string
    /**
     * The number of times this Guild Template has been used
     */
    public usageCount: number
    /**
     * The id of the Guild this belongs to
     */
    public guildId: string
    /**
     * The id of the User that created this
     */
    public creatorId: string
    /**
     * The User that created this
     */
    public creator: User
    /**
     * When this Guild Template was created at
     */
    public createdAt: Date
    /**
     * The timestamp of when this Guild Template was created at
     */
    public createdTimestamp: number
    /**
     * When this Guild Template was last synced to the source Guild
     */
    public updatedAt: Date
    /**
     * The timestamp of when this Guild Template was last synced to the source Guild
     */
    public updatedTimestamp: number
    /**
     * The id of the Guild this Guild Template is based on
     */
    public sourceGuildId: string
    /**
     * The Guild snapshot this Guild Template contains
     */
    public serializedSourceGuild: PartialGuild
    /**
     * Whether or not this Guild Template has unsynced changes
     */
    public dirty: boolean
    /**
     * The Guild this belongs to
     */
    public guild: Guild
    /**
     * Fetches this Guild Template
     */
    public fetch(): Promise<this>
    /**
     * Modifies this Guild Template
     */
    public edit(options: CreateGuildTemplateData): Promise<this>
    /**
     * Delete this Guild Template
     */
    public delete(): Promise<this>
    /**
     * Sets the name of this Guild Template
     */
    public setName(name: string): Promise<this>
    /**
     * Sets the description of this Guild Template
     */
    public setDescription(description: string): Promise<this>
    /**
     * Creates a Guild based on this Guild Template
     */
    public createGuild(options: CreateTemplateFromGuildData): Promise<Guild>
    /**
     * Syncs this Guild Template
     */
    public sync(): Promise<this>
}

export class GuildTemplateManager extends Base {
    public constructor(guildId: string, client: Client)
    /**
     * The id of the Guild this belongs to
     */
    public guildId: string
    /**
     * Fetches Guild Template(s) from a Guild
     */
    public fetch(code: GuildTemplateResolvable): Promise<GuildTemplate>
    public fetch(): Promise<Collection<string, GuildTemplate>>
    /**
     * Creates a Template in a Guild
     */
    public createTemplate(options: CreateGuildTemplateData): Promise<GuildTemplate>
    /**
     * Create a Guild from a Template
     */
    public createGuildFromTemplate(code: string, options: CreateTemplateFromGuildData): Promise<Guild>
    /**
     * Sync a Guild Template
     */
    public syncTemplate(code: string): Promise<GuildTemplate>
    /**
     * Modifies a Guild Template
     */
    public edit(code: string, options: CreateGuildTemplateData): Promise<GuildTemplate>
    /**
     * Deletes a Guild Template
     */
    public delete(code: string): Promise<GuildTemplate>
}

export class GuildScheduledEventUser extends Base {
    public constructor(data: {}, client: Client, extras: { guildId: string, scheduledEventId: string })
    /**
     * Whether or not this obj is Partial
     */
    public partial: boolean
    /**
     * The id of the Guild Scheduled Event this belongs to
     */
    public guildScheduledEventId: string
    /**
     * The id of the Guild this belongs to
     */
    public guildId: string
    /**
     * The User of this Guild Scheduled Event User
     */
    public user: User
    /**
     * The Guild Member of this Guild Scheduled Event User. Only given if fetched with `withMember` option
     */
    public member: GuildMember | void
    /**
     * The Guild this belongs to
     */
    public guild: Guild
    /**
     * The Guild Scheduled Event this belongs to
     */
    public guildScheduledEvent: GuildScheduledEvent
}

export class GuildScheduledEventUserManager extends CachedManager {
    public constructor(guildId: string, scheduledEventId: string, client: Client)
    /**
     * The id of the Guild this belongs to
     */
    public guildId: string
    /**
     * The id of the Guild Scheduled Event this belongs to
     */
    public scheduledEventId: string
    /**
     * Fetches the Users subscribed to a Guild Scheduled Event
     */
    public fetch(options?: GuildScheduledEventUserFetchOptions): Promise<Collection<string, GuildScheduledEventUser>>
    /**
     * The cache of Guild Scheduled Event Users this holds
     */
    public cache: Collection<string, GuildScheduledEventUser>
}

export class GuildScheduledEvent extends Base {
    public constructor(data: {}, client, extras: { guildId: string })
    /**
     * Whether or not this obj is Partial
     */
    public partial: boolean
    /**
     * The id of this Guild Scheduled Event
     */
    public id: string
    /**
     * The id of the Guild this belongs to
     */
    public guildId: string
    /**
     * The Channel id in which the Guild Scheduled Event will be hosted, or null if scheduled entity type is `EXTERNAL`
     */
    public channelId: string
    /**
     * The id of the User that created this Guild Scheduled Event
     */
    public creatorId: string
    /**
     * The name of this Guild Scheduled Event
     */
    public name: string
    /**
     * The description of this Guild Scheduled Event
     */
    public description: string
    /**
     * When this Guild Scheduled Event scheduled to start
     */
    public scheduledStartAt: Date
    /**
     * The timestamp of when this Guild Scheduled Event scheduled to start
     */
    public scheduledStartTimestamp: number
    /**
     * When this Guild Scheduled Event scheduled to end
     */
    public scheduledEndAt: Date
    /**
     * The timestamp of when this Guild Scheduled Event scheduled to end
     */
    public scheduledEndTimestamp: number
    /**
     * The privacy level of the Guild Scheduled Event
     */
    public privacyLevel: number
    /**
     * The status of this Guild Scheduled Event
     */
    public status: number
    /**
     * The entity type of this Guild Scheduled Event
     */
    public entityType: number
    /**
     * The id of the entity of this Guild Scheduled Event
     */
    public entityId: string
    /**
     * The Entity Metadata of this Guild Scheduled Event
     */
    public entityMetadata: { location: string }
    /**
     * When this Guild Scheduled Event was created
     */
    public createdAt: Date
    /**
     * The timestamp of when this Guild Scheduled Event was created
     */
    public createdTimestamp: number
    /**
     * The User that created this Guild Scheduled Event
     */
    public creator: User
    /**
     * The count of Users subscribed to this Guild Scheduled Event
     */
    public userCount: number
    /**
     * The Cover Image hash of this Guild Scheduled Event
     */
    public coverImage: string
    /**
     * The Guild this belongs to
     */
    public guild: Guild
    /**
     * The Channel in which the Guild Scheduled Event will be hosted
     */
    public channel: GuildChannel
    /**
     * The Guild Scheduled Event User Manager
     */
    public users: GuildScheduledEventUserManager
    /**
     * The Event link
     */
    public url: string
    /**
     * Fetches this Guild Scheduled Event
     */
    public fetch(options?: GuildScheduledEventFetchOptions): Promise<this>
    /**
     * Modifies this Guild Scheduled Event
     */
    public edit(options: ModifyGuildScheduledEventData): Promise<this>
    /**
     * Sets the Channel where this Guild Scheduled Event will be hosted at
     */
    public setChannel(channel: ChannelResolvable, reason?: string): Promise<this>
    /**
     * Sets the Entity Metadata of this Guild Scheduled Event
     */
    public setEntityMetadata(entityMetadata: GuildScheduledEventEntityMetadata, reason?: string): Promise<this>
    /**
     * Sets the name of this Guild Scheduled Event
     */
    public setName(name: string, reason?: string): Promise<this>
    /**
     * Sets the Privacy Level of this Guild Scheduled Event
     */
    public setPrivacyLevel(privacyLevel: number, reason?: string): Promise<this>
    /**
     * Sets the time when this Guild Scheduled Event is going to start
     */
    public setScheduledStartTime(scheduledStart: DateResolvable, reason?: string): Promise<this>
    /**
     * Sets the time when this Guild Scheduled Event is going to end
     */
    public setScheduledEndTime(scheduledEnd: DateResolvable, reason?: string): Promise<this>
    /**
     * Sets the description of this Guild Scheduled Event
     */
    public setDescription(description: string, reason?: string): Promise<this>
    /**
     * Sets the Entity Type of this Guild Scheduled Event
     */
    public setEntityType(entityType: number, reason?: string): Promise<this>
    /**
     * Sets the status of this Guild Scheduled Event
     */
    public setStatus(status: number, reason?: string): Promise<this>
    /**
     * Sets the Cover Image of this Guidl Scheduled Event
     */
    public setImage(image: BufferResolvable, reason?: string): Promise<this>
    /**
     * Deletes this Guild Scheduled Event
     */
    public delete(): Promise<this>
    /**
     * Returns this Guild Scheduled Event Cover Image URL
     */
    public coverImageURL(options?: Omit<ImageURLOptions<ImageFormatWithoutLottieAnimate>, "forceStatic">): string | void
}

export class GuildScheduledEventManager extends ScheduledEventManager {
    public constructor(guildId: string, client: Client)
    /**
     * The id of the Guild this belongs to
     */
    public guildId: string
    /**
     * Fetches Guild Scheduled Event(s) of a Guild
     */
    public fetch(scheduledEvent: GuildScheduledEventResolvable, options?: GuildScheduledEventFetchOptions): Promise<GuildScheduledEvent>
    public fetch(options?: GuildScheduledEventFetchOptions): Promise<Collection<string, GuildScheduledEvent>>
    /**
     * Creates a Guild Scheduled Event
     */
    public create(options: CreateGuildScheduledEventData): Promise<GuildScheduledEvent>
    /**
     * Modifies a Guild Scheduled Event
     */
    public edit(scheduledEvent: GuildScheduledEventResolvable, options: ModifyGuildScheduledEventData): Promise<GuildScheduledEvent>
    /**
     * Deletes a Guild Scheduled Event
     */
    public delete(scheduledEvent: GuildScheduledEventResolvable): Promise<GuildScheduledEvent | void>
}

export class ScheduledEventManager extends Base {
    public constructor(client: Client)
    /**
     * The cache of Guild Scheduled Events this holds
     */
    public cache: Collection<string, GuildScheduledEvent>
}

export class VoiceState extends Base {
    public constructor(data: {}, client: Client, extras: { guildId: string })
    /**
     * Whether or not this obj is Partial
     */
    public partial: boolean
    /**
     * The id of the Guild this belongs to
     */
    public guildId: string
    /**
     * The id of the Channel this belongs to
     */
    public channelId: string
    /**
     * The id of the User this belongs to
     */
    public userId: string
    /**
     * The Guild Member of this Voice State
     */
    public member: Readonly<GuildMember | void>
    /**
     * The id of the session
     */
    public sessionId: string
    /**
     * Whether or not this User is deafened by the server
     */
    public deaf: boolean
    /**
     * Whether or not this User is muted by the server
     */
    public muted: boolean
    /**
     * Whether or not this User is locally deafened
     */
    public selfDeaf: boolean
    /**
     * Whether or not this User is locally muted
     */
    public selfMute: boolean
    /**
     * Whether or not this User is streaming using "Go Live"
     */
    public selfStream: boolean
    /**
     * Whether or not this User's camera is enabled
     */
    public selfVideo: boolean
    /**
     * Whether or not this User's permission to speak is denied
     */
    public suppress: boolean
    /**
     * When the User asked to speak
     */
    public requestToSpeak: Date
    /**
     * The timestamp of when the User asked to speak
     */
    public requestToSpeakTimestamp: number
    /**
     * Modifies this Voice State
     */
    public edit(options?: ModifyVoiceStateData): Promise<this>
    /**
     * Moves a Guild Member to a different Chanenl
     */
    public setChannel(channel: ChannelResolvable, reason?: string): Promise<this>
    /**
     * Sets the Guild Member muted state in the Voice Channel
     */
    public setMute(mute: boolean, reason?: string): Promise<GuildMember>
    /**
     * Sets the Guidl Member deafened state in the Voice Channel
     */
    public setDeaf(deaf: boolean, reason?: string): Promise<GuildMember>
    /**
     * Sets the time when the Client can speak in a Stage Channel
     */
    public setRequestToSpeak(requestToSpeak: DateResolvable): Promise<this>
    /**
     * Suppresses a User in the Stage Channel
     */
    public setSuppress(suppress: boolean): Promise<this>
    /**
     * Whether or not this VoiceState is equals another
     */
    public equals(voiceState: VoiceState): boolean
}

export class VoiceStateManager extends CachedManager {
    public constructor(guildId: string, client: Client, iterable: [])
    /**
     * The id of the Guild this belongs to
     */
    public guildId: string
    /**
     * Modifies a User's Voice States
     */
    public modifyUserVoice(user: UserResolvable, options?: ModifyVoiceStateData): Promise<VoiceState>
    /**
     * The cache of Voice States this holds
     */
    public cache: Collection<string, VoiceState>
}

export class WelcomeChannel extends Base {
    public constructor(data: {}, guildId: string, client: Client)
    /**
     * The id of this Channel
     */
    public channelId: string
    /**
     * The description of this Channel
     */
    public description: string
    /**
     * The id of the Emoji of this Channel
     */
    public emojiId: string
    /**
     * The name of the Emoji of this Channel
     */
    public emojiName: string
    /**
     * The id of the Guild this belongs to
     */
    public guildId: string
    /**
     * The Guild this belongs to
     */
    public guild: Guild
    /**
     * The Channel of this Welcome Channel
     */
    public channel: TextChannel | NewsChannel | ForumChannel
}

export class WelcomeScreen extends Base {
    public constructor(data: {}, guildId: string, client: Client)
    /**
     * The server description in the Welcome Screen
     */
    public description: string
    /**
     * The Channels shown in the Welcome Screen
     */
    public channels: Collection<string, WelcomeChannel>
    /**
     * The id of the Guild this belongs to
     */
    public guildId: string
    /**
     * The Guild this belongs to
     */
    public guild: Guild
}

export class PartialWidgetChannel extends Base {
    public constructor(data: {}, client: Client)
    /**
     * The id of this Channel
     */
    public id: string
    /**
     * The name of this Channel
     */
    public name: string
    /**
     * The position of this Channel
     */
    public position: number
}

export class PartialWidgetUser extends Base {
    public constructor(data: {}, client: Client)
    /**
     * The id of this User
     */
    public id: string
    /**
     * The username of this User
     */
    public username: string
    /**
     * The avatar of this User
     */
    public avatar: string
    /**
     * The status of this User
     */
    public status: string
    /**
     * The avatar url of this User
     */
    public avatarURL: string
}

export class GuildWidget extends Base {
    public constructor(data: {}, client: Client)
    /**
     * The id of the Guild this belongs to
     */
    public id: string
    /**
     * The name of the Guild this belongs to
     */
    public name: string
    /**
     * Instant Invite for the Guild specified Widget Invite Channel
     */
    public instantInvite: string
    /**
     * Voice and Stage Channels which are accessible by @everyone
     */
    public channels: Collection<string, PartialWidgetChannel>
    /**
     * Special Widget User objects that includes Users Presence
     */
    public members: Collection<string, PartialWidgetUser>
    /**
     * Number of online members in this Guild
     */
    public presenceCount: number
}   

export class GuildIntegrationManager extends CachedManager {
    public constructor(guildId: string, client: Client)
    /**
     * The id of the Guild this belongs to
     */
    public guildId: string
    /**
     * Fetches the Integration of this Guild
     */
    public fetch(options?: BaseFetchOptions): Promise<Collection<string, GuildIntegration>>
    /**
     * The Collection of Guild Integration this holds
     */
    public cache: Collection<string, GuildIntegration>
}

export class IntegrationApplication extends Base {
    public constructor(data: {}, client: Client)
    /**
     * The id of the Application
     */
    public id: string
    /**
     * The name of the Application
     */
    public name: string
    /**
     * The icon of the Application
     */
    public icon: string
    /**
     * The description of the Application
     */
    public description: string
    /**
     * The bot associated with this Application
     */
    public bot: User
}

export class GuildIntegration extends Base {
    public constructor(data: {}, guildId: string, client: Client)
    /**
     * Whether or not this obj is Partial
     */
    public partial: boolean
    /**
     * The id of this GuildIntegration
     */
    public id: string
    /**
     * The name of this GuildIntegration
     */
    public name: string
    /**
     * The type of this GuildIntegration
     */
    public type: string
    /**
     * Whether or not this GuildIntegration is enabled
     */
    public enabled: boolean
    /**
     * Whether or not this GuildIntegration is syncing
     */
    public syncing: boolean
    /**
     * Id that this GuildIntegration uses for "subscribers"
     */
    public roleId: string
    /**
     * Whether emoticons should be synced for this GuildIntegration (twitch only currently)
     */
    public enableEmoticons: boolean
    /**
     * The behavior of expiring subscribers
     */
    public expireBehavior: number
    /**
     * The grace period (in days) before expiring subscribers
     */
    public expireGracePeriod: number
    /**
     * The user for this GuildIntegration
     */
    public user: User
    /**
     * The GuildIntegration account information
     */
    public account: GuildIntegrationAccount
    /**
     * When this GuildIntegration was last synced
     */
    public syncedAt: Date
    /**
     * The timestamp of when this GuildIntegration was last synced
     */
    public syncedTimestamp: number
    /**
     * How many subscribers this GuildIntegration has
     */
    public subscriberCount: number
    /**
     * The Integration Application object
     */
    public application: IntegrationApplication
    /**
     * The scopes this GuildIntegration Application has been authorized for
     */
    public scopes: Scopes[]
    /**
     * The id of the Guild this belongs to
     */
    public guildId: string
    /**
     * The Guild this belongs to
     */
    public guild: Guild
}

export class GuildInviteManager extends CachedManager {
    public constructor(guildId: string, client: Client)
    /**
     * The id of the Guild this belongs to
     */
    public guildId: string
    /**
     * Fetches the Invites of this Guild
     */
    public fetch(options: BaseFetchOptions): Promise<Collection<string, Invite>>
    /**
     * Deletes an Invite in the Guild
     */
    public delete(code: string, reason?: string): Promise<Invite>
    /**
     * The Invites this holds
     */
    public cache: Collection<string, Invite>
}

export class UserManager extends CachedManager {
    public constructor(client: Client)
    /**
     * Fetches a User in Discord
     */
    public fetch(user: UserResolvable, options?: BaseFetchOptions): Promise<User>
    /**
     * Modifies the Client User
     */
    public edit(options?: ModifyCurrentUserData): Promise<ClientUser>
    /**
     * Creates a DM between a User and Client User
     */
    public createDm(user: UserResolvable, options?: BaseFetchOptions): Promise<DMChannel>
    /**
     * Creates a Group DM Channel between multiple Users and the Client User
     */
    public createGroupDM(options: GroupDMChannelCreateOptions): Promise<GroupDMChannel>
    /**
     * Sends a Message to a User
     */
    public send(user: UserResolvable, options: MessageOptionsData): Promise<Message>
    /**
     * Fetches a User using their Access Token
     */
    public fetchOauthUser(accessToken: string): Promise<OauthUser>
    /**
     * Fetches a User's Connections
     */
    public fetchOauthUserConnections(accessToken: string): Promise<Collection<string, OauthUserConnections>>
    /**
     * Gets the DMChannel between the User and the Client
     */
    public dmChannel(user: UserResolvable): DMChannel
    /**
     * Gets the current User's Role Connection data
     */
    public getUserApplicationRoleConnections(accessToken: string): Promise<RoleConnections>
    /**
     * The cache of User this holds
     */
    public cache: Collection<string, User>
}

export class GuildBan extends Base {
    public constructor(data: {}, client: Client, extras: { guildId: string })
    /**
     * Whether or not this obj is Partial
     */
    public partial: boolean
    /**
     * The reason of this GuildBan
     */
    public reason: string
    /**
     * The User this belongs to
     */
    public user: User
    /**
     * The id of the Guild this belongs to
     */
    public guildId: string
    /**
     * The Guild this belongs to
     */
    public guild: Readonly<Guild>
    /**
     * Fetches this GuildBan
     */
    public fetch(options?: BaseFetchOptions): Promise<this>
    /**
     * Removes this GuildBan
     */
    public remove(reason?: string): Promise<this>
}

export class GuildBanManager extends Base {
    public constructor(guildId: string, client: Client)
    /**
     * The id of the Guild this belongs to
     */
    public guildId: string
    /**
     * Fetches the GuildBan(s) of this Guild
     */
    public fetch(user: UserResolvable, options?: BaseFetchOptions): Promise<GuildBan>
    public fetch(options?: GuildBanFetchOption): Promise<Collection<string, GuildBan>>
    /**
     * Creates a Guild Ban
     */
    public create(user: UserResolvable, options?: { deleteMessageSeconds: number, reason: string }): Promise<GuildBan>
    /**
     * Removes a Guild Ban
     */
    public remove(user: UserResolvable, reason?: string): Promise<GuildBan | void>
    /**
     * The cache of GuildBans this holds
     */
    public cache: Collection<string, GuildBan>
}
export class Role extends Base {
    public constructor(data: {}, guildId: string, client: Client)
    /**
     * Whether or not this obj is Partial
     */
    public partial: boolean
    /**
     * The id of this Role
     */
    public id: string
    /**
     * The name of this Role
     */
    public name: string
    /**
     * The color of this Role
     */
    public color: number
    /**
     * Whether or not this Role shows up in the sidebar separately
     */
    public hoist: boolean
    /**
     * The icon hash of this Role
     */
    public icon: string
    /**
     * The unicode emoji of this Role
     */
    public unicodeEmoji: string
    /**
     * The position of this Role in the Guild
     */
    public position: number
    /**
     * The Permissions this Role has in the Guild
     */
    public permissions: Readonly<Permissions>
    /**
     * When this Role was created at
     */
    public createdAt: Date
    /**
     * The timestamp of when this Role was created at
     */
    public createdTimestamp: number
    /**
     * Whether or not this Role is an integration Role or a booster Role
     */
    public managed: boolean
    /**
     * Whether or not people can mention this Role
     */
    public mentionable: boolean
    /**
     * The Role tags
     */
    public tags: RoleTags
    /**
     * The id of the Guild this belongs to
     */
    public guildId: string
    /**
     * The Guild this belongs to
     */
    public guild: Guild
    /**
     * When stringified returns its mention format
     */
    public toString(): string
    /**
     * Clone this Role
     */
    public clone(reason?: string): Promise<this>
    /**
     * Modifies this Role
     */
    public edit(options?: GuildRoleCreateData): Promise<this>
    /**
     * Deletes this Role
     */
    public delete(reason?: string): Promise<this>
    /**
     * Sets the name of this Role
     */
    public setName(name: string, reason?: string): Promise<this>
    /**
     * Sets the Permissions of this Role
     */
    public setPermissions(permissions: PermissionFlagsResolvable, reason?: string): Promise<this>
    /**
     * Sets the color of this Role
     */
    public setColor(color: ColorResolvable, reason?: string): Promise<this>
    /**
     * Sets whether or not this Role should be shown separately in the sidebar
     */
    public setHoist(hoist: boolean, reason?: string): Promise<this>
    /**
     * Sets the icon of this Role
     */
    public setIcon(icon: BufferResolvable, reason?: string): Promise<this>
    /**
     * Sets the unicode Emoji of this Role
     */
    public setUnicodeEmoji(unicodeEmoji: string, reason: string): Promise<this>
    /**
     * Sets whether or not this Role can be mentioned
     */
    public setMentionable(mentionable: boolean, reason?: string): Promise<this>
    /**
     * Sets the position of this Role
     */
    public setPosition(position: number, reason?: string): Promise<this>
    /**
     * Returns this Role's icon url
     */
    public iconURL(options?: Omit<ImageURLOptions<ImageFormatWithoutLottieAnimate>, "forceStatic">): string | void
    /**
     * Whether or not the Client User can manage this Role
     */
    public manageable(): boolean
    /**
     * Compare the position of this Role to another
     */
    public comparePositionTo(role: RoleResolvable): number
    /**
     * The Permissions of this Role on a Channel
     */
    public permissionsIn(channel: ChannelResolvable): Readonly<Permissions>
    /**
     * The GuildMembers that has this Role
     */
    public members: Readonly<Collection<string, GuildMember>>
}

export class GuildMemberRoleManager extends CachedManager {
    public constructor(member: GuildMember, guildId: string, iterable: Role[], client: Client)
    /**
     * The GuildMember this belongs to
     */
    public member: GuildMember
    /**
     * The id of the Guild this belongs to
     */
    public guildId: string
    /**
     * Adds a Role(s) to this GuildMember
     */
    public add(roles: MultiRoleResolvable, reason?: string): Promise<GuildMember>
    public add(roles: RoleResolvable, reason?: string): Promise<GuildMember>
    /**
     * Remove Role(s) from this GuildMember
     */
    public remove(roles: MultiRoleResolvable, reason?: string): Promise<GuildMember>
    public remove(roles: RoleResolvable, reason?: string): Promise<GuildMember>
    /**
     * Overwrites the Role(s) of this GuildMember
     */
    public set(roles: MultiRoleResolvable, reason?: string): Promise<GuildMember>
    /**
     * The display color of this GuildMember
     */
    public displayColor(): number
    /**
     * Compare the position of two Roles. 1 if `role1` is higher than `role2`. -1 if `role1` is lower than `role2`. 0 if equals
     */
    public comparePositionTo(role1: RoleResolvable, role2: RoleResolvable): number
    /**
     * Gets the Role for a Discord Bot
     */
    public botRoleFor(user?: UserResolvable): Role
    /**
     * The everyone Role
     */
    public everyone: Readonly<Role>
    /**
     * Gets the Premium Subscriber Role of a Guild
     */
    public premiumSubscriberRole: Readonly<Role>
    /**
     * Returns the highest Role
     */
    public highest: Readonly<Role>
    /**
     * The cache of the GuildMember Roles
     */
    public cache: Collection<string, Role>
}

export class RoleManager extends CachedManager {
    public constructor(guildId: string, client: Client, iterable: [])
    /**
     * Gets the Role for a Discord Bot
     */
    public botRoleFor(user?: UserResolvable): Role
    /**
     * Gets the Premium Subscriber Role of a Guild
     */
    public premiumSubscriberRole: Readonly<Role>
    /**
     * Returns the highest Role
     */
    public highest: Readonly<Role>
    /**
     * The cache of Roles this holds
     */
    public cache: Collection<string, Role>
    /**
     * Compare the position of two Roles. 1 if `role1` is higher than `role2`. -1 if `role1` is lower than `role2`. 0 if equals
     */
    public comparePositionTo(role1: RoleResolvable, role2: RoleResolvable): number
    /**
     * Fetches Guild Roles
     */
    public fetch(options?: BaseFetchOptions): Promise<Collection<string, Role>>
    /**
     * Creates a Guild Role
     */
    public create(options?: GuildRoleCreateData): Promise<Role>
    /**
     * Modifies a Guild Role
     */
    public edit(role: RoleResolvable, options?: GuildRoleCreateData): Promise<Role>
    /**
     * Deletes a Guild Role
     */
    public delete(role: RoleResolvable, reason?: string): Promise<Role | void>
    /**
     * Modify Roles position
     */
    public modifyPositions(roles: ModifyGuildRolePositions[], reason?: string): Promise<Collection<string, Role>>
    /**
     * Clones a Guild Role
     */
    public clone(role: RoleResolvable, reason?: string): Promise<Role>
    /**
     * The everyone Role
     */
    public everyone: Readonly<Role>
    /**
     * The id of the Guild this belongs to
     */
    public guildId: string
}

export class Util {
    /**
     * Resolves a Color to a readable integer
     */
    public static resolveColor(color: ColorResolvable): number
    /**
     * Generates a Date ISO string
     */
    public static generateDateISOString(date?: DateResolvable): string
    /**
     * Generates a Buffer from something
     */
    public static getBuffer(attachment: BufferResolvable): Promise<Buffer>
    /**
     * Generates a Data URI scheme from something
     */
    public static generateDataURI(buffer?: BufferResolvable, mimeType?: ImageFormatWithoutLottie): Promise<string>
    /**
     * Transforms a Base 64 string to a Buffer
     */
    public static base64ToBuffer(buffer: string | Buffer): Buffer
    /**
     * Generates a Discord codeblock
     */
    public static codeBlock(text: string, language?: Languages): string
}

export class ClientUser extends User {
    public constructor(data: {}, client: Client)
    /**
     * Modifies this User
     */
    public edit(options?: ModifyCurrentUserData): Promise<this>
    /**
     * Sets the username of this User
     */
    public setUsername(username: string): Promise<this>
    /**
     * Sets the avatar of this User
     */
    public setAvatar(avatar: BufferResolvable): Promise<this>
    /**
     * Sets the Presence of this User
     */
    public setPresence(presence: CreateClientPresence): void
}

export class User extends Base {
    public constructor(data: {}, client: Client)
    /**
     * Whether or not this User is a Partial obj
     */
    public partial: boolean
    /**
     * The id of this User
     */
    public id: string
    /**
     * The username of this User
     */
    public username: string
    /**
     * The discriminator of this User
     */
    public discriminator: number
    /**
     * The avatar hash of this User
     */
    public avatar: string
    /**
     * Whether or not this User is a bot
     */
    public bot: boolean
    /**
     * The banner hash of this User
     */
    public banner: string
    /**
     * The accent color of this User
     */
    public accentColor: number
    /**
     * The flags of this User
     */
    public flags: UserFlags
    /**
     * Whether or not if this User is an Official Discord System user 
     */
    public system: boolean
    /**
     * The tag of this User. E.g: Discord#0000
     */
    public tag: string
    /**
     * The GuildMember of this User in the specified Guild
     */
    public memberOf(guild: GuildResolvable, accessToken?: string): Promise<GuildMember>
    /**
     * Whether or not this User is equals another
     */
    public equals(user: User): boolean
    /**
     * When stringified mentions this User
     */
    public toString(): string
    /**
     * The Base 16 version of this User's accent color
     */
    public hexAccentColor(): number
    /**
     * The Base 64 version of this User's accent color
     */
    public base64AccentColor(): string
    /**
     * Fetches this User
     */
    public fetch(options?: BaseFetchOptions): Promise<this>
    /**
     * Creates a DM between the Client User and this User
     */
    public createDm(options?: BaseFetchOptions): Promise<DMChannel>
    /**
     * Gets the DMChannel between the User and the Client
     */
    public dmChannel(): DMChannel
    /**
     * The url of this User's avatar
     */
    public avatarURL(options?: ImageURLOptions<ImageFormatWithoutLottie>): string | void
    /**
     * Displays this User's avatar. If none shows the default
     */
    public displayAvatarURL(options?: ImageURLOptions<ImageFormatWithoutLottie>): string
    /**
     * Shows this User's default avatar
     */
    public defaultUserAvatarURL(options?: Omit<ImageURLOptions<".png">, "size" | "forceStatic">): string
    /**
     * Returns this User's banner
     */
    public bannerURL(options?: ImageURLOptions<ImageFormatWithoutLottie>): string | void
}

export class GuildMember extends Base {
    public constructor(data: {}, guildId: string, client: Client)
    /**
     * Whether or not this Guild Member is Partial
     */
    public partial: boolean
    /**
     * The id of this Guild Member
     */
    public id: string
    /**
     * The nickname of this Guild Member
     */
    public nickname: string
    /**
     * The avatar hash of this Guild Member
     */
    public avatar: string
    /**
     * The Role Manager of this Guild Member
     */
    public roles: Readonly<GuildMemberRoleManager>
    /**
     * When this Guild Member joined this Guild
     */
    public joinedAt: Date
    /**
     * The timestamp of when this Guild Member joined this Guild
     */
    public joinedTimestamp: number
    /**
     * When this Guild Member boosted the Guild
     */
    public premiumSince: Date
    /**
     * The timestamp of when this Guild Member boosted the Guild
     */
    public premiumSinceTimestamp: number
    /**
     * Whether or not this Guild Member is deaf
     */
    public deaf: boolean
    /**
     * Whether or not this Guild Member is muted
     */
    public mute: boolean
    /**
     * Whether or not this Guild Member is yet to pass the MemberShip Screening
     */
    public pending: boolean
    /**
     * The Permissions of this Guild Member in this Guild. Taking only Roles and Owner status in to account
     */
    public permissions: Readonly<Permissions>
    /**
     * How long this Guild Member would be Guild timeouted for
     */
    public communicationDisabledUntil: Date
    /**
     * The timestamp of how long this Guild Member would be Guild timeouted for
     */
    public communicationDisabledUntilTimestamp: number
    /**
     * The id of the Guild this belongs to
     */
    public guildId: string
    /**
     * The User representation of this Guild Member
     */
    public user: Readonly<User>
    /**
     * The Voice State of this Guild Member
     */
    public voice: Readonly<VoiceState>
    /**
     * The Presence of this Guild Member
     */
    public presence: Readonly<Presence>
    /**
     * The flags of this GuildMember
     */
    public flags: Readonly<GuildMemberFlags>
    /**
     * When stringified mentions this Guild Member
     */
    public toString(): string
    /**
     * Fetches this GuildMember
     */
    public fetch(options?: BaseFetchOptions): Promise<this>
    /**
     * Modifies this Guild Member
     */
    public edit(options: ModifyGuildMemberData): Promise<this>
    /**
     * Kicks this Guild Member from the Guild
     */
    public kick(reason?: string): Promise<this>
    /**
     * Sets the nickname of this Guild Member
     */
    public setNickname(nickname: string, reason?: string): Promise<this>
    /**
     * Timeouts this Guild Member in the Guild
     */
    public setCommunicationDisabledUntil(communicationDisabledUntil: DateResolvable, reason?: string): Promise<this>
    /**
     * Bans this Guild Memember
     */
    public ban(options?: { deleteMessageSeconds: number, reason: string }): Promise<this>
    /**
     * The avatar url of this Guild Member
     */
    public avatarURL(options?: ImageURLOptions<ImageFormatWithoutLottie>): string
    /**
     * Displays this Guild Member avatar. If null returns the Guild Member User avatar
     */
    public displayAvatarURL(options?: ImageURLOptions<ImageFormatWithoutLottie>): string
    /**
     * Gets the Permissions of this GuildMember in a Channel
     */
    public permissionsIn(channel: ChannelResolvable): Readonly<Permissions>
    /**
     * Whether or not this GuildMember is equals another
     */
    public equals(member: GuildMember): boolean
    /**
     * Whether or not this GuildMember is timeouted
     */
    public isCommunicationDisabled(): boolean
    /**
     * Whether or not this GuildMember is manageable. Meaning Client User is higher in Role hierarchy, or Client User is an owner
     */
    public manageable(): boolean
    /**
     * Whether or not this GuildMember is kickable by the Client User
     */
    public isKickable(): boolean
    /**
     * Whether or not this GuildMember is timeoutable by the Client User
     */
    public isModeratable(): boolean
}

export class GuildMemberManager extends CachedManager {
    public constructor(guildId: string, iterable: [], client: Client)
    /**
     * Fetches a GuildMember(s)
     */
    public fetch(member: UserResolvable, options?: BaseFetchOptions): Promise<GuildMember>
    public fetch(options?: GuildMemberFetchOptions): Promise<Collection<string, GuildMember>>
    /**
     * Searches for GuildMembers
     */
    public search(options: { query: string, limit?: number }): Promise<Collection<string, GuildMember>>
    /**
     * Modify a GuildMember
     */
    public edit(member: UserResolvable, options?: ModifyGuildMemberData): Promise<GuildMember>
    /**
     * Kicks a GuildMember from a Guild
     */
    public kick(member: UserResolvable, reason?: string): Promise<GuildMember | void>
    /**
     * Bans a GuildMember from a Guild
     */
    public ban(member: UserResolvable, options?: { deleteMessageSeconds: number, reason: string }): Promise<GuildMember | User | void>
    /**
     * Removes a GuildBan from a GuildMember
     */
    public unban(member: UserResolvable, reason?: string): Promise<User | void>
    /**
     * Adds a User to a Guild
     * @param options.accessToken - The access token of the User from Oauth
     */
    public addMember(user: UserResolvable, options: Omit<ModifyGuildMemberData, "channel" | "communicationDisabledUntil" | "reason"> | { accessToken: string }): Promise<GuildMember>
    /**
     * Adds a Role to a GuildMember
     */
    public addRole(user: UserResolvable, options: AddRemoveRoleMember): Promise<GuildMember>
    /**
     * Removes a Role from a GuildMember
     */
    public removeRole(user: UserResolvable, options: AddRemoveRoleMember): Promise<GuildMember>
    /**
     * The cache of GuildMember this holds
     */
    public cache: Collection<string, GuildMember>
}

export class GuildPreview extends Base {
    public constructor(data: {}, client: Client)
    /**
     * The id of this Guild
     */
    public id: string
    /**
     * The name of this Guild
     */
    public name: string
    /**
     * The icon of this Guild
     */
    public icon: string
    /**
     * The splash of this Guild
     */
    public splash: string
    /**
     * The discovery splash of this Guild
     */
    public discoverySplash: string
    /**
     * The Emojis of this Guild
     */
    public emojis: Collection<string, Emoji>
    /**
     * The Guild Features
     */
    public features: GuildFeatures[]
    /**
     * The Approximate Presence Count of this Guild
     */
    public approximatePresenceCount: number
    /**
     * The Approximate Member Count of this Guild
     */
    public approximateMemberCount: number
    /**
     * The description of this Guild
     */
    public description: string
    /**
     * The Stickers of this Guild
     */
    public stickers: Collection<string, Sticker>
    /**
     * The url of this Guild icon
     */
    public iconURL(options?: ImageURLOptions<ImageFormatWithoutLottie>): string | void
    /**
     * The url of this Guild Splash
     */
    public splashURL(options?: Omit<ImageURLOptions<ImageFormatWithoutLottieAnimate>, "forceStatic">): string | void
    /**
     * The url of this Guild Discovery Splash
     */
    public discoverySplashURL(options?: Omit<ImageURLOptions<ImageFormatWithoutLottieAnimate>, "forceStatic">): string | void
}

export class Webhook extends Base {
    public constructor(data: {}, client: Client)
    /**
     * The id of this Webhook
     */
    public id: string
    /**
     * The type of this Webhook
     */
    public type: number
    /**
     * The id of the Guild this belongs to
     */
    public guildId: string
    /**
     * The id of the Channel this belongs to
     */
    public channelId: string
    /**
     * The User that created this Webhook
     */
    public user: User
    /**
     * The name of this Webhook
     */
    public name: string
    /**
     * The avatar of this Webhook
     */
    public avatar: string
    /**
     * The token of this Webhook
     */
    public token: string
    /**
     * The bot/OAuth2 Application that created this Webhook
     */
    public applicationId: string
    /**
     * The Guild of the Channel that this Webhook is following (returned for Channel Follower Webhooks)
     */
    public sourceGuild: PartialGuildData
    /**
     * The Channel that this Webhook is following (returned for Channel Follower Webhooks)
     */
    public sourceChannel: PartialChannelData
    /**
     * The url of this Webhook
     */
    public url: Readonly<string | void>
    /**
     * Fetches this Webhook
     */
    public fetch(): Promise<this>
    /**
     * Modifies this Webhook
     */
    public edit(options?: WebhookCreateOptions | { channel?: ChannelResolvable }): Promise<this>
    /**
     * Delete this Webhook
     */
    public delete(reason?: string): Promise<this>
    /**
     * Sets the name of this Webhook
     */
    public setName(name: string, reason?: string): Promise<this>
    /**
     * Sets the avatar of this Webhook
     */
    public setAvatar(avatar: BufferResolvable, reason?: string): Promise<this>
    /**
     * Sets the new Channel this Webhook going to be on
     */
    public setChannel(channel: ChannelResolvable, reason?: string): Promise<this>
    /**
     * Sends a Message with this Webhook
     */
    public sendMessage(options: WebhookPayloadOptions): Promise<Message | void>
    /**
     * Fetches the Message sent by this Webhook
     * @param message - The Message or `@original`
     */
    public fetchMessage(message: MessageResolvable, options?: Pick<WebhookPayloadOptions, "thread">): Promise<Message | void>
    /**
     * Modifies a Message sent by this Webhook
     * @param message - The Message or `@original`
     */
    public editMessage(message: MessageResolvable, options: Omit<WebhookPayloadOptions, "username" | "avatar" | "threadName">): Promise<void | Message>
    /**
     * Returns this Webhook avatar url
     */
    public avatarURL(options?: Omit<ImageURLOptions<ImageFormatWithoutLottieAnimate>, "forceStatic">): string | void
}

export class ThreadMember extends Base {
    public constructor(data: {}, client: Client, extras: { guildId: string, threadId: string })
    /**
     * Whether or not this Thread Member is Partial
     */
    public partial: boolean
    /**
     * The Thread Id this belongs to
     */
    public threadId: string
    /**
     * The id of the Thread Member
     */
    public userId: string
    /**
     * When this Thread Member joined this Thread
     */
    public joinedAt: Date
    /**
     * The timestamp of when this Thread Member joined this Thread
     */
    public joinedTimestamp: number
    /**
     * The Guild this belongs to
     */
    public guild: Guild
    /**
     * The User representation of this Thread Member
     */
    public user: User
    /**
     * The Guild Member representation of this Thread Member
     */
    public member: GuildMember
    /**
     * The ThreadChannel this belongs to
     */
    public channel: ThreadChannel
}

export class FetchedThreads extends Base {
    public constructor(data: {}, client: Client)
    /**
     * The Collection of Threads
     */
    public threads: Collection<string, ThreadChannel>
    /**
     * The Collection of Thread Members
     */
    public members: Collection<string, ThreadMember>
    /**
     * Whether there are potentially additional threads that could be returned on a subsequent call
     */
    public hasMore: boolean
}

export class PermissionOverwrites extends Base {
    public constructor(data: {}, channelId: string, client: Client)
    /**
     * The id of the User or Role this belongs to
     */
    public id: string
    /**
     * The type of this Overwrite
     */
    public type: string
    /**
     * The allowed Permissions of this Overwrite
     */
    public allow: Readonly<Permissions>
    /**
     * The denied Permissions of this Overwrite
     */
    public deny: Readonly<Permissions>
    /**
     * The Channel id this belongs to
     */
    public channelId: string
    /**
     * The Channel this belongs to
     */
    public channel: GuildChannel
    /**
     * Modifies this Overwrite
     */
    public edit(permissions: Record<PermissionFlagsStrings, boolean | null>, reason?: string): Promise<GuildChannel>
    /**
     * Deletes this Overwrite
     */
    public delete(reason?: string): Promise<GuildChannel>
    /**
     * Whether or not this Permission Overwrites is equals another
     */
    public equals(overwrites: PermissionOverwrites): boolean
}

export class PermissionOverwritesManager extends CachedManager {
    public constructor(channelId: string, client: Client, iterable: [])
    /**
     * The Channel id this belongs to
     */
    public channelId: string
    /**
     * Modifies a Channel Overwrites
     */
    public edit(userOrRole: UserResolvable | RoleResolvable, options: ChanenlOverwritesData): Promise<GuildChannel>
    /**
     * Creates a Channel Permission Overwrites or edit it if it exist
     */
    public create(userOrRole: UserResolvable | RoleResolvable, options: ChanenlOverwritesData): Promise<GuildChannel>
    /**
     * Overwrites the Permission Overwrites of a Guild Channel
     */
    public set(options: Array<ChanenlOverwritesData & Pick<PermissionOverwritesData, "id">>, reason?: string): Promise<GuildChannel>
    /**
     * Deletes an Overwrite from a Guild Channel
     */
    public delete(userOrRole: UserResolvable | RoleResolvable, reason?: string): Promise<GuildChannel>
    /**
     * The cache of Overwrites this holds
     */
    public cache: Collection<string, PermissionOverwrites>
}

export class PartialInviteChannel extends Base {
    public constructor(data: {}, client: Client)
    /**
     * The id of this Chanenl
     */
    public id: string
    /**
     * The name of this Channel
     */
    public name: string
    /**
     * The type of this Channel
     */
    public type: number
}

export class PartialInviteGuild extends Base {
    public constructor(data: {}, client: Client)
    /**
     * The id of this Guild
     */
    public id: string
    /**
     * The name of this Guild
     */
    public name: string
    /**
     * The splash of this Guild
     */
    public splash: string
    /**
     * The banner of this Guild
     */
    public banner: string
    /**
     * The description of this Guild
     */
    public description: string
    /**
     * The icon of this Guild
     */
    public icon: string
    /**
     * The Guild Features
     */
    public features: GuildFeatures[]
    /**
     * The Verification Level of this Guild
     */
    public verificationLevel: number
    /**
     * The vanity url code of this Guild
     */
    public vanityUrlCode: string
    /**
     * The Nsfw Level of this Guild
     */
    public nsfwLevel: number
    /**
     * The Premium Subscription Count of this Guild
     */
    public premiumSubscriptionCount: number
    /**
     * Whether or not this Guild is NSFW
     */
    public nsfw: boolean
    /**
     * The Welcome Screen of this Guild
     */
    public welcomeScreen: WelcomeScreen
    /**
     * The icon url of this Guild
     */
    public iconURL(options?: ImageURLOptions<ImageFormatWithoutLottie>): string | void
    /**
     * The splash url of this Guild
     */
    public splashURL(options?: Omit<ImageURLOptions<ImageFormatWithoutLottieAnimate>, "forceStatic">): string | void
    /**
     * The banner url of this Guild
     */
    public bannerURL(options?: ImageURLOptions<ImageFormatWithoutLottie>): string | void
}

export class Invite extends Base {
    public constructor(data: {}, client: Client)
    /**
     * Whether or not this Invite is partial
     */
    public partial: boolean
    /**
     * The code of this invite
     */
    public code: string
    /**
     * The Partial Guild this Invite belongs to
     */
    public guild: PartialInviteGuild | Guild
    /**
     * The Partial Channel this Invite belongs to
     */
    public channel: PartialInviteChannel | GuildChannel
    /**
     * The inviter of this Invite
     */
    public inviter: string
    /**
     * The type of target this Invite is for
     */
    public targetType: number
    /**
     * The target User this Invite is for
     */
    public targetUser: string
    /**
     * The target Application this Invite is for
     */
    public targetApplication: string
    /**
     * The approximate count of online members, returned from the GET `/invites/<code>` endpoint when `with_counts` is true
     */
    public approximatePresenceCount: number
    /**
     * The approximate count of total members, returned from the GET `/invites/<code>` endpoint when `with_counts` is true
     */
    public approximateMemberCount: number
    /**
     * When this Invite expires at
     */
    public expiresAt: Date
    /**
     * The timestamp of when this Invite expires at
     */
    public expiresTimestamp: number
    /**
     * The Guild Scheduled Event data this Invite is for
     */
    public guildScheduledEvent: GuildScheduledEvent
    /**
     * The count of people that used this Invite
     */
    public uses: number
    /**
     * The maximum uses that this Invite can be use
     */
    public maxUses: number
    /**
     * The maximum age this Invite can stay in Discord
     */
    public maxAge: number
    /**
     * Whether or not this Invite gives temporary membership
     */
    public temporary: boolean
    /**
     * When this Invite was created at
     */
    public createdAt: Date
    /**
     * The timestamp of when this Invite was created at
     */
    public createdTimestamp: number
}

export class CategoryChannel extends GuildChannel {
    public constructor(data: {}, client: Client, extras: { guildId: string })
    /**
     * The Channels in this Category Channel
     */
    public childrens: Readonly<Collection<string, GuildChannel>>
}

export class ThreadChannel extends Channel {
    public constructor(data: {}, client: Client, extras: { guildId: string })
    /**
     * The id of the last sent Message in this Channel
     */
    public lastMessageId: string
    /**
     * The Rate Limit Per User of this Channel
     */
    public rateLimitPerUser: number
    /**
     * The id of the owner of this Thread
     */
    public ownerId: string
    /**
     * The id of the parent of this Channel
     */
    public parentId: string
    /**
     * When the last Message was last pinned at
     */
    public lastPinnedAt: Date
    /**
     * The timestamp of when the last Message was last pinned at
     */
    public lastPinnedTimestamp: number
    /**
     * The count of Messages sent in this Thread
     */
    public messageCount: number
    /**
     * The count of people in this Thread
     */
    public memberCount: number
    /**
     * Whether or not this Thread is archived
     */
    public archived: boolean
    /**
     * The duration of the auto archive of this Thread
     */
    public autoArchiveDuration: number
    /**
     * When the last time the archive state of this Thread was changed
     */
    public archiveAt: Date
    /**
     * The timestamp of when the last time the archive state of this Thread was changed
     */
    public archiveTimestamp: number
    /**
     * Whether or not this Thread is locked
     */
    public locked: boolean
    /**
     * Whether or not other people can invite people in this Thread
     */
    public invitable: boolean
    /**
     * When this Channel was created at
     */
    public createdAt: Date
    /**
     * The timestamp of when this Channel was created at
     */
    public createdTimestamp: number
    /**
     * The Thread Member obj of the current User
     */
    public member: Readonly<ThreadMember>
    /**
     * The Channel Flags of this Thread
     */
    public flags: ChannelFlags
    /**
     * The Message Manager of this Channel
     */
    public messages: Readonly<MessageManager>
    /**
     * The Applied Tags to this Thread in the Forum Channel
     */
    public appliedTags: Readonly<Collection<string, ForumTags>>
    /**
     * The Thread Member Manager of this Thread
     */
    public members: ThreadMemberManager
    /**
     * The Guild this Channel belongs to
     */
    public guild: Guild
    /**
     * The url of this Channel
     */
    public url: string
    /**
     * The Permission Overwrites of this Channel
     */
    public permissionOverwrites: PermissionOverwritesManager
    /**
     * Triggers a typing indicator in this Thread
     */
    public sendTyping(): Promise<this>
    /**
     * Bulk-Deletes Messages in this Thread
     */
    public bulkDelete(messages: MessageBulkResolvable | number, options?: MessageDeleteBulkOptions): Promise<Collection<string, Message>>
    /**
     * Fetches the starter Message of this Thread if there is one
     */
    public fetchStarterMessage(options?: BaseFetchOptions): Promise<Message>
    /**
     * Sends a Message to this Thread
     */
    public send(options: MessageOptionsData): Promise<Message>
    /**
     * Sets the name of this Thread
     */
    public setName(name: string, reason?: string): Promise<this>
    /**
     * Sets the archive state of this Thread
     */
    public setArchived(archived: boolean, reason?: string): Promise<this>
    /**
     * Sets the Auto Archive Duration of this Thread
     */
    public setAutoArchiveDuration(autoArchiveDuration: number, reason?: string): Promise<this>
    /**
     * Sets the locked state of this Thread
     */
    public setLocked(locked: boolean, reason?: string): Promise<this>
    /**
     * Sets the invitable state of this Thread
     */
    public setInvitable(invitable: boolean, reason?: string): Promise<this>
    /**
     * Sets the Rate Limit Per User of this Channel
     */
    public setRateLimitPerUser(rateLimitPerUser: number, reason?: string): Promise<this>
    /**
     * Sets the applied tags of this Thread in the Forum Channel
     */
    public setAppliedTags(appliedTags: ForumTagResolvable[], reason?: string): Promise<this>
    /**
     * Set the flags of this Thread
     */
    public setFlags(flags: Exclude<ChannelFlagsResolvable, "RequireTag">, reason?: string): Promise<this>
    /**
     * Whether or not this Channel is a Category Channel
     */
    public isCategory(): this is CategoryChannel
    /**
     * Whether or not this Channel is a DM Channel
     */
    public isDM(): this is DMChannel
    /**
     * Whether or not this Channel is a Text Channel
     */
    public isGuildText(): this is TextChannel
    /**
     * Whether or not this Channel is a Text Based Channel
     */
    public isText(): this is BaseGuildTextChannel | DMChannel | ThreadChannel | VoiceChannel
    /**
     * Whether or not this Channel is a Voice Channel
     */
    public isGuildVoice(): this is VoiceChannel
    /**
     * Whether or not this Channel is a Voice Based Channel
     */
    public isVoice(): this is VoiceBasedChannels
    /**
     * Whether or not this Channel is a Thread Channel
     */
    public isThread(): this is ThreadChannel
    /**
     * Whether or not this Channel is a News Channel
     */
    public isNews(): this is NewsChannel
    /**
     * Whether or not this Channel is a Stage Channel
     */
    public isStage(): this is StageChannel
    /**
     * Whether or not this Channel is in a Guild
     */
    public inGuild(): this is GuildChannel & ThreadChannel
    /**
     * Whether or not this Channel is a Forum Channel
     */
    public isForum(): this is ForumChannel
    /**
     * The Parent Channel of this Channel
     */
    public parent: BaseGuildTextChannel
    /**
     * Fetches the creator of this Thread
     */
    public fetchOwner(options?: BaseFetchOptions): Promise<GuildMember>
    /**
     * Returns the Permissions of a GuildMember or a Role in this GuildChannel
     */
    public permissionsFor(userOrRole: UserResolvable | RoleResolvable): Readonly<Permissions>
}

export class DirectoryChannel extends GuildChannel {
    public constructor(data: {}, client: Client, extras: { guildId: string })
}

export class ForumChannel extends GuildChannel {
    public constructor(data: {}, client: Client, extras: { guildId: string })
    /**
     * The available tags you can be use in this Forum Channel
     */
    public availableTags: Collection<string, ForumTags>
    /**
     * Whether or not this Forum Channel is nsfw
     */
    public nsfw: boolean
    /**
     * The Channel Flags of this Forum Channel
     */
    public flags: Readonly<ChannelFlags>
    /**
     * The Thread Manager of this Forum Channel
     */
    public threads: GuildForumThreadManager
    /**
     * The initial rate limit per user value to set on newly created Threads in this Forum Channel.
     */
    public defaultThreadRateLimitPerUser: number
    /**
     * The default reaction Emoji to show in the add reaction button on a Thread in this Forum Channel
     */
    public defaultReactionEmoji: ForumDefaultReactionEmoji
    /**
     * The default sort order of posts in this Forum Channel
     */
    public defaultSortOrder: number
    /**
     * The interval that the members will be limited to one Message for any new posts
     */
    public rateLimitPerUser: number
    /**
     * The default auto archived duration of this Channel
     */
    public defaultAutoArchiveDuration: number
    /**
     * The default layout of this Forum. null if not set
     */
    public defaultForumLayout: number
    /**
     * Sets the available tags for this Forum Channel
     */
    public setAvailableTags(availableTags: ForumTags, reason?: string): Promise<this>
    /**
     * Sets the default reaction Emoji in the add Reaction button
     */
    public setDefaultReactionEmoji(defaultReactionEmoji: EmojiResolvable, reason?: string): Promise<this>
    /**
     * Sets the default sort order type used to order posts in this Forum Channel
     */
    public setDefaultSortOrder(defaultSortOrder: number, reason?: string): Promise<this>
    /**
     * Sets the flags of this Forum Channel
     */
    public setFlags(flags: Exclude<ChannelFlagsResolvable, "Pinned">, reason?: string): Promise<this>
}

export class VoiceChannel extends VoiceBasedChannels {
    public constructor(data: {}, client: Client, extras: { guildId: string })
    /**
     * Whether or not this Voice Channel is nsfw
     */
    public nsfw: boolean
    /**
     * The Video Quality Mode of this Voice Channel
     */
    public videoQualityMode: number
    /**
     * The limit of users that can join this Voice Channel
     */
    public userLimit: number
    /**
     * The Rate Limit Per User of this Channel
     */
    public rateLimitPerUser: number
    /**
     * Sets the NSFW state of this Voice Channel
     */
    public setNsfw(nsfw: boolean, reason?: string): Promise<this>
    /**
     * Sets the Rate Limit Per User of this Channel
     */
    public setRateLimitPerUser(rateLimitPerUser: number, reason?: string): Promise<this>
    /**
     * Sets the user limit of this Voice Channel
     */
    public setUserLimit(userLimit: number, reason?: string): Promise<this>
    /**
     * Sets the Video Quality Mode of this Voice Channel
     */
    public setVideoQualityMode(videoQualityMode: number, reason?: string): Promise<this>
    /**
     * The Message Manager of this Channel
     */
    public messages: Readonly<MessageManager>
    /**
     * Sends a Message to this Voice Channel
     */
    public send(options: MessageOptionsData): Promise<Message>
    /**
     * Bulk-Deletes Messages in this Voice Channel
     */
    public bulkDelete(messages: MessageBulkResolvable | number, options?: MessageDeleteBulkOptions): Promise<Collection<string, Message>>
    /**
     * Triggers a typing indicator in this Channel
     */
    public sendTyping(): Promise<this>
}

export class StageChannel extends VoiceBasedChannels {
    public constructor(data: {}, client: Client, extras: { guildId: string })
    /**
     * Gets the Stage Instance from this Stage Channel
     */
    public getStageInstance(): StageInstance | void
    /**
     * Creates a Stage Instance from this Stage Channel
     */
    public createStageInstance(options: CreateStageInstanceData): Promise<StageInstance>
}

export class DMChannel extends DMBasedChannels {
    /**
     * The id of the Recipient of this DM Channel
     */
    public recipientId: string
}

export class TextChannel extends BaseGuildTextChannel {
    public constructor(data: {}, client: Client, extras: { guildId: string })
}

export class NewsChannel extends BaseGuildTextChannel {
    public constructor(data: {}, client: Client, extras: { guildId: string })
    /**
     * Follows this News Channel
     */
    public follow(webhookChannel: ChannelResolvable): Promise<NewsChannel>
}

export class VoiceBasedChannels extends GuildChannel {
    public constructor(data: {}, guildId: string, client: Client)
    /**
     * The bitrate of this Voice Channel
     */
    public bitrate: number
    /**
     * The rtc region set in this Voice Channel
     */
    public rtcRegion: string
    /**
     * Sets the bitrate of this Voice Channel
     */
    public setBitrate(bitrate: number, reason?: string): Promise<this>
    /**
     * Sets the RTC Region of this Voice Channel
     */
    public setRtcRegion(rtcRegion: string, reason?: string): Promise<this>
    /**
     * Joins this Voice Based Channel
     */
    public join(options?: VoiceStateData): void
    /**
     * The Guild Members that are in this Voice Based Channel
     */
    public members: Collection<string, GuildMember>
}

export class BaseGuildTextChannel extends GuildChannel {
    public constructor(data: {}, client: Client, extras: { guildId: string })
    /**
     * Whether or not this Channel is nsfw
     */
    public nsfw: boolean
    /**
     * The id of the last sent Message in this Channel
     */
    public lastMessageId: string
    /**
     * When the last Message was last pinned at
     */
    public lastPinnedAt: Date
    /**
     * The timestamp of when the last Message was last pinned at
     */
    public lastPinnedTimestamp: number
    /**
     * The Rate Limit Per User of this Channel
     */
    public rateLimitPerUser: number
    /**
     * The default auto archived duration of this Channel
     */
    public defaultAutoArchiveDuration: number
    /**
     * The Message Manager of this Channel
     */
    public messages: Readonly<MessageManager>
    /**
     * The Thread Manager of this Channel
     */
    public threads: ThreadManager
    /**
     * Creates a Webhook in this Channel
     */
    public createWebhook(options: WebhookCreateOptions): Promise<Webhook>
    /**
     * Sends a Message to this Channel
     */
    public send(options: MessageOptionsData): Promise<Message>
    /**
     * Bulk-Deletes Messages in this Channel
     */
    public bulkDelete(messages: MessageBulkResolvable | number, options?: MessageDeleteBulkOptions): Promise<Collection<string, Message>>
    /**
     * Sets the type of this Text Channel
     */
    public setType(type: number, reason?: string): Promise<this>
    /**
     * Sets the topic of this Text Channel
     */
    public setTopic(topic: string, reason?: string): Promise<this>
    /**
     * Sets the NSFW state of this Text Channel
     */
    public setNsfw(nsfw: boolean, reason?: string): Promise<this>
    /**
     * Sets the Default Auto Archive Duration of this Text Channel
     */
    public setDefaultAutoArchiveDuration(defaultAutoArchiveDuration: number, reason?: string): Promise<this>
    /**
     * Sets the Rate Limit Per User of this Channel
     */
    public setRateLimitPerUser(rateLimitPerUser: number, reason?: string): Promise<this>
    /**
     * Triggers a typing indicator in this Channel
     */
    public sendTyping(): Promise<this>
}

export class GuildChannel extends Channel {
    public constructor(data: {}, client: Client, extras: { guildId: string })
    /**
     * The topic of this Channel
     */
    public topic: string
    /**
     * The position of this Channel
     */
    public position: number
    /**
     * The Permission Overwrites of this Channel
     */
    public permissionOverwrites: PermissionOverwritesManager
    /**
     * The id of the parent of this Channel
     */
    public parentId: string
    /**
     * The Parent Channel of this Channel
     */
    public parent: CategoryChannel
    /**
     * Whether or not this Channel is deletable by the Client User
     */
    public deletable: boolean
    /**
     * Whether or not this Channel is the Guild's rule Channel
     */
    public isRulesChannel(): boolean
    /**
     * Whether or not this Channel is the Guild's public updates Channel
     */
    public isPublicUpdatesChannel(): boolean
    /**
     * Whether or not this Channel is the Guild's widget set Channel
     */
    public isWidgetChannel(): boolean
    /**
     * Whether or not this Channel is the Guild's set system Channel
     */
    public isSystemChannel(): boolean
    /**
     * Sets the position of this GuildChannel
     */
    public setPosition(position: number, reason?: string): Promise<this>
    /**
     * Sets the parent of this GuildChannel
     */
    public setParent(parent: ChannelResolvable, reason?: string): Promise<this>
    /**
     * Fetches the Webhooks of this GuildChannel
     */
    public fetchWebhooks(): Promise<Collection<string, Webhook>>
    /**
     * Returns the Permissions of a GuildMember or a Role in this GuildChannel
     */
    public permissionsFor(userOrRole: UserResolvable | RoleResolvable): Readonly<Permissions>
    /**
     * Clone this GuildChannel
     */
    public clone(reason?: string): Promise<this>
    /**
     * The Collection of GuildMembers that can see this Channel
     */
    public members: Readonly<Collection<string, GuildMember>>
}

export class Channel extends Base {
    public constructor(data: {}, client: Client, extras: { guildId: string })
    /**
     * Whether or not this Channel is partial
     */
    public partial: boolean
    /**
     * The id of this Channel
     */
    public id: string
    /**
     * The name of this Channel
     */
    public name: string
    /**
     * The type of this Channel
     */
    public type: number
    /**
     * The id of the Guild this belongs to
     */
    public guildId: string
    /**
     * The Guild this Channel belongs to
     */
    public guild: Guild
    /**
     * When this Channel was created at
     */
    public createdAt: Date
    /**
     * The timestamp of when this Channel was created at
     */
    public createdTimestamp: number
    /**
     * The url of this Channel
     */
    public url: string
    /**
     * When stringified returns its mention format
     */
    public toString(): string
    /**
     * Fetches this Channel
     */
    public fetch(options: BaseFetchOptions): Promise<this>
    /**
     * Modifies this Channel
     */
    public edit(options: CreateChannelData): Promise<this>
    /**
     * Delete this Channel
     */
    public delete(reason?: string): Promise<this>
    /**
     * Whether or not this Channel is a Category Channel
     */
    public isCategory(): this is CategoryChannel
    /**
     * Whether or not this Channel is a DM Channel
     */
    public isDM(): this is DMChannel
    /**
     * Whether or not this Channel is a Text Channel
     */
    public isGuildText(): this is TextChannel
    /**
     * Whether or not this Channel is a Text Based Channel
     */
    public isText(): this is BaseGuildTextChannel | DMChannel | ThreadChannel | VoiceChannel
    /**
     * Whether or not this Channel is a Voice Channel
     */
    public isGuildVoice(): this is VoiceChannel
    /**
     * Whether or not this Channel is a Voice Based Channel
     */
    public isVoice(): this is VoiceBasedChannels
    /**
     * Whether or not this Channel is a Thread Channel
     */
    public isThread(): this is ThreadChannel
    /**
     * Whether or not this Channel is a News Channel
     */
    public isNews(): this is NewsChannel
    /**
     * Whether or not this Channel is a Stage Channel
     */
    public isStage(): this is StageChannel
    /**
     * Whether or not this Channel is in a Guild
     */
    public inGuild(): this is GuildChannel & ThreadChannel
    /**
     * Whether or not this Channel is a Forum Channel
     */
    public isForum(): this is ForumChannel
    /**
     * Sets the name of this Channel
     */
    public setName(name: string, reason?: string): Promise<this>
    /**
     * Whether or not this Channel is equals another
     */
    public equals(channel: Channel): boolean
}

export class GuildChannelManager extends ChannelManager {
    public constructor(guildId: string, client: Client, iterable: [])
    /**
     * The Guild id this belongs to
     */
    public guildId: string
    /**
     * Creates a Guild Channel
     */
    public create(options: CreateChannelData): Promise<GuildChannel>
    /**
     * Fetches the Channels in this Guild
     */
    public fetch(channel: ChannelResolvable, options?: BaseFetchOptions): Promise<GuildChannel | Channel>
    public fetch(options?: BaseFetchOptions): Promise<Collection<string, GuildChannel>>
    /**
     * Modifies a Channel
     */
    public edit(channel: ChannelResolvable, options: CreateChannelData): Promise<GuildChannel>
    /**
     * Deletes a Channel
     */
    public delete(channel: ChannelResolvable, reason?: string): Promise<GuildChannel | void>
    /**
     * Modfies the positions of multiple Guild Channels
     */
    public modifyPositions(options: ModifyChannelPositionData[]): Promise<Collection<string, GuildChannel>>
    /**
     * Fetches the Active Threads in this Guild
     */
    public fetchActiveThreads(): Promise<FetchedThreads>
    /**
     * Creates an Invite to a Channel
     */
    public createInvite(channel: ChannelResolvable, options?: CreateInviteData): Promise<Invite>
    /**
     * Fetches the Invites of a Channel
     */
    public fetchInvites(channel: ChannelResolvable): Promise<Collection<string, Invite>>
    /**
     * Follow a News Channel
     */
    public follow(channel: ChannelResolvable, webhookChannel: ChannelResolvable): Promise<NewsChannel>
    /**
     * Fetches the Public or Private archived Threads in a Channel
     */
    public fetchThreads(channel: ChannelResolvable, options?: { before: DateResolvable, limit: number, private: boolean }): Promise<FetchedThreads>
    /**
     * Clone a Guild Channel
     */
    public clone(channel: ChannelResolvable, reason?: string): Promise<GuildChannel>
    /**
     * Sync a Guild Channel to its parent. Returns `null` if Guild Channel is already synced
     */
    public lockPermissions(channel: ChannelResolvable, reason?: string): Promise<GuildChannel | void>
    /**
     * The Cache of Channels this Manager holds
     */
    public cache: Collection<string, GuildChannel>
}

export class ChannelManager extends CachedManager {
    public constructor(client: Client)
    /**
     * Fetches a Channel
     */
    public fetch(channel: ChannelResolvable, options?: BaseFetchOptions): Promise<Channel>
    /**
     * Modifies a Channel
     */
    public edit(channel: ChannelResolvable, options: CreateChannelData): Promise<Channel>
    /**
     * Deletes a Channel
     */
    public delete(channel: ChannelResolvable, reason?: string): Promise<Channel | void>
    /**
     * Triggers a typing indicator in a Guild Channel
     */
    public sendTyping(channel: ChannelResolvable): Promise<BaseGuildTextChannel | DMChannel | ThreadChannel | VoiceChannel>
    /**
     * The cache of Channels this holds
     */
    public cache: Collection<string, Channel>
}

export class VoiceRegion extends Base {
    public constructor(data: {}, client: Client)
    /**
     * The id of this Voice Region
     */
    public id: string
    /**
     * The name of this Voice Region
     */
    public name: string
    /**
     * True for a single server that is closest to the current user's client
     */
    public optimal: boolean
    /**
     * Whether this is a deprecated Voice Region (avoid switching to these)
     */
    public deprecated: boolean
    /**
     * Whether this is a custom Voice Region (used for events/etc)
     */
    public custom: boolean
}

export class AttachmentBuilder {
    public constructor(data?: AttachmentBuilder)
    /**
     * The filename of this Attachment
     */
    public filename: string
    /**
     * The url of this Attachment
     */
    public url: string
    /**
     * Whether or not this Attachment is spoilered
     */
    public spoiler: boolean
    /**
     * The description of this Attachment
     */
    public description: string
    /**
     * Sets the URL of this Attachment
     */
    public setURL(url: BufferResolvable): this
    /**
     * Sets the description of this Attachment
     */
    public setDescription(description: string): this
    /**
     * Sets the filename of this Attachment
     */
    public setFilename(filename: string): this
    /**
     * Sets the spoiler state of this Attachment
     */
    public setSpoiler(): this
    /**
     * Resolve an Attachment data to this AttachmentBuilder
     */
    public static from(attachment: Attachment): AttachmentBuilder
}

export class GuildMemberFlags extends Bitfield {
    public constructor(...bits: GuildMemberFlagsResolvable[] | GuildMemberFlagsResolvable[][])
    /**
     * Whether or not this Bitfield have the specified bits
     */
    public has(...bits: GuildMemberFlagsResolvable[] | GuildMemberFlagsResolvable[][]): boolean
    /**
     * Whether or not this Bitfield has any of the specified bits
     */
    public any(...bits: GuildMemberFlagsResolvable[] | GuildMemberFlagsResolvable[][]): boolean
    /**
     * Adds bits to this Bitfield
     */
    public add(...bits: GuildMemberFlagsResolvable[] | GuildMemberFlagsResolvable[][]): this
    /**
     * Removes bits from this Bitfield
     */
    public remove(...bits: GuildMemberFlagsResolvable[] | GuildMemberFlagsResolvable[][]): this
    /**
     * Returns an Array of missing bitfield strings from this bitfield
     */
    public missing(): GuildMemberFlagsStrings[]
    /**
     * Whether or not this bitfield is equals another
     */
    public equals(bitfield: GuildMemberFlags): boolean
    /**
     * Serializes this Bitfield
     */
    public serialize(): Record<GuildMemberFlagsStrings, bigint>
    /**
     * Maps the Bitfields to an Array
     */
    public toArray(): Array<GuildMemberFlagsStrings>
    /**
     * The Flags of this Bitfield
     */
    public static Flags: Record<GuildMemberFlagsStrings, bigint>
    /**
     * Returns all the Bitfields combined
     */
    public static All: bigint 
}

export class SystemChannelFlags extends Bitfield {
    public constructor(...bits: SystemChannelFlagsResolvable[] | SystemChannelFlagsResolvable[][])
    /**
     * Whether or not this Bitfield have the specified bits
     */
    public has(...bits: SystemChannelFlagsResolvable[] | SystemChannelFlagsResolvable[][]): boolean
    /**
     * Whether or not this Bitfield has any of the specified bits
     */
    public any(...bits: SystemChannelFlagsResolvable[] | SystemChannelFlagsResolvable[][]): boolean
    /**
     * Adds bits to this Bitfield
     */
    public add(...bits: SystemChannelFlagsResolvable[] | SystemChannelFlagsResolvable[][]): this
    /**
     * Removes bits from this Bitfield
     */
    public remove(...bits: SystemChannelFlagsResolvable[] | SystemChannelFlagsResolvable[][]): this
    /**
     * Returns an Array of missing bitfield strings from this bitfield
     */
    public missing(): SystemChannelFlagsStrings[]
    /**
     * Whether or not this bitfield is equals another
     */
    public equals(bitfield: SystemChannelFlags): boolean
    /**
     * Serializes this Bitfield
     */
    public serialize(): Record<SystemChannelFlagsStrings, bigint>
    /**
     * Maps the Bitfields to an Array
     */
    public toArray(): Array<SystemChannelFlagsStrings>
    /**
     * The Flags of this Bitfield
     */
    public static Flags: Record<SystemChannelFlagsStrings, bigint>
    /**
     * Returns all the Bitfields combined
     */
    public static All: bigint
}

export class GuildManager extends Base {
    public constructor(client: Client)
    /**
     * Fetches a Guild(s)
     */
    public fetch(guild: GuildResolvable, options?: GuildFetchOptions): Promise<Guild>
    public fetch(options?: GuildFetchOptions): Promise<Collection<string, Guild>>
    /**
     * Creates a Guild
     */
    public create(options: Omit<GuildCreateData, "reason">): Promise<Guild>
    /**
     * Modifies a Guild
     */
    public edit(guild: GuildResolvable, options?: GuildCreateData): Promise<Guild>
    /**
     * Deletes a Guild
     */
    public delete(guild: GuildResolvable): Promise<Guild | void>
    /**
     * Sets the Mfa Level of a Guild
     */
    public setMfaLevel(guild: GuildResolvable, options: { mfaLevel: number, reason?: string }): Promise<Guild>
    /**
     * Fetches a Guild Voice Regions
     */
    public fetchVoiceRegions(guild: GuildResolvable): Promise<Collection<string, VoiceRegion>>
    /**
     * Fetches a Guild Webhooks
     */
    public fetchWebhooks(guild: GuildResolvable): Promise<Collection<string, Webhook>>
    /**
     * Fetches a Guild preview
     */
    public fetchPreview(guild: GuildResolvable): Promise<GuildPreview>
    /**
     * Fetches a Guild prune count
     */
    public fetchPruneCount(guild: GuildResolvable, options?: Pick<GuildPruneOptions, "days" | "roles">): Promise<{ pruned: number}>
    /**
     * Fetches a Guild widget settings
     */
    public fetchWidgetSettings(guild: GuildResolvable): Promise<{ enabled: boolean, channelId: string }>
    /**
     * Begins Guild prune
     */
    public beginPrune(guild: GuildResolvable, options?: GuildPruneOptions): Promise<{ pruned: number }>
    /**
     * Modifies a Guild widget settings
     */
    public modifyWidget(guild: GuildResolvable, options?: { enabled: boolean, channel: ChannelResolvable }): Promise<{ enabled: boolean, channelId: string }>
    /**
     * Fetches a Guild vanity url
     */
    public fetchVanityURL(guild: GuildResolvable): Promise<{ code: string, uses: number }>
    /**
     * Fetches a Guild Welcoem Screen
     */
    public fetchGuildWelcomeScreen(guild: GuildResolvable): Promise<WelcomeScreen>
    /**
     * Modifies a Guild Welcome Screen
     */
    public modifyGuildWelcomeScreen(guild: GuildResolvable, options?: ModifyGuildWelcomeScreenData): Promise<WelcomeScreen>
    /**
     * Fetches the Guilds that the User this access token belongs to
     */
    public fetchOauthGuilds(accessToken: string): Promise<Collection<string, OauthGuild>>
    /**
     * The cache of Guilds this manager holds
     */
    public cache: Collection<string, Guild>
}

export class Guild extends Base {
    public constructor(data: {}, client: Client)
    /**
     * Whether or not this Guild is partial
     */
    public partial: boolean
    /**
     * The id of this Guild
     */
    public id: string
    /**
     * The name of this Guild
     */
    public name: string
    /**
     * The icon of this Guild
     */
    public icon: string
    /**
     * The icon hash of this Guild if it is on template
     */
    public iconHash: string
    /**
     * The splash of this Guild
     */
    public splash: string
    /**
     * When this Guild was created at
     */
    public createdAt: Date
    /**
     * The timestamp of when this Guild was created at
     */
    public createdTimestamp: number
    /**
     * The discovery splash of this Guild
     */
    public discoverySplash: string
    /**
     * The id of the owner of this Guild
     */
    public ownerId: string
    /**
     * Total permissions of the user in this Guild (including overwrites)
     */
    public permissions: Readonly<Permissions>
    /**
     * The id of the afk channel of this Guild
     */
    public afkChannelId: string
    /**
     * The afk timeout of this Guild
     */
    public afkTimeout: number
    /**
     * Whether or not this Guild has widget enabled
     */
    public widgetEnabled: boolean
    /**
     * The widget channel id of this Guild
     */
    public widgetChannelId: string
    /**
     * The Verification Level of this Guild
     */
    public verificationLevel: number
    /**
     * The Default Message Notifications Level of this Guild
     */
    public defaultMessageNotifications: number
    /**
     * The Explicit Content Filter Level of this Guild
     */
    public explicitContentFilter: number
    /**
     * The features this Guild has
     */
    public features: GuildFeatures[]
    /**
     * The Mfa Level of this Guild
     */
    public mfaLevel: number
    /**
     * The application id of the Guild creator if it is bot-created
     */
    public applicationId: string
    /**
     * The system channel id of this Guild
     */
    public systemChannelId: string
    /**
     * The System Channel Flags of this Guild
     */
    public systemChannelFlags: SystemChannelFlags
    /**
     * The rules channel id of this Guild
     */
    public rulesChannelId: string
    /**
     * The max presences this Guild can have
     */
    public maxPresences: number
    /**
     * The max members this Guild can have
     */
    public maxMembers: number
    /**
     * The vanity url code for the Guild
     */
    public vanityUrlCode: string
    /**
     * The description of this Guild
     */
    public description: string
    /**
     * The banner of this Guild
     */
    public banner: string
    /**
     * The Premium Tier Level of this Guild
     */
    public premiumTier: number
    /**
     * The boosts count of this Guild
     */
    public premiumSubscriptionCount: number
    /**
     * The preferred locale of this Guild
     */
    public preferredLocale: string
    /**
     * The public channel id of this Guild
     */
    public publicUpdatesChannelid: string
    /**
     * The maximium amount of users in a Video Chanel
     */
    public maxVideoChannelUsers: number
    /**
     * The maximum amount of users in a Stage Channel
     */
    public maxStageVideoChannelUsers: number
    /**
     * The approximate member count of this Guild
     */
    public approximateMemberCount: number
    /**
     * The approximate presence count of this Guild
     */
    public approximatePresenceCount: number
    /**
     * The Nsfw Level of this Guild
     */
    public nsfwLevel: number
    /**
     * Whether or not this premium progress bar is enabled in this Guild
     */
    public premiumProgressBar: boolean
    /**
     * Whether or not this Guild is unavailable
     */
    public unavailable: boolean
    /**
     * Whether or not this Guild is considered large
     */
    public large: boolean
    /**
     * When this Guild was joined at
     */
    public joinedAt: Date
    /**
     * The timestamp of when this Guild was joined at
     */
    public joinedTimestamp: number
    /**
     * The member count of this Guild
     */
    public memberCount: number
    /**
     * The Guild Member representation of the Client User of this Guild
     */
    public me: Readonly<GuildMember>
    /**
     * The Channel Manager of this Guild
     */
    public channels: GuildChannelManager
    /**
     * The Guild Member Manager
     */
    public members: GuildMemberManager
    /**
     * The Guild Ban Manager
     */
    public bans: GuildBanManager
    /**
     * The Guild Role Manager
     */
    public roles: RoleManager
    /**
     * The Guild Invite Manager
     */
    public invites: GuildInviteManager
    /**
     * The Guild Integration Manager
     */
    public integrations: GuildIntegrationManager
    /**
     * The Guild Voice State Manager
     */
    public voiceStates: VoiceStateManager
    /**
     * The Guild Scheduled Event Manager
     */
    public guildScheduledEvents: GuildScheduledEventManager
    /**
     * The Guild Template Manager
     */
    public templates: GuildTemplateManager
    /**
     * The Guild Stage Instance Manager
     */
    public stageInstances: StageInstanceManager
    /**
     * The Guild Sticker Manager
     */
    public stickers: GuildStickerManager
    /**
     * The Guild Emoji Manager
     */
    public emojis: GuildEmojiManager
    /**
     * The Guild Application Command Manager
     */
    public commands: GuildApplicationCommandManager
    /**
     * The Guild Auto Moderation Manager
     */
    public automoderations: GuildAutomoderationManager
    /**
     * The Guild's Presence Manager
     */
    public presences: PresenceManager
    /**
     * The Guild Thread Manager
     */
    public threads: ThreadManager
    /**
     * The GuildMember representation of the Guild's owner
     */
    public owner: Readonly<GuildMember | void>
    /**
     * The System Channel this Guild has set
     */
    public systemChannel: Readonly<GuildChannel>
    /**
     * The Rules Channel this Guild has set
     */
    public rulesChannel: Readonly<GuildChannel>
    /**
     * The Public Updates Channel this Guild has set
     */
    public publicUpdatesChannel: Readonly<GuildChannel>
    /**
     * The Channel that the widget will generate an Invite to, or null if set to no Invite
     */
    public widgetChannel: Readonly<GuildChannel>
    /**
     * The id of the safety alert channel if there's a Guild raid
     */
    public safetyAlertsChannelId: string
    /**
     * Fetches this Guild's owner
     */
    public fetchOwner(options?: BaseFetchOptions): Promise<GuildMember>
    /**
     * Pause the Invites for this Guild
     */
    public disableInvites(reason?: string): Promise<this>
    /**
     * Fetches the GuildMember of the Client User of this Guild
     */
    public fetchMe(options?: BaseFetchOptions): Promise<GuildMember>
    /**
     * Fetches this Guild
     */
    public fetch(options: GuildFetchOptions): Promise<this>
    /**
     * Modifies this Guild
     */
    public edit(options: GuildCreateData): Promise<this>
    /**
     * Deletes this Guild
     */
    public delete(reason?: string): Promise<this>
    /**
     * Sets the name of this Guild
     */
    public setName(name: string, reason?: string): Promise<this>
    /**
     * Sets the Verification Level of this Guild
     */
    public setVerificationLevel(verificationLevel: number, reason?: string): Promise<this>
    /**
     * Sets the Default Message Notification of this Guild
     */
    public setDefaultMessageNotifications(defaultMessageNotifications: number, reason?: string): Promise<this>
    /**
     * Sets the Explicit Content Filter of this Guild
     */
    public setExplicitContentFilter(explicitContentFilter: number, reason?: string): Promise<this>
    /**
     * Sets the AFK Channel of this Guild
     */
    public setAfkChannel(afkChannel: ChannelResolvable, reason?: string): Promise<this>
    /**
     * Sets the AFK timeout of this Guild
     */
    public setAfkTimeout(afkTimeout: number, reason?: string): Promise<this>
    /**
     * Sets the icon of this Guild
     */
    public setIcon(icon: BufferResolvable, reason?: string): Promise<this>
    /**
     * Sets the owner of this Guild. Only for owned Guilds
     */
    public setOwner(owner: BufferResolvable, reason?: string): Promise<this>
    /**
     * Sets the splash of this Guild
     */
    public setSplash(splash: BufferResolvable, reason?: string): Promise<this>
    /**
     * Sets the discovery splash of this Guild
     */
    public setDiscoverySplash(discoverySplash: BufferResolvable, reason?: string): Promise<this>
    /**
     * Sets the banner of this Guild
     */
    public setBanner(banner: BufferResolvable, reason?: string): Promise<this>
    /**
     * Sets the where to send system Messages to
     */
    public setSystemChannel(systemChannel: ChannelResolvable, reason?: string): Promise<this>
    /**
     * Sets the system channel flags of this Guild
     */
    public setSystemChannelFlags(systemChannelFlags: SystemChannelFlagsResolvable, reason?: string): Promise<this>
    /**
     * Sets the Channel where the rule(s) would be
     */
    public setRulesChannel(rulesChannel: ChannelResolvable, reason?: string): Promise<this>
    /**
     * Sets where to send discord updates to
     */
    public setPublicUpdatesChannel(publicUpdatesChannel: ChannelResolvable, reason?: string): Promise<this>
    /**
     * Sets the Preferred Locale of this Community Guild
     */
    public setPreferredLocale(preferredLocale: string, reason?: string): Promise<this>
    /**
     * Sets the features this Guild can have
     */
    public setFeatures(features: Array<Extract<GuildFeatures, "InvitesDisabled" | "Community" | "Discoverable">>, reason?: string): Promise<this>
    /**
     * Sets the description of this Guild
     */
    public setDescription(description: string, reason?: string): Promise<this>
    /**
     * Sets the state of the Premium Progress Bar
     */
    public setPremiumProgressBar(premiumProgressBar: boolean, reason?: string): Promise<this>
    /**
     * Fetches this Guild's Preview
     */
    public fetchPreview(): Promise<GuildPreview>
    /**
     * Fetches the Webhooks of this Guild
     */
    public fetchWebhooks(): Promise<Collection<string, Webhook>>
    /**
     * Fetches the count if you are going to prune members
     * @return The return value is how many members are going to be pruned with the filters put in
     */
    public fetchPruneCount(options?: Pick<GuildPruneOptions, "days" | "roles">): Promise<{ pruned: number }>
    /**
     * Fetches this Guild widget settings
     */
    public fetchWidgetSettings(): Promise<{ enabled: boolean, channelId: string }>
    /**
     * Modifies this Guild Widget settings
     */
    public modifyWidget(options?: { enabled: boolean, channel: ChannelResolvable }): Promise<{ enabled: boolean, channelId: string }>
    /**
     * Fetches this Guild vanity url if there is one
     */
    public fetchVanityURL(): Promise<{ code: string, uses: number }>
    /**
     * Begins Prune in this Guild
     */
    public beginPrune(options?: GuildPruneOptions): Promise<{pruned: number}>
    /**
     * Fetches this Guild's Voice Regions
     */
    public fetchVoiceRegions(): Promise<Collection<string, VoiceRegion>>
    /**
     * Fetches this Guild widget
     */
    public fetchWidget(): Promise<GuildWidget>
    /**
     * Fetches this Guild Welcome Screen
     */
    public fetchWelcomeScreen(): Promise<WelcomeScreen>
    /**
     * Modifies this Guild Welcome Screen
     */
    public modifyWelcomeScreen(options?: ModifyGuildWelcomeScreenData): Promise<WelcomeScreen>
    /**
     * Fetches the Audit Log of this Guild
     */
    public fetchAuditLogs(options?: AuditLogFetchOptions): Promise<GuildAuditLog>
    /**
     * Gets this Guild's icon url
     */
    public iconURL(options?: ImageURLOptions<ImageFormatWithoutLottie>): string | void
    /**
     * Gets this Guild's splash url
     */
    public splashURL(options?: Omit<ImageURLOptions<ImageFormatWithoutLottieAnimate>, "forceStatic">): string | void
    /**
     * Gets this Guild's discovery splash url
     */
    public discoverySplashURL(options?: Omit<ImageURLOptions<ImageFormatWithoutLottieAnimate>, "forceStatic">): string | void
    /**
     * Gets this Guild's banner url
     */
    public bannerURL(options?: ImageURLOptions<ImageFormatWithoutLottie>): string | void
    /**
     * Whether or not this Guild is equals another
     */
    public equals(guild: Guild): boolean
}

export class WebsocketManager extends WebSocket {
    public constructor(client: Client)
    /**
     * Sends a gateway payload
     */
    //@ts-ignore
    public send(payload?: WebsocketPayload): void
    /**
     * The client that instantiated this
     */
    public client: Client
    /**
     * The status of this Websocket
     */
    public status: string
    /**
     * Whether or not this Websocket is reconnected
     */
    public reconnected: boolean
}

export class RaidenSet<V> extends Set<V> {
    /**
     * Returns the very first value in the Set
     */
    public first(): V
    /**
     * Returns the very last value in the Set
     */
    public last(): V
    /**
     * Gets the specified value from the Set
     */
    public get(value: V): V
    /**
     * Finds the specified value from the Set
     */
    public find(fn: (value: V) => void, thisArg?: any): V
    /**
     * Maps the values in to an Array
     */
    public map(fn: (value: V) => void): V[]
    /**
     * Filters the current Set and returns it
     */
    public filter(fn: (value: V) => void): this
    /**
     * Sorts the current Set
     */
    public sort(compareFn: (firstValue: V, secondValue: V) => void): this
    /**
     * Returns the index of the specified value
     */
    public findIndex(fn: (value: V) => void, thisArg?: any): number
    /**
     * Calls the specified callback function for all the elements in the Set. The return value of the callback function is the accumulated result, and is provided as an argument in the next call to the callback function.
     */
    public reduce<T>(fn: (accumulator: T, current: V, set: this) => T, initialValue: T): V
    public reduce(fn: (accumulator: V, current: V, set: this) => void): V
    /**
     * Whether or not this Set is equal another
     */
    public equals(set: RaidenSet<V>): boolean
    /**
     * Concatenates the value from another Set to this one
     */
    public concat(...valueN: RaidenSet<V>[]): this
    /**
     * Checks if one of the elements in the Set matches the check specified
     */
    public some(fn: (value: V) => void, thisArg?: any): boolean
    /**
     * Checks if every elements in the Set matches the check specified
     */
    public every(fn: (value: V) => void, thisArg?: any): boolean
    /**
     * Reverses this Set
     */
    public reverse(): this
    /**
     * Returns the differnce between this Set and another
     */
    public difference(set: RaidenSet<V>): this
    /**
     * Returns the value in this index
     */
    public at(index: number): this
}

export class Collection<K, V> extends Map<K, V> {
    /**
     * Returns the very first value in the Collection
     */
    public first(): V
    /**
     * Returns the very first key in the Collection
     */
    public firstKey(): K
    /**
     * Returns the very last value in the Collection
     */
    public last(): V
    /**
     * Returns the very last key in the Collection
     */
    public lastKey(): K
    /**
     * Filters the current Collection and returns it
     */
    public filter(fn: (value: V, key: K) => boolean): this
    /**
     * Filters the current Collection keys and returns it
     */
    public filterKeys(fn: (key: K) => boolean): this
    /**
     * Maps the current Collection in to an Array
     */
    public map<T = undefined>(fn: (value: V, key: K, index: number, collection: this) => T): Array<T>
    /**
     * Finds a specific item in the Collection
     */
    public find(fn: (value: V, key: K) => boolean, thisArg?: any): V
    /**
     * Determines whether all the members of this Collection satisfy the specified test.
     */
    public every(fn: (value: V, key: K) => any, thisArg?: any): boolean
    /**
     * Determines whether one of the members of this Collection satisfy the specified test
     */
    public some(fn: (value: V, key: K) => any, thisArg?: any): boolean
    /**
     * Concatenates another Collection to this
     */
    public concat(...valueN: Collection<K, V>[]): this
    /**
     * Returns the index of the specified value
     */
    public findIndex(fn: (value: V, key: K) => any, thisArg?: any): number
    /**
     * Reverses this Collection
     */
    public reverse(): this
    /**
     * Calls the specified callback function for all the elements in the Collection. The return value of the callback function is the accumulated result, and is provided as an argument in the next call to the callback function.
     */
    public reduce<T = undefined>(fn: (accumulator: T | V, currentValue: V, collection: this) => T, initialValue?: T): T | V
    /**
     * Sorts this Collection
     */
    public sort(compareFunction: (firstValue: K | V, secondValue: K | V) => number): this
    /**
     * Stringifies this Collection
     */
    public toString(): string
    /**
     * Check whether or not some elements in this Collection is equals to the specified Collection
     */
    public equals(collection: Collection<K, V>): boolean
    /**
     * Returns the difference between this Collection and another
     */
    public difference(collection: Collection<K, V>): this
    /**
     * Returns the element in this index
     */
    public at(index: number): V
    /**
     * Whether or not this Collection has one of the specified keys
     */ 
    public hasAny(...keys: K[] | K[][]): boolean
}

export class Client extends EventEmitter {
    public constructor(options: ClientOptions)
    public on<K extends keyof ClientEvents>(event: K, listener: (...args: ClientEvents[K]) => unknown): this
    public once<K extends keyof ClientEvents>(event: K, listener: (...args: ClientEvents[K]) => unknown): this
    /**
     * The User representation of this Client
     */
    public user: ClientUser
    /**
     * The intents of this Client
     */
    public intents: Intents
    /**
     * The timeout of when a request should be considered as a failure
     */
    public restRequestTimeout: number
    /**
     * The REST Manager of this Client
     */
    public api: REST
    /**
     * The API Version this Client uses
     */
    public version: number
    /**
     * The encoding this Client uses
     */
    public encoding: string
    /**
     * The root API url this Client uses
     */
    public root: string
    /**
     * The websocket url this Client uses
     */
    public wssURL: string
    /**
     * The websocket manager
     */
    public ws: WebsocketManager
    /**
     * The CDN Endpoints
     */
    public cdn: Readonly<CdnEndpoints>
    /**
     * The Guild Manager of this Client
     */
    public guilds: GuildManager
    /**
     * The Channel Manager of this Client
     */
    public channels: ChannelManager
    /**
     * The User Manager of this Client
     */
    public users: UserManager
    /**
     * The Global Emoji Manager
     */
    public emojis: EmojiManager
    /**
     * The Application of this Client
     */
    public application: ClientApplication
    /**
     * When this Client entered Ready state
     */
    public readyAt: Date
    /**
     * The timesstamp when this Client entered Ready state
     */
    public readyTimestamp: number
    /**
     * The resume gateway url of this Client
     */
    public resumeGatewayURL: string
    /**
     * Whether or not Client is ready
     */
    public isReady(): boolean
    /**
     * Fetches a Preview of a Guild
     */
    public fetchGuildPreview(guild: GuildResolvable): Promise<GuildPreview>
    /**
     * Fetches a Guild Widget
     */
    public fetchGuildWidget(guild: GuildResolvable): Promise<GuildWidget>
    /**
     * Fetches a Guild Template
     */
    public fetchGuildTemplate(code: GuildTemplateResolvable): Promise<GuildTemplate>
    /**
     * Fetches an Invite in Discord
     */
    public fetchInvite(code: InviteResolvable, options?: InviteFetchOptions): Promise<Invite>
    /**
     * Fetches a Sticker in Discord
     */
    public fetchSticker(sticker: StickerResolvable): Promise<Sticker>
    /**
     * Fetches a Sticker Pack in Discord
     */
    public fetchPremiumStickerPack(): Promise<Collection<string, StickerPack>>
    /**
     * Fetches the Voice Regions that can be used when setting a Voice or Stage Channel's rtc region
     */
    public fetchVoiceRegions(): Promise<Collection<string, VoiceRegion>>
    /**
     * Fetches the GuildMember of a certain User in a Guild
     */
    public fetchOauthGuildMember(accessToken: string, guild: GuildResolvable): Promise<GuildMember>
}

export class REST {
    public constructor(token?: string)
    /**
     * The token of your bot
     */
    public token: string
    /**
     * Sets the token of this request
     */
    public setToken(token: string): this
    /**
     * Makes a GET request to the specified url
     * @param url - The url to make request to
     * @param options - The options to make request with
     */
    public get(url: string, options: HTTPOptions): Promise<unknown>
    /**
     * Makes a POST request to the specified url
     * @param url - The url to make request to
     * @param options - The options to make request with
     */
    public post(url: string, options: HTTPOptions): Promise<unknown>
    /**
     * Makes a DELETE request to the specified url
     * @param url - The url to make request to
     * @param options - The options to make request with
     */
    public delete(url: string, options: HTTPOptions): Promise<unknown>
    /**
     * Makes a PUT request to the specified url
     * @param url - The url to make request to
     * @param options - The options to make request with
     */
    public put(url: string, options: HTTPOptions): Promise<unknown>
    /**
     * Makes a PATCH request to the specified url
     * @param url - The url to make request to
     * @param options - The options to make request with
     */
    public patch(url: string, options: HTTPOptions): Promise<unknown>
}

export class EmbedBuilder {
    public constructor(data?: EmbedBuilder)
    /**
     * The title of this Embed
     */
    public title: string
    /**
     * The description of this Embed
     */
    public description: string
    /**
     * The Embed Author
     */
    public author: Pick<EmbedAuthor, "iconURL" | "name">
    /**
     * The image of this Embed
     */
    public image: Pick<EmbedImage, "url">
    /**
     * The thumbnail of this Embed
     */
    public thumbnail: Pick<EmbedThumbnail, "url">
    /**
     * The color of this Embed
     */
    public color: ColorResolvable
    /**
     * The Embed Footer
     */
    public footer: Pick<EmbedFooter, "iconURL" | "text">
    /**
     * The Embed timestamp
     */
    public timestamp: string
    /**
     * The fields of this Embed
     */
    public fields: EmbedFields[]
    /**
     * Sets the title of this Embed
     */
    public setTitle(title: string): this
    /**
     * Sets the description of this Embed
     */
    public setDescription(description: string): this
    /**
     * Sets the Embed Author
     */
    public setAuthor(author: Pick<EmbedAuthor, "iconURL" | "name">): this
    /**
     * Sets the Embed Image
     */
    public setImage(url: string): this
    /**
     * Sets the Embed Thumbnail
     */
    public setThumbnail(url: string): this
    /**
     * Sets the color of this Embed
     */
    public setColor(color: ColorResolvable): this
    /**
     * Sets the Embed Footer
     */
    public setFooter(footer: Pick<EmbedFooter, "text" | "iconURL">): this
    /**
     * Sets the timestamp of this Embed
     */
    public setTimestamp(timestamp: DateResolvable): this
    /**
     * Adds fields to this Embed
     */
    public addFields(...fields: EmbedFields[] | EmbedFields[][]): this
    /**
     * Overwrites the fields of this Embed
     */
    public setFields(...fields: EmbedFields[] | EmbedFields[][]): this
    public toJSON(): {}
    /**
     * Makes an Embed Builder from an Embed data
     */
    public static from(embed: EmbedBuilder): EmbedBuilder
}

export class SelectMenuBuilder {
    public constructor(data?: SelectMenuBuilder)
    /**
     * The type of this Select Menu
     */
    public type: number
    /**
     * The custom id of this Select Menu
     */
    public customId: string 
    /**
     * The options of this Select Menu
     */
    public options: SelectMenuOptions[]
    /**
     * The placeholder of this Select Menu
     */
    public placeholder: string
    /**
     * The minimum option that can be selected on this Select Menu
     */
    public minValues: number
    /**
     * The maximum option that can be selected on this Select Menu
     */
    public maxValues: number
    /**
     * The Channel Types filter for the Channel Select Menu
     */
    public channelTypes: number[]
    /**
     * Whether or not this Select Menu is disabled
     */
    public disabled: boolean
    /**
     * Sets the type of this Select Menu
     */
    public setType(type: number): this
    /**
     * Sets the custom id of this Select Menu
     */
    public setCustomId(customId: string): this
    /**
     * Adds options to this Select Menu
     */
    public addOptions(...options: SelectMenuOptions[] | SelectMenuOptions[][]): this
    /**
     * Overwrites the options of this Select Menu
     */
    public setOptions(...options: SelectMenuOptions[] | SelectMenuOptions[][]): this
    /**
     * Sets the placeholder of this Select Menu
     */
    public setPlaceholder(placeholder: string): this
    /**
     * Sets the minimum options that can be selected on this Select Menu
     */
    public setMinValues(minValues: number): this
    /**
     * Sets the maximum options that can be selected on this Select Menu
     */
    public setMaxValues(maxValues: number): this
    /**
     * Whether or not to disable this Select Menu
     */
    public setDisabled(disabled: boolean): this
    /**
     * Adds Channel Types if this is a Channel Select Menu
     */
    public addChannelTypes(...types: number[] | number[][]): this
    /**
     * Overwrites the Channel Types of this Channel Select
     */
    public setChannelTypes(...types: number[] | number[][]): this
    public toJSON(): {}
    /**
     * Makes a Select Menu Builder from a Select Menu data
     */
    public static from(menu: {}): SelectMenuBuilder
}

export class ButtonBuilder {
    public constructor(data?: ButtonBuilder)
    /**
     * The type of this Button
     */
    public type: number
    /**
     * The style of this Butotn
     */
    public style: number
    /**
     * The label of this Button
     */
    public label: string
    /**
     * The emoji of this Button
     */
    public emoji: Omit<EmojiIdentifierResolvable, "Emoji">
    /**
     * The custom id of this Button
     */
    public customId: string
    /**
     * The url of this Button
     */
    public url: string
    /**
     * Whether or not this Button is disabled
     */
    public disabled: boolean
    /**
     * Sets the style of this Button
     */
    public setStyle(style: number): this
    /**
     * Sets the label of this Button
     */
    public setLabel(label: string): this
    /**
     * Sets the emoji of this Button
     */
    public setEmoji(emoji: EmojiIdentifierResolvable): this
    /**
     * Sets the custom id of this Button
     */
    public setCustomId(customId: string): this
    /**
     * Sets the url of this Button
     */
    public setUrl(url: string): this
    /**
     * Whether or not to disable this Button
     */
    public setDisabled(disabled: boolean): this
    /**
     * Makes a Button Builder from a Button data
     */
    public static from(button: {}): ButtonBuilder
    public toJSON(): {}
}

export class ActionRowBuilder {
    public constructor(data?: ActionRowBuilder)
    /**
     * The type of this Action Row
     */
    public type: number
    /**
     * The components this Action Row has
     */
    public components: ComponentResolvable[]
    /**
     * Adds components to this Action Row
     */
    public addComponents(...components: ComponentResolvable[] | ComponentResolvable[][]): this
    /**
     * Overwrites the components of this Action Row
     */
    public setComponents(...components: ComponentResolvable[] | ComponentResolvable[][]): this
    public toJSON(): {}
    /**
     * Makes an Action Row Builder from an Action Row data
     */
    public static from(row: ActionRowBuilder): ActionRowBuilder
}

export class SlashSubCommandGroupBuilder {
    public constructor(data?: SlashSubCommandGroupBuilder)
    /**
     * The type of this Sub Command Group
     */
    public type: number
    /**
     * The name of this Sub Command Group
     */
    public name: string
    /**
     * The name localizations of this Sub Command Group
     */
    public nameLocalizations: Record<Locales, string>
    /**
     * The description of this Sub Command Group
     */
    public description: string
    /**
     * The description localizations of this Sub Command Group
     */
    public descriptionLocalizations: Record<Locales, string>
    /**
     * The Sub Commands of this Sub Command Group
     */
    public options: SlashSubCommandBuilder[]
    /**
     * Sets the name of this Sub Command Group
     */
    public setName(name: string): this
    /**
     * Sets the name localizations of this Sub Command Group
     */
    public setNameLocalizations(nameLocalizations: Record<Locales, string>): this
    /**
     * Sets the description of this Sub Command Group
     */
    public setDescription(description: string): this
    /**
     * Sets the description localizations of this Sub Command Group
     */
    public setDescriptionLocalizations(descriptionLocalizations: Record<Locales, string>): this
    /**
     * Adds Sub Commands to this Sub Command Group
     */
    public addSubcommands(subcommands: SlashSubCommandBuilder[]): this
    public toJSON(): {}
}

export class SlashSubCommandBuilder {
    public constructor(data?: SlashSubCommandBuilder)
    /**
     * The type of this Sub Command
     */
    public type: number
    /**
     * The name of this Sub Command
     */
    public name: string
    /**
     * The name localizations of this Sub Command
     */
    public nameLocalizations: Record<Locales, string>
    /**
     * The description of this Sub Command
     */
    public description: string
    /**
     * The description localizations of this Sub Command
     */
    public descriptionLocalizations: Record<Locales, string>
    /**
     * The options of this Sub Command
     */
    public options: SlashOptionBuilder[]
    /**
     * Sets the name of this Sub Command
     */
    public setName(name: string): this
    /**
     * Sets the name localizations of this Sub Command
     */
    public setNameLocalizations(nameLocalizations: Record<Locales, string>): this
    /**
     * Sets the description of this Sub Command
     */
    public setDescription(description: string): this
    /**
     * Sets the description localizations of this Sub Command
     */
    public setDescriptionLocalizations(descriptionLocalizations: Record<Locales, string>): this
    /**
     * Adds option to this Sub Command
     */
    public addOptions(...options: SlashOptionBuilder[] | SlashOptionBuilder[][]): this
    /**
     * Overwrites the option on this Sub Command
     */
    public setOptions(...options: SlashOptionBuilder[] | SlashOptionBuilder[][]): this
    public toJSON(): {}
}

export class SlashCommandBuilder {
    public constructor(data?: SlashCommandBuilder)
    /**
     * The type of this Slash Command
     */
    public type: number
    /**
     * The name of this Slash Command
     */
    public name: string
    /**
     * The name localizations of this Slash Command
     */
    public nameLocalizations: Record<Locales, string>
    /**
     * The description of this Slash Command
     */
    public description: string
    /**
     * The description localizations of this Slash Command
     */
    public descriptionLocalizations: Record<Locales, string>
    /**
     * The options of this Slash Command
     */
    public options: SlashOptionBuilder[]
    /**
     * The permissions needed to use this Slash Command
     */
    public defaultMemberPermissions: Permissions
    /**
     * Sets the type of this Slash Command
     */
    public setType(type: number): this
    /**
     * Sets the name of this Slash Command
     */
    public setName(name: string): this
    /**
     * Sets the name localizations of this Slash Command
     */
    public setNameLocalizations(nameLocalizations: Record<Locales, string>): this
    /**
     * Sets the description of this Slash Command
     */
    public setDescription(description: string): this
    /**
     * Adds option to this Slash Command
     */
    public addOptions(...options: SlashOptionBuilder[] | SlashOptionBuilder[][]): this
    /**
     * Overwrites the existing options on this Slash Command
     */
    public setOptions(...options: SlashOptionBuilder[] | SlashOptionBuilder[][]): this
    /**
     * Sets the default permissions required to use this Slash Command
     */
    public setDefaultMemberPermissions(permissions: PermissionFlagsResolvable): this
    /**
     * Sets whether or not this Slash Command is usable in DM
     */
    public setDmPermission(dmPermission: boolean): this
    /**
     * Adds subcommands to this Slash Command
     */
    public addSubcommands(subcommands: SlashSubCommandBuilder[]): this
    /**
     * Adds subcommand groups to this Slash Command
     */
    public addSubCommandGroups(subcommandGroups: SlashSubCommandGroupBuilder[]): this
    public toJSON(): {}
}

export class SlashOptionBuilder {
    public constructor(data?: SlashOptionBuilder)
    /**
     * The type of this Slash Option
     */
    public type: number
    /**
     * The name of this Slash Option
     */
    public name: string
    /**
     * The name localizations of this Slash Option
     */
    public nameLocalizations: Record<Locales, string>
    /**
     * The description of this Slash Option
     */
    public description: string
    /**
     * The description localizations of this Slash Option
     */
    public descriptionLocalizations: Record<Locales, string>
    /**
     * Whether or not this Slash Option is required
     */
    public required: boolean
    /**
     * The choices of this Slash Option
     */
    public choices: Choices[]
    /**
     * The channel types specified in this Slash Option
     */
    public channelTypes: number[]
    /**
     * The minimum value that can be set for the NUMBER, and INTEGER Slash Option
     */
    public minValue: number
    /**
     * The maximum value that can be set for the NUMBER, and INTEGER Slash Option
     */
    public maxValue: number
    /**
     * The minimum length that can be set for the STRING Slash Option
     */
    public minLength: number
    /**
     * The maximum length that can be set for the STRING Slash Option
     */
    public maxLength: number
    /**
     * Whether or not this Slash Option is autocomplete
     */
    public autocomplete: boolean
    /**
     * Sets the type of this Slash Option
     */
    public setType(type: number): this
    /**
     * Sets the name of this Slash Option
     */
    public setName(name: string): this
    /**
     * Sets the name localizations of this Slash Option
     */
    public setNameLocalizations(nameLocalizations: Record<Locales, string>): this
    /**
     * Sets the description of this Slash Option
     */
    public setDescription(description: string): this
    /**
     * Sets the description localizations of this Slash Option
     */
    public setDescriptionLocalizations(descriptionLocalizations: Record<Locales, string>): this
    /**
     * Whether or not this Slash Option must be required
     */
    public setRequired(required: boolean): this
    /**
     * Adds choices to this Slash Option
     */
    public addChoices(...choices: Choices[] | Choices[][]): this
    /**
     * Overwrites the choices of this Slash Option
     */
    public setChoices(...choices: Choices[] | Choices[][]): this
    /**
     * Adds channel types to this Slash Option
     */
    public addChannelTypes(channelTypes: number[]): this
    /**
     * Sets the minimum value of this Slash Option
     */
    public setMinValue(minValue: number): this
    /**
     * Sets the maximum value of this Slash Option
     */
    public setMaxValue(maxValue: number): this
    /**
     * Sets the minimum length of this Slash Option
     */
    public setMinLength(minLength: number): this
    /**
     * Sets the maximum length of this Slash Option
     */
    public setMaxLength(maxLength: number): this
    /**
     * Sets whether or not this Slash Option is an autocomplete
     */
    public setAutocomplete(autocomplete: boolean): this
    public toJSON(): {}
}

export class Permissions extends Bitfield {
    public constructor(...bits: PermissionFlagsResolvable[] | PermissionFlagsResolvable[][])
    /**
     * Whether or not this Permission has the specified Bitfields
     */
    public has(...bits: PermissionFlagsResolvable[] | PermissionFlagsResolvable[][]): boolean
    /**
     * Whether or not this Permission has any of the specified Bitfields
     */
    public any(...bits: PermissionFlagsResolvable[] | PermissionFlagsResolvable[][]): boolean
    /**
     * Add Bitfields to this
     */
    public add(...bits: PermissionFlagsResolvable[] | PermissionFlagsResolvable[][]): this
    /**
     * Removes the specified Bitfields from this
     */
    public remove(...bits: PermissionFlagsResolvable[] | PermissionFlagsResolvable[][]): this
    /**
     * Returns an Array of missing bitfield strings from this bitfield. Returns an empty array if the specified bitfield contains `Administrator`
     */
    public missing(): PermissionFlagsStrings[]
    /**
     * Whether or not this bitfield is equals another
     */
    public equals(bitfield: Permissions): boolean
    /**
     * Serialize this Bitfield
     */
    public serialize(): Record<PermissionFlagsStrings, bigint>
    /**
     * Whether or not this Permissions bitfield has Administrator
     */
    public checkAdmin(): boolean
    /**
     * Maps the Bitfields to an Array
     */
    public toArray(): PermissionFlagsStrings[]
    /**
     * Stringifies this Bitfield
     */
    public toString(): string
    /**
     * Freezes this Bitfield
     */
    public freeze(): Readonly<this>
    /**
     * The flags of Permissions
     */
    public static Flags: Record<PermissionFlagsStrings, bigint>
    /**
     * Combine all bitfield FLAGS in to one
     */
    public static All: bigint
}

export class ChannelFlags extends Bitfield {
    public constructor(...bits: ChannelFlagsResolvable[] | ChannelFlagsResolvable[][])
    /**
     * Whether or not this Bitfield has any of the specified bits
     */
    public any(...bits: ChannelFlagsResolvable[] | ChannelFlagsResolvable[][]): boolean
    /**
     * Whether or not this Bitfield has the specified bits
     */
    public has(...bits: ChannelFlagsResolvable[] | ChannelFlagsResolvable[][]): boolean
    /**
     * Adds bits to this Bitfield
     */
    public add(...bits: ChannelFlagsResolvable[] | ChannelFlagsResolvable[][]): this
    /**
     * Removes bits from this Bitfield
     */
    public remove(...bits: ChannelFlagsResolvable[] | ChannelFlagsResolvable[][]): this
    /**
     * Returns an Array of missing bitfield strings from this bitfield
     */
    public missing(): ChannelFlagsString[]
    /**
     * Whether or not this bitfield is equals another
     */
    public equals(bitfield: ChannelFlags): boolean
    /**
     * Serialize this Bitfield
     */
    public serialize(): Record<ChannelFlagsString, bigint>
    /**
     * Maps the Bitfields to an Array
     */
    public toArray(): ChannelFlagsString[]
    /**
     * Stringifies the Bitfield
     */
    public toString(): string
    /**
     * Freezes this Bitfield
     */
    public freeze(): Readonly<this>
    /**
     * The FLAGS of this Bitfield
     */
    public static Flags: Record<ChannelFlagsString, bigint>
    /**
     * Combine ALL Bitfields in to one
     */
    public static All: bigint
}

export class Intents extends Bitfield {
    public constructor(...bits: IntentsResolvable[] | IntentsResolvable[][])
    /**
     * Whether or not this Bitfield has any of the specified bits
     */
    public any(...bits: IntentsResolvable[] | IntentsResolvable[][]): boolean
    /**
     * Whether or not this Bitfield has the specified bits
     */
    public has(...bits: IntentsResolvable[] | IntentsResolvable[][]): boolean
    /**
     * Adds bits to this Bitfield
     */
    public add(...bits: IntentsResolvable[] | IntentsResolvable[][]): this
    /**
     * Removes bits from this Bitfield
     */
    public remove(...bits: IntentsResolvable[] | IntentsResolvable[][]): this
    /**
     * Returns an Array of missing bitfield strings from this bitfield
     */
    public missing(): IntentStrings[]
    /**
     * Whether or not this bitfield is equals another
     */
    public equals(bitfield: Intents): boolean
    /**
     * Serialize this Bitfield
     */
    public serialize(): Record<IntentStrings, bigint>
    /**
     * Maps the Bitfields to an Array
     */
    public toArray(): IntentStrings[]
    /**
     * Stringifies the Bitfield
     */
    public toString(): string
    /**
     * Freezes this Bitfield
     */
    public freeze(): Readonly<this>
    /**
     * The FLAGS of this Bitfield
     */
    public static Flags: Record<IntentStrings, bigint>
    /**
     * Combine ALL Bitfields in to one
     */
    public static All: bigint
}

export class Snowflake {
    /**
     * Generates a snowflake from a Date
     */
    public static generate(timestamp?: DateResolvable): string
    /**
     * Deconstructs a snowflake to a readable DateTime
     */
    public static deconstruct(id: string): SnowflakeData
    /**
     * The Discord Epoch
     */
    public static DiscordEpoch: bigint
}

export class Base {
    public constructor(client: Client)
    /**
     * The Client that instantiated this
     */
    public client: Client
}

export class UserFlags extends Bitfield {
    public constructor(...bits: UserFlagsResolvable[] | UserFlagsResolvable[][])
    /**
     * Whether or not this Bitfield has any of the specified bits
     */
    public any(...bits: UserFlagsResolvable[] | UserFlagsResolvable[][]): boolean
    /**
     * Whether or not this Bitfield has the specified bits
     */
    public has(...bits: UserFlagsResolvable[] | UserFlagsResolvable[][]): boolean
    /**
     * Adds bits to this Bitfield
     */
    public add(...bits: UserFlagsResolvable[] | UserFlagsResolvable[][]): this
    /**
     * Removes bits from this Bitfield
     */
    public remove(...bits: UserFlagsResolvable[] | UserFlagsResolvable[][]): this
    /**
     * Returns an Array of missing bitfield strings from this bitfield
     */
    public missing(): UserFlagsStrings[]
    /**
     * Whether or not this bitfield is equals another
     */
    public equals(bitfield: UserFlags): boolean
    /**
     * Serialize this Bitfield
     */
    public serialize(): Record<UserFlagsStrings, bigint>
    /**
     * Maps the Bitfields to an Array
     */
    public toArray(): UserFlagsResolvable[]
    /**
     * Stringifies the Bitfield
     */
    public toString(): string
    /**
     * Freezes this Bitfield
     */
    public freeze(): Readonly<this>
    /**
     * The FLAGS of this Bitfield
     */
    public static Flags: Record<UserFlagsStrings, bigint>
    /**
     * Combine ALL Bitfields in to one
     */
    public static All: bigint
}

export class ApplicationFlags extends Bitfield {
    public constructor(...bits: ApplicationFlagsResolvable[] | ApplicationFlagsResolvable[][])
    /**
     * Whether or not this Bitfield has any of the specified bits
     */
    public any(...bits: ApplicationFlagsResolvable[] | ApplicationFlagsResolvable[][]): boolean
    /**
     * Whether or not this Bitfield has the specified bits
     */
    public has(...bits: ApplicationFlagsResolvable[] | ApplicationFlagsResolvable[][]): boolean
    /**
     * Adds bits to this Bitfield
     */
    public add(...bits: ApplicationFlagsResolvable[] | ApplicationFlagsResolvable[][]): this
    /**
     * Removes bits from this Bitfield
     */
    public remove(...bits: ApplicationFlagsResolvable[] | ApplicationFlagsResolvable[][]): this
    /**
     * Returns an Array of missing bitfield strings from this bitfield
     */
    public missing(): ApplicationFlagsStrings[]
    /**
     * Whether or not this bitfield is equals another
     */
    public equals(bitfield: ApplicationFlags): boolean
    /**
     * Serialize this Bitfield
     */
    public serialize(): Record<ApplicationFlagsStrings, bigint>
    /**
     * Maps the Bitfields to an Array
     */
    public toArray(): ApplicationFlagsResolvable[]
    /**
     * Stringifies the Bitfield
     */
    public toString(): string
    /**
     * Freezes this Bitfield
     */
    public freeze(): Readonly<this>
    /**
     * The FLAGS of this Bitfield
     */
    public static Flags: Record<ApplicationFlagsStrings, bigint>
    /**
     * Combine ALL Bitfields in to one
     */
    public static All: bigint
}

export class Bitfield {
    public constructor(bits?: any)
    /**
     * The bitfield value of this Bitfield
     */
    public bitfield: bigint
    /**
     * The default bit of this Bitfield
     */
    public static defaultBit: bigint
}

export enum ApplicationCommandTypesEnums {
    ChatInput = 1,
    User = 2,
    Message = 3
}

export enum OptionTypesEnums {
    SubCommand = 1,
    SubCommandGroup = 2,
    String = 3,
    Integer = 4,
    Boolean = 5,
    User = 6,
    Channel = 7,
    Role = 8, 
    Mentionable = 9,
    Number = 10, 
    Attachment = 11
}

export enum ChannelTypesEnums {
    GuildText = 0,
    Dm = 1,
    GuildVoice = 2,
    GroupDm = 3,
    GuildCategory = 4,
    GuildAnnouncement = 5,
    AnnouncementThread = 10,
    PublicThread = 11,
    PrivateThread = 12,
    GuildStageVoice = 13,
    GuildDirectory = 14,
    GuildForum = 15,
}

export enum ButtonStylesEnums {
    Primary = 1,
    Secondary = 2,
    Success = 3,
    Danger = 4,
    Link = 5
}

export enum ComponentTypesEnums {
    ActionRow = 1,
    Button = 2,
    StringSelect = 3,
    InputText = 4,
    UserSelect = 5,
    RoleSelect = 6,
    MentionableSelect = 7,
    ChannelSelect = 8    
}

export enum OpCodes {
    Dispatch = 0,
    Hearbeat = 1,
    Identify = 2,
    PresenceUpdate = 3,
    VoiceStateUpdate = 4,
    Resume = 6,
    Reconnect = 7,
    RequestGuildMembers = 8,
    InvalidSession = 9,
    Hello = 10,
    HeartbeatAck = 11
}

export enum VerificationLevelEnums {
    None = 0,
    Low = 1,
    Medium = 2,
    High = 3,
    VeryHigh = 4
}

export enum DefaultMessageNotificationsEnums {
    AllMessages = 0,
    OnlyMentions = 1
}

export enum ExplicitContentFilterEnums {
    Disabled = 0,
    MembersWithoutRoles = 1,
    AllMembers = 2
}

export enum MfaLevelEnums {
    None = 0,
    Elevated = 1
}

export enum NsfwLevelEnums {
    Default = 0,
    Explicit = 1,
    Safe = 2,
    AgeRestricted = 3
}

export enum PremiumTierEnums {
    None = 0,
    Tier1 = 1,
    Tier2 = 2,
    Tier3 = 3
}

export enum PartialsEnums {
    Channel = 0,
    Message = 1,
    ApplicationCommand = 2
}

export enum VideoQualityModeEnums {
    Auto = 1,
    Full = 2
}

export enum ApplicationCommandPermissionTypeEnums {
    Role = 1,
    User = 2,
    Channel = 3
}

export enum InputTextStyleEnums {
    Short = 1,
    Paragraph = 2
}

export enum EventTypes {
    Ready = "ready",
    ApplicationCommandPermissionsUpdate = "applicationCommandPermissionsUpdate",
    AutoModerationRuleCreate = "autoModerationRuleCreate",
    AutoModerationRuleUpdate = "autoModerationRuleUpdate",
    AutoModerationRuleDelete = "autoModerationRuleDelete",
    AutoModerationActionExecution = "autoModerationActionExecution",
    ChannelCreate = "channelCreate",
    ChannelUpdate = "channelUpdate",
    ChannelDelete = "channelDelete",
    ChannelPinsUpdate = "channelPinsUpdate",
    ThreadCreate = "threadCreate",
    ThreadUpdate = "threadUpdate",
    ThreadDelete = "threadDelete",
    ThreadListSync = "threadListSync",
    ThreadMemberUpdate = "threadMemberUpdate",
    ThreadMembersUpdate = "threadMembersUpdate",
    GuildCreate = "guildCreate",
    GuildUpdate = "guildUpdate",
    GuildDelete = "guildDelete",
    GuildBanAdd = "guildBanAdd",
    GuildUnavailable = "guildUnavailable",
    GuildBanRemove = "guildBanRemove",
    GuildEmojisUpdate = "guildEmojisUpdate",
    GuildStickersUpdate = "guildStickersUpdate",
    GuildIntegrationsUpdate = "guildIntegrationsUpdate",
    GuildMemberAdd = "guildMemberAdd",
    GuildMemberRemove = "guildMemberRemove",
    GuildMemberUpdate = "guildMemberUpdate",
    GuildMembersChunk = "guildMembersChunk",
    GuildRoleCreate = "guildRoleCreate",
    GuildRoleUpdate = "guildRoleUpdate",
    GuildRoleDelete = "guildRoleDelete",
    GuildScheduledEventCreate = "guildScheduledEventCreate",
    GuildScheduledEventUpdate =  "guildScheduledEventUpdate",
    GuildScheduledEventDelete = "guildScheduledEventDelete",
    GuildScheduledEventUserAdd = "guildScheduledEventUserAdd",
    GuildScheduledEventUserRemove = "guildScheduledEventUserRemove",
    IntegrationCreate = "integrationCreate",
    IntegrationUpdate = "integrationUpdate",
    IntegrationDelete = "integrationDelete",
    InteractionCreate = "interactionCreate",
    InviteCreate = "inviteCreate",
    InviteDelete = "inviteDelete",
    MessageCreate = "messageCreate",
    MessageUpdate = "messageUpdate",
    MessageDelete = "messageDelete",
    MessageDeleteBulk = "messageDeleteBulk",
    MessageReactionAdd = "messageReactionAdd",
    MessageReactionRemove = "messageReactionRemove",
    MessageReactionRemoveAll = "messageReactionRemoveAll",
    MessageReactionRemoveEmoji = "messageReactionRemoveEmoji",
    PresenceUpdate = "presenceUpdate",
    StageInstanceCreate = "stageInstanceCreate",
    StageInstanceUpdate = "stageInstanceUpdate",
    StageInstanceDelete = "stageInstanceDelete",
    TypingStart = "typingStart",
    UserUpdate = "userUpdate",
    VoiceStateUpdate = "voiceStateUpdate",
    VoiceServerUpdate = "voiceServerUpdate",
    WebhooksUpdate = "webhooksUpdate",
    Debug = "debug",
    StickersCreate = "stickersCreate",
    StickersUpdate = "stickersUpdate",
    StickersDelete = "stickersDelete",
    ThreadMemberAdd = "threadMemberAdd",
    ThreadMemberRemove = "threadMemberRemove",
    EmojiCreate = "emojiCreate",
    EmojiUpdate = "emojiUpdate",
    EmojiDelete = "emojiDelete",
    Ratelimit = "ratelimit"
}

export enum WSEventCodes {
    Close = "close",
    Error = "error",
    Message = "message",
    Open = "open",
    Ping = "ping",
    Pong = "pong",
    UnexpectedResponse = "unexpected-response",
    Upgrade = "upgrade"
}

export enum WsReadyStateCodes {
    Connecting = 0,
    Open = 1,
    Closing = 2,
    Closed = 3
}

export enum InviteTargetTypesEnums {
    Stream = 1,
    EmbeddedApplication = 2
}

export enum GuildScheduledEventPrivacyEnums {
    GuildOnly = 2
}

export enum GuildScheduledEventEntityEnums {
    StageInstance = 1,
    Voice = 2,
    External = 3
}

export enum GuildScheduledEventStatusEnums {
    Scheduled = 1,
    Active = 2,
    Completed = 3,
    Canceled = 4
}

export enum StageInstancePrivacyLevelEnums {
    Public = 1,
    GuildOnly = 2
}


export enum TeamMemberMembershipStateEnums {
    Invited = 1,
    Accepted = 2
}

export enum ForumChannelDefaultSortOrderTypeEnums {
    LatestActivity = 0,
    CreationDate = 1
}

export enum InteractionResponsesEnums {
    Pong = 1,
    ChannelMessageWithSource = 4,
    DeferredChannelMessageWithSource = 5,
    DeferredUpdateMessage = 6,
    UpdateMessage = 7,
    ApplicationCommandAutocompleteResult = 8,
    Modal = 9
}

export enum OverwriteTypeEnums {
    Role = 0,
    Member = 1
}

export type SnowflakeRegex = RegExp


export enum AuditLogEventEnums {
    GuildUpdate = 1,
    ChannelCreate = 10,
    ChannelUpdate = 11,
    ChannelDelete = 12,
    ChannelOverwriteCreate = 13,
    ChannelOverwriteUpdate = 14,
    ChannelOverwriteDelete = 15,
    MemberKick = 20,
    MemberPrune = 21,
    MemberBanAdd = 22,
    MemberBanRemove = 23,
    MemberUpdate = 24,
    MemberRoleUpdate = 25,
    MemberMove = 26,
    MemberDisconnect = 27,
    BotAdd = 28,
    RoleCreate = 30,
    RoleUpdate = 31,
    RoleDelete = 32,
    InviteCreate = 40,
    InviteUpdate = 41,
    InviteDelete = 42,
    WebhookCreate = 50,
    WebhookUpdate = 51,
    WebhookDelete = 52,
    EmojiCreate = 60,
    EmojiUpdate = 61,
    EmojiDelete = 62,
    MessageDelete = 72,
    MessageBulkDelete = 73,
    MessagePin = 74,
    MessageUnpin = 75,
    IntegrationCreate = 80,
    IntegrationUpdate = 81,
    IntegrationDelete = 82,
    StageInstanceCreate = 83,
    StageInstanceUpdate = 84,
    StageInstanceDelete = 85,
    StickerCreate = 90,
    StickerUpdate = 91,
    StickerDelete = 92,
    GuildScheduledEventCreate = 100,
    GuildScheduledEventUpdate = 101,
    GuildScheduledEventDelete = 102,
    ThreadCreate = 110,
    ThreadUpdate = 111,
    ThreadDelete = 112,
    ApplicationCommandPermissionUpdate = 121,
    AutoModerationRuleCreate = 140,
    AutoModerationRuleUpdate = 141,
    AutoModerationRuleDelete = 142,
    AutoModerationBlockMessage = 143,
    AutoModerationFlagToChannel = 144,
    AutoModerationUserCommunicationDisabled = 145
}

export enum MessageTypeEnums {
    Default = 0,
    RecipientAdd = 1,
    RecipientRemove = 2,
    Call = 3,
    ChannelNameChange = 4,
    ChannelIconChange = 5,
    ChannelPinnedMessage = 6,
    UserJoin = 7,
    GuildBoost = 8,
    GuildBoostTier1 = 9,
    GuildBoostTier2 = 10,
    GuildBoostTier3 = 11,
    ChannelFollowAdd = 12,
    GuildDiscoveryDisqualified = 14,
    GuildDiscoveryRequalified = 15,
    GuildDiscoveryGracePeriodInitialWarning = 16,
    GuildDiscoveryGracePeriodFinalWarning = 17,
    ThreadCreated = 18,
    Reply = 19,
    ChatInputCommand = 20,
    ThreadStarterMessage = 21,
    GuildInviteReminder = 22,
    ContextMenuCommand = 23,
    AutoModerationAction = 24,
    RoleSubscriptionPurchase = 25
}

export enum ActivityTypesEnums {
    Game = 0,
    Streaming = 1,
    Listening = 2,
    Watching = 3,
    Custom = 4,
    Competing = 5
}

export enum GuildFeaturesEnums {
    AnimatedBanner = "ANIMATED_BANNER",
    AnimatedIcon = "ANIMATED_ICON",
    AutoModeration = "AUTO_MODERATION",
    Banner = "BANNER",
    Community = "COMMUNITY",
    DeveloperSupportServer = "DEVELOPER_SUPPORT_SERVER",
    Discoverable = "DISCOVERABLE",
    Featurable = "FEATURABLE",
    InvitesDisabled = "INVITES_DISABLED",
    InviteSplash = "INVITE_SPLASH",
    MemberVerificationGateEnabled = "MEMBER_VERIFICATION_GATE_ENABLED",
    MonetizationEnabled = "MONETIZATION_ENABLED",
    MoreStickers = "MORE_STICKERS",
    News = "NEWS",
    Partnered = "PARTNERED",
    PreviewEnabled = "PREVIEW_ENABLED",
    PrivateThreads = "PRIVATE_THREADS",
    RoleIcons = "ROLE_ICONS",
    TicketsEventsDisabled = "TICKETED_EVENTS_ENABLED",
    VanityUrl = "VANITY_URL",
    Verified = "VERIFIED",
    VipRegions = "VIP_REGIONS",
    WelcomeScreenEnabled = "WELCOME_SCREEN_ENABLED",
    GuildOnboardingEverEnabled = "GUILD_ONBOARDING_EVER_ENABLED",
    ApplicationCommandPermissionsV2 = "APPLICATION_COMMAND_PERMISSIONS_V2"
}


export enum AutoModerationEventTypesEnums {
    MessageSend = 1
}

export enum AutoModerationTriggerTypesEnums {
    Keyword = 1,
    Spam = 3,
    KeywordPreset = 4,
    MentionSpam = 5
}

export enum AutoModerationKeywordPresetTypesEnums {
    Profanity = 1,
    SexualContent = 2,
    Slurs = 3
}

export enum AutoModerationActionTypesEnums {
    BlockMessage = 1,
    SendAlertMessage = 2,
    Timeout = 3
}

export enum ImageFileTypes {
    Png = ".png",
    Jpg = ".jpg",
    Jpeg = ".jpeg",
    Webp = ".webp",
    Gif = ".gif"
}

export enum MessageActivityTypesEnums {
    Join = 1,
    Spectate = 2,
    Listen = 3,
    JoinRequest = 5
}

export enum PremiumType {
    None = 0,
    NitroClassic = 1,
    Nitro = 2,
    NitroBasic = 3
}

export enum ConnectionVisibility {
    None = 0,
    Everyone = 1
}

export enum WebsocketEvents {
    Ready = "READY",
    Hello = "HELLO",
    Resumed = "RESUMED",
    Reconnect = "RECONNECT",
    InvalidSession = "INVALID_SESSION",
    ApplicationCommandPermissionsUpdate = "APPLICATION_COMMAND_PERMISSIONS_UPDATE",
    AutoModerationRuleCreate = "AUTO_MODERATION_RULE_CREATE",
    AutoModerationRuleUpdate = "AUTO_MODERATION_RULE_UPDATE",
    AutoModerationRuleDelete = "AUTO_MODERATION_RULE_DELETE",
    AutoModerationActionExecution = "AUTO_MODERATION_ACTION_EXECUTION",
    ChannelCreate = "CHANNEL_CREATE",
    ChannelUpdate = "CHANNEL_UPDATE",
    ChannelDelete = "CHANNEL_DELETE",
    ChannelPinsUpdate = "CHANNEL_PINS_UPDATE",
    ThreadCreate = "THREAD_CREATE",
    ThreadUpdate = "THREAD_UPDATE",
    ThreadDelete = "THREAD_DELETE",
    ThreadListSync = "THREAD_LIST_SYNC",
    ThreadMemberUpdate = "THREAD_MEMBER_UPDATE",
    ThreadMembersUpdate = "THREAD_MEMBERS_UPDATE",
    GuildCreate = "GUILD_CREATE",
    GuildUpdate = "GUILD_UPDATE",
    GuildDelete = "GUILD_DELETE",
    GuildUnavailable = "GUILD_UNAVAILABLE",
    GuildBanAdd = "GUILD_BAN_ADD",
    GuildBanRemove = "GUILD_BAN_REMOVE",
    GuildEmojisUpdate = "GUILD_EMOJIS_UPDATE",
    GuildStickersUpdate = "GUILD_STICKERS_UPDATE",
    GuildIntegrationsUpdate = "GUILD_INTEGRATIONS_UPDATE",
    GuildMemberAdd = "GUILD_MEMBER_ADD",
    GuildMemberRemove = "GUILD_MEMBER_REMOVE",
    GuildMemberUpdate = "GUILD_MEMBER_UPDATE",
    GuildMembersChunk = "GUILD_MEMBERS_CHUNK",
    GuildRoleCreate = "GUILD_ROLE_CREATE",
    GuildRoleUpdate = "GUILD_ROLE_UPDATE",
    GuildRoleDelete = "GUILD_ROLE_DELETE",
    GuildScheduledEventCreate = "GUILD_SCHEDULED_EVENT_CREATE",
    GuildScheduledEventUpdate = "GUILD_SCHEDULED_EVENT_UPDATE",
    GuildScheduledEventDelete = "GUILD_SCHEDULED_EVENT_DELETE",
    GuildScheduledEventUserAdd = "GUILD_SCHEDULED_EVENT_USER_ADD",
    GuildScheduledEventUserRemove = "GUILD_SCHEDULED_EVENT_USER_REMOVE",
    IntegrationCreate = "INTEGRATION_CREATE",
    IntegrationUpdate = "INTEGRATION_UPDATE",
    IntegrationDelete = "INTEGRATION_DELETE",
    InteractionCreate = "INTERACTION_CREATE",
    InviteCreate = "INVITE_CREATE",
    InviteDelete = "INVITE_DELETE",
    MessageCreate = "MESSAGE_CREATE",
    MessageUpdate = "MESSAGE_UPDATE",
    MessageDelete = "MESSAGE_DELETE",
    MessageDeleteBulk = "MESSAGE_DELETE_BULK",
    MessageReactionAdd = "MESSAGE_REACTION_ADD",
    MessageReactionRemove = "MESSAGE_REACTION_REMOVE",
    MessageReactionRemoveAll = "MESSAGE_REACTION_REMOVE_ALL",
    MessageReactionRemoveEmoji = "MESSAGE_REACTION_REMOVE_EMOJI",
    PresenceUpdate = "PRESENCE_UPDATE",
    StageInstanceCreate = "STAGE_INSTANCE_CREATE",
    StageInstanceUpdate = "STAGE_INSTANCE_UPDATE",
    StageInstanceDelete = "STAGE_INSTANCE_DELETE",
    TypingStart = "TYPING_START",
    UserUpdate = "USER_UPDATE",
    VoiceStateUpdate = "VOICE_STATE_UPDATE",
    VoiceServerUpdate = "VOICE_SERVER_UPDATE",
    WebhooksUpdate = "WEBHOOKS_UPDATE",
    Debug = "DEBUG",
    StickersCreate = "STICKERS_CREATE",
    StickersUpdate = "STICKERS_UPDATE",
    StickersDelete = "STICKERS_DELETE",
    ThreadMemberAdd = "THREAD_MEMBER_ADD",
    ThreadMemberRemove = "THREAD_MEMBER_REMOVE",
    EmojiCreate = "EMOJI_CREATE",
    EmojiUpdate = "EMOJI_UPDATE",
    EmojiDelete = "EMOJI_DELETE"
}

export enum WebsocketStatus {
    Ready = "READY",
    Closing = "CLOSING",
    Closed = "CLOSED",
    Reconnecting = "RECONNECTING"
}

export enum ForumLayoutTypesEnums {
    Default = 0,
    List = 1,
    Grid = 2
}