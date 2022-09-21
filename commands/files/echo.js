const { SlashCommandBuilder } = require("discord.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("echo")
		.setDescription("Replies with your input!")
        .addStringOption(option =>
            option.setName("input")
            .setDescription("The input to echo back")
            .setMinLength(1)
            .setRequired(true)
        ),
	execute: async function(interaction)
    {
        const input = interaction.options.get("input").value;
		await interaction.reply(input);
	}
};
