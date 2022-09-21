const { SlashCommandBuilder } = require("discord.js");

const CATEGORY_OPTION_NAME = "category";

module.exports = {
	data: new SlashCommandBuilder()
		.setName("gif")
		.setDescription("Sends a random gif!")
        .addStringOption(option =>
            option.setName(CATEGORY_OPTION_NAME)
            .setDescription("The gif category")
            .setRequired(true)
            .addChoices(
                { name: "Funny", value: "gif_funny" },
                { name: "Meme", value: "gif_meme" },
                { name: "Movie", value: "gif_movie" }
            )
        ),

	execute: async function(interaction)
    {
        const category = interaction.options.getString(CATEGORY_OPTION_NAME);
		await interaction.reply(`Imagine this is a <${category}> gif! :D`);
	}
};
