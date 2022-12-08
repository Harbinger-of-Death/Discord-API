

const ContextMenuInteraction = require('./ContextMenuInteraction')

/**
 * Represents a user context interaction
 * @extends {ContextMenuInteraction}
 */
class UserContextMenuInteraction extends ContextMenuInteraction {
    /**
     * The target user from this interaction
     * @type {User}
     * @readonly
     */
    get targetUser() {
        return this.options.getUser("user")
    }
}
module.exports = UserContextMenuInteraction;