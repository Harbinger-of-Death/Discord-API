const PermissionOverwritesManager = require("../Managers/PermissionOverwritesManager");
const Collection = require("../Util/Collection");
const Permissions = require("../Util/Permissions");
const Channel = require("./Channel");
const Webhook = require("./Webhook");
class GuildChannel extends Channel {
    constructor(data = {}, client, extras) {
        super(data, client, extras)
        this.topic = data.topic ?? null
        this.position = data.position ?? null
        this.permissionOverwrites = new PermissionOverwritesManager(this.id, this.client, data.permission_overwrites)
        this.parentId = data.parent_id ?? null
    }

    isRulesChannel() {
        if(this.guild?.rulesChannelId === this.id) return true;
        return false;
    }

    isSystemChannel() {
        if(this.guild?.systemChannelId === this.id) return true;
        return false;
    }

    isPublicUpdatesChannel() {
        if(this.guild?.publicUpdatesChannelId === this.id) return true;
        return false;
    }

    isWidgetChannel() {
        if(this.guild?.widgetChannelId === this.id) return true;
        return false;
    }

    async clone(reason) {
        return await this.guild?.channels.clone(this, reason)
    }

    get parent() {
        return this.client.channels.cache.get(this.parentId) ?? null
    }

    async setPosition(position, reason) {
        return await this.edit({ position, reason })
    }

    async setParent(parent, reason) {
        return await this.edit({ parent, reason  })
    }

    async fetchWebhooks() {
        const webhooks = await this.client.api.get(`${this.client.root}/channels/${this.id}/webhooks`)
        return new Collection(webhooks?.map(o => [o.id, new Webhook(o, this.client)]))
    }

    get deletable() {
        if(!this.guild?.me) throw new RangeError(`Uncached Client GuildMember`)
        if(!this.permissionsFor(this.guild?.me)?.has(Permissions.Flags.ManageChannels, Permissions.Flags.ViewChannel)) return false;
        return true;
    }

    permissionsFor(userOrRole) {
        userOrRole = typeof userOrRole === "string" ? userOrRole : userOrRole.id
        const member = this.guild?.members.cache.get(userOrRole)
        const role = this.guild?.roles.cache.get(userOrRole)
        if(member) {
            if(member.permissions.has(Permissions.Flags.Administrator) || this.guild?.ownerId === userOrRole) return new Permissions(Permissions.All).freeze()
            const memberPermissions = new Permissions(member.permissions)
            const overwrites = this.permissionOverwrites.cache.get(userOrRole)
            if(overwrites) {
                memberPermissions.add(overwrites.allow)
                memberPermissions.remove(overwrites.deny)
            }
            const roleOverwrites = this.permissionOverwrites.cache.filter(o => member.roles.cache.has(o.id))
            if(roleOverwrites) {
                for(const val of roleOverwrites?.values()) {
                    memberPermissions.add(val.allow)
                    memberPermissions.remove(val.deny)
                }

                return memberPermissions.freeze()
            }
        }

        if(role) {
            if(role.permissions.has(Permissions.Flags.Administrator)) return new Permissions(Permissions.All).freeze()
            const rolePermissions = new Permissions(role.permissions)
            const overwrites = this.permissionOverwrites.cache.get(userOrRole)
            rolePermissions.add(overwrites.allow)
            rolePermissions.remove(overwrites.deny)
            return rolePermissions.freeze()
        }

        throw new RangeError(`Specified User or Role is invalid. Or uncached`)
    }

    equals(channel) {
        return super.equals(channel) &&
        this.permissionOverwrites.cache.size === channel.permissionOverwrites.cache.size &&
        this.permissionOverwrites.cache.every(permissions => permissions.equals(channel.permissionOverwrites.cache.get(permissions.id)))
    }

    get members() {
        return this.guild?.members.cache.filter(o => o.permissionsIn(this).any(Permissions.Flags.ViewChannel, Permissions.Flags.Administrator))
    }

}

module.exports = GuildChannel