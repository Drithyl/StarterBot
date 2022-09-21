const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("ban")
		.setDescription("Select a member and ban them (but not really).")
        .addUserOption(option =>
            option.setName("target")
            .setDescription("The member to ban.")
            .setRequired(true)
        )
        // Set permission so only those with either kick
        // or ban permissions can use this command. Default
        // command permissions for guild commands can be
        // overwritten by guild administrators on Discord!
        .setDefaultMemberPermissions(
            PermissionFlagsBits.KickMembers |
            PermissionFlagsBits.BanMembers
        ),
	execute: async function(interaction)
	{
        const target = interaction.options.getUser("target");
		await interaction.reply(`As if you could ban ${target.username}! :D`);
	}
};
