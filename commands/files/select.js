const {
    ActionRowBuilder,
    EmbedBuilder,
    SelectMenuBuilder,
    SlashCommandBuilder } = require("discord.js");
const wait = require("node:timers/promises").setTimeout;

module.exports = {
	data: new SlashCommandBuilder()
		.setName("select")
		.setDescription("Gives you options!"),
	async execute(interaction)
	{
        // A select, like any other message component, must be
        // part of an ActionRow. A message can have a max of
        // 5 ActionRows, and 1 selects within each ActionRow.
        const actionRow = new ActionRowBuilder()
            .addComponents(
                new SelectMenuBuilder()
                .setCustomId("select")
                .setPlaceholder("Nothing selected")
                // Minimum number of options that must be selected
                .setMinValues(2)
                // Max number of options that can be selected
                .setMaxValues(3)
                .addOptions(
                    {
                        label: "Select me",
                        description: "This is a description",
                        value: "first_option"
                    },
                    {
                        label: "You can select me too",
                        description: "This is also a description",
                        value: "second_option"
                    },
                    {
                        label: "I am also an option",
                        description: "This is a description as well",
                        value: "third_option"
                    },
                )
            );

        const embed = new EmbedBuilder()
        .setColor(0x0099FF)
        .setTitle("This is a link inside a title!")
        .setURL("https://discord.js.org")
        .setDescription("This is a description");

		await interaction.reply({
            content: "Here's your options!",
            embeds: [ embed ],
            ephemeral: true,
            components: [ actionRow ]
        });
	},
    componentHandlers:
    {
        select: onSelectHandler
    }
};

// Select interactions work just like button interactions
// in terms of what can be done with them (see button.js)
async function onSelectHandler(selectInteraction)
{
    // Get the array of values of every selected option
    const values = selectInteraction.values;
    let optionValues = "";

    values.forEach(sOption => optionValues += `${sOption}\n`);

    await selectInteraction.deferUpdate();
    await wait(4000);
    await selectInteraction.editReply({
        content: `The values selected are:\n\n${optionValues}`
    });
}