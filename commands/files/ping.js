const { SlashCommandBuilder } = require("discord.js");
const wait = require("node:timers/promises").setTimeout;

module.exports = {
	data: new SlashCommandBuilder()
		.setName("ping")
		.setDescription("Replies with Pong!"),

	execute: async function(interaction)
	{
		// Defer response so we can take longer than 3 seconds to respond
		// Ephemeral responses only show up for the command sender
		await interaction.deferReply();

		// Wait longer than the 3 seconds threshold to respond to commands
		await wait(4000);

		// After deferring, we need to respond with editReply(). Using
		// reply() will yield an error
		await interaction.editReply("Pong!");

		await wait(2000);

		// Non-ephemeral interaction responses can be deleted
		if (interaction.ephemeral === false)
			await interaction.deleteReply();

		// Send a follow up message rather than editing the previous one
		await interaction.followUp({ content: "Pong again!", ephemeral: true });

		// This will produce an error, because original reply was deleted above.
		// Follow up messages can't be fetched with fetch reply
		/*
		const secondMessage = await interaction.fetchReply();
		console.log(secondMessage);
		*/
	}
};
