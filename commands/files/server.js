const { SlashCommandBuilder } = require("discord.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("server")
		.setDescription("Replies with sever info!"),
	execute: async function(interaction)
	{
		const guildName = interaction.guild.name;
		const memberCount = interaction.guild.memberCount;

		await interaction.reply(
			`**Server name:** ${guildName}\n**Total members:** ${memberCount}`
		);
	}
};
