const { SlashCommandBuilder } = require("discord.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("info")
		.setDescription("Get info about a user or a server!")
        .addSubcommand(subcommand =>
            subcommand.setName("user")
            .setDescription("Info about a user!")
            .addUserOption(option =>
                option.setName("target")
                .setDescription("The user to get info on")
            )
        )
        .addSubcommand(subcommand =>
            subcommand.setName("server")
            .setDescription("Info about the server!")
        ),
	execute: async function(interaction)
    {
        if (interaction.options.getSubcommand() === "server")
            await onServerSubcommand(interaction);

        else if (interaction.options.getSubcommand("user"))
            await onUserSubcommand(interaction);

        else
        {
            throw new Error(
                `No case to resolve subcommand ${interaction.commandName}`
            );
        }
	}
};

async function onServerSubcommand(interaction)
{
    const guildName = interaction.guild.name;
    const memberCount = interaction.guild.memberCount;
    await interaction.reply(
        `**Server name:** ${guildName}\n**Total members:** ${memberCount}`
    );
}

async function onUserSubcommand(interaction)
{
    const user = interaction.options.getUser("target");

    if (user != null)
    {
        const username = user.username;
        const id = user.id;
        await interaction.reply(
            `**Username:** ${username}\n**ID:** ${id}`
        );
    }

    // No user target selected, so target self
    else
    {
        const username = interaction.user.username;
        const id = interaction.user.id;
        await interaction.reply(
            `**Your username:** ${username}\n**Your ID:** ${id}`
        );
    }
}