const {
    ActionRowBuilder,
    SlashCommandBuilder,
    ModalBuilder,
    TextInputBuilder,
    TextInputStyle } = require("discord.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("modal")
		.setDescription("Pops up a modal!"),
	async execute(interaction)
	{
        const modal = new ModalBuilder()
            // This specific modal will be identified by this id
            .setCustomId("modal")
            .setTitle("My Modal");

        const favouriteColourInput = new TextInputBuilder()
            .setCustomId("favouriteColourInput")
            // The prompt that the user sees for this input box
            .setLabel("What's your favourite colour?")
            // .Short creates an input box for a single line of text
            .setStyle(TextInputStyle.Short)
            // Minimum text length
            .setMinLength(1)
            // Maximum text length
            .setMaxLength(100)
            // Placeholder shown in input field
            .setPlaceholder("Favourite colour")
            // Default value if left empty
            .setValue("None")
            // Requires a value in this field
            .setRequired(true);

        const hobbiesInput = new TextInputBuilder()
            .setCustomId("hobbiesInput")
            // The prompt that the user sees for this input box
            .setLabel("What are some of your favourite hobbies?")
            // .Paragraph creates an input box for multiple lines of text
            .setStyle(TextInputStyle.Paragraph)
            // Minimum text length
            .setMinLength(10)
            // Maximum text length
            .setMaxLength(1000);

        // Each ActionRow can only hold a single text input
        const firstActionRow = new ActionRowBuilder()
            .addComponents(favouriteColourInput);

        const secondActionRow = new ActionRowBuilder()
            .addComponents(hobbiesInput);

        // Add our rows to our modal
        modal.addComponents(firstActionRow, secondActionRow);

        // Pop the modal up to the user
        await interaction.showModal(modal);
	},
    componentHandlers:
    {
        modal: onModalSubmitHandler,
        favouriteColourInput: onFavouriteColourHandler,
        hobbiesInput: onHobbiesHandler
    }
};

async function onModalSubmitHandler(modalInteraction)
{
    // Get a collection of the text input fields inside submitted modal
    const inputFields = modalInteraction.fields.fields;

    // Get each field by the customId we defined when creating them above
    const favouriteColourField = inputFields.get("favouriteColourInput");
    const hobbiesField = inputFields.get("hobbiesInput");

    // IMPORTANT - Field values can also be extracted the following way:
    // modalInteraction.fields.getTextInputValue("favouriteColourInput")

    // Trigger each field's behaviour
    if (favouriteColourField != null)
        await onFavouriteColourHandler(favouriteColourField);

    if (hobbiesField != null)
        await onHobbiesHandler(hobbiesField);

    // Ideally should respond to interaction so it doesn't display an error
    // Responding to a modal works just like responding to a command. If
    // the modal was popped up through a ButtonInteraction or a
    // SelectMenuInteraction, then the .update() and .deferUpdate()
    // methods will also be available, to update the text message
}

async function onFavouriteColourHandler(favouriteColourField)
{
    console.log(`Favourite colour is: ${favouriteColourField.value}`);
}

async function onHobbiesHandler(hobbiesField)
{
    console.log(`Hobbies are:\n\n${hobbiesField.value}`);
}