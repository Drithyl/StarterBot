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
        .setName("Message Information")
        // Sets the type of context menu command
        .setType(ApplicationCommandType.Message),

    execute: async function(interaction)
    {
        const message = interaction.targetMessage;
        await interaction.reply(`Message content:\n\n${message.content}`);
    }
};