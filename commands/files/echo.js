const { SlashCommandBuilder } = require("discord.js");

const INPUT_OPTION_NAME = "input";

module.exports = {
	data: new SlashCommandBuilder()
		.setName("echo")
		.setDescription("Replies with your input!")
        .addStringOption(option =>
            option.setName(INPUT_OPTION_NAME)
            .setDescription("The input to echo back")
            .setMinLength(1)
            .setRequired(true)
        ),

	execute: async function(interaction)
    {
        const input = interaction.options.getString(INPUT_OPTION_NAME);
		await interaction.reply(input);
	}
};
