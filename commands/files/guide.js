const { SlashCommandBuilder } = require("discord.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("guide")
		.setDescription("Search discordjs.guide!")
        .addStringOption(option =>
            option.setName("query")
            .setDescription("Phrase to search for")
            .setAutocomplete(true)
        )
        .addStringOption(option =>
            option.setName("version")
            .setDescription("Phrase to search for")
            .setAutocomplete(true)
        ),
    // We will receive below the autocompleted interaction with
    // the final input value.
    // Autocomplete interactions CANNOT be deferred; they must be
    // responded to within 3 seconds no matter what. Additionally,
    // only a maximum of 25 choices is allowed on the autocomplete
    // response at one time.
	async execute(interaction)
    {
        const input = interaction.options.getString("query");
		await interaction.reply("Your query was: " + input);
	},
    // NOTES: an autocomplete interaction is a helper for a user to
    // complete possible option values for a slash command. Once the
    // user selects one of the autocompleted values we display, it
    // will be sent as a slash command interaction with the value
    // chosen by the user, and resolved above.
    async autocomplete(interaction)
    {
        // Returns the value of the option currently
		// being focused by the user. "true" makes it
		// return the whole focused object instead of
		// its string value. This way we can access the
		// name of the focused value as well.
		const focusedOption = interaction.options.getFocused(true);

		/* OTHER TYPES OF VALUES THAT CAN BE ACCESSED:

		const string = interaction.options.getString("input");
		const integer = interaction.options.getInteger("int");
		const boolean = interaction.options.getBoolean("choice");
		const number = interaction.options.getNumber("num");

		Discord object type values that have a Discord id, like users,
		members, channels, roles, mentionables and attachments can also
		be accessed, but using the syntax below instead:
		const snowflake = interaction.options.get("id of item to get").value;
		*/

		let choices;

		if (focusedOption.name === "query")
		{
			// Array of choices that are available to select
			choices = [
				"Popular Topics: Threads",
				"Sharding: Getting started",
				"Library: Voice Connections",
				"Interactions: Replying to slash commands",
				"Popular Topics: Embed preview"
			];
		}

		if (focusedOption.name === "version")
		{
			// Array of choices that are available to select
			choices = ["v9", "v11", "v12", "v13", "v14"];
		}

		// Filter choices based on our focused value
		const filtered = choices.filter(choice =>
			choice.startsWith(focusedOption.value)
		);

		// Respond with the list of choices that match
		// the focused value, like an autocomplete
		await interaction.respond(
			filtered.map(choice => ({ name: choice, value: choice })),
		);
    }
};
