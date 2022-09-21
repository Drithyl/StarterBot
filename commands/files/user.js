const { SlashCommandBuilder } = require("discord.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("user")
		.setDescription("Replies with user info!"),
	execute: async function(interaction)
	{
		const tag = interaction.user.tag;
		const id = interaction.user.id;
		await interaction.reply(`**Your tag:** ${tag}\n**Your id:** ${id}`);
	}
};
