const {
    ContextMenuCommandBuilder,
    ApplicationCommandType
} = require("discord.js");

module.exports =
{
    // IMPORTANT: Unlike slash commands, context commands cannot have
    // subcommands or any options. Responding to context commands works
    // the same way as responding to slash commands. Permissions also
    // work the same way as slash command permissions.
    data: new ContextMenuCommandBuilder()
        .setName("User Information")
        // Sets the type of context menu command
        .setType(ApplicationCommandType.User),

    execute: async function(interaction)
    {
        const username = interaction.targetUser;
        await interaction.reply(`User: ${username}`);
    }
};