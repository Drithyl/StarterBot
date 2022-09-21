const commands = require("./commands/commands-index");
const { testGuildId } = require("./config/config.json");

commands.deploy.toGuild(testGuildId);