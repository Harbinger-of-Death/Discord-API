const { WsCloseCodes } = require("../../Util/Constants");

module.exports = Object.fromEntries([
    [WsCloseCodes.UnknownError, require("./UnknownError")],
    [WsCloseCodes.UnknownOpcode, require("./UnknownOpcode")],
    [WsCloseCodes.DisallowedIntents, require("./DisallowedIntents")]
])