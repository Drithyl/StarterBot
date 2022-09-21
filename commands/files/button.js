const {
    ActionRowBuilder,
    ButtonBuilder,
    SlashCommandBuilder,
    ButtonStyle,
    EmbedBuilder
} = require("discord.js");
const wait = require("node:timers/promises").setTimeout;

module.exports = {
	data: new SlashCommandBuilder()
		.setName("button")
		.setDescription("Get a mystery button!"),
	async execute(interaction)
	{
        // A button, like any other message component, must be
        // part of an ActionRow. A message can have a max of
        // 5 ActionRows, and 5 buttons within each ActionRow.
        const actionRow = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                .setCustomId("primary")
                .setLabel("Click me!")
                // There are several button styles available
                .setStyle(ButtonStyle.Primary)
                // Emoji can also be set through its ID, theoretically
                .setEmoji("😘")
                // Stop button from being used, but still show it
                // .setDisabled(true)
            );

        const embed = new EmbedBuilder()
            .setColor(0x0099FF)
            .setTitle("This is a link inside a title!")
            .setURL("https://discord.js.org")
            .setDescription("This is a description");

		await interaction.reply({
            content: "I think you should...",
            // Messages with embeds or components can also be ephemeral
            // (only show for the user who sent the command)
            ephemeral: true,
            embeds: [embed],
            components: [ actionRow ]
        });
	},
    componentHandlers:
    {
        primary: onPrimaryButtonHandler
    }
};

// buttonInteractions are replied to with the same methods as commands
// The update to the message after clicking can also be deferred
// with .deferUpdate(), triggering a loading state.
async function onPrimaryButtonHandler(buttonInteraction)
{
    await buttonInteraction.deferUpdate();
    await wait(4000);
    await buttonInteraction.editReply({ content: "The button was clicked!" });
}