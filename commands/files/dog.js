const { SlashCommandBuilder } = require("discord.js");

const BREED_OPTION_NAME = "breed";

module.exports = {
	data: new SlashCommandBuilder()
		.setName("dog")
        .setNameLocalizations({
            pl: "pies",
            de: "hund",
            fr: "chien",
            "es-ES": "perro"
        })
		.setDescription("Get a cute doggo")
        .setDescriptionLocalizations({
            pl: "Słodkie zdjęcie pieska!",
            de: "Poste ein niedliches Hundebild!",
            fr: "Recoi un chien mignon!",
            "es-ES": "Recibe un perro adorable!"
        })
        .addStringOption(option =>
            option.setName(BREED_OPTION_NAME)
            .setDescription("Breed of dog")
            .setNameLocalizations({
                pl: "rasa",
                de: "rasse",
                fr: "race",
                "es-ES": "raza"
            })
            .setDescriptionLocalizations({
                pl: "Rasa psa",
                de: "Hunderasse",
                fr: "Race du chien",
                "es-ES": "Raza de perro"
            })
        ),

	execute: async function(interaction)
    {
        const breed = interaction.options.getString(BREED_OPTION_NAME);
		await interaction.reply(`Imagine this is a <${breed}> dog picture! :D`);
	}
};
