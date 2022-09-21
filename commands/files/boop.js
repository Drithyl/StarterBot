const { SlashCommandBuilder } = require("discord.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("boop")
		.setDescription("Replies with beep!")
        // Cannot be used  by DM. By default all global commands
        // (not guild ones) can be used by DM
        .setDMPermission(false),
	async execute(interaction)
	{
		await interaction.reply("Beep!");
	}
};
