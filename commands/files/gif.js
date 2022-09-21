const { SlashCommandBuilder } = require("discord.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("gif")
		.setDescription("Sends a random gif!")
        .addStringOption(option =>
            option.setName("category")
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
		await interaction.reply("Imagine this is a gif! :D");
	}
};
