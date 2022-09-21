const { SlashCommandBuilder } = require("discord.js");

const INPUT_OPTION_NAME = "input";
const BOOL_OPTION_NAME = "bool";
const USER_OPTION_NAME = "user";
const CHANNEL_OPTION_NAME = "destination";
const ROLE_OPTION_NAME = "role";
const INT_OPTION_NAME = "int";
const NUM_OPTION_NAME = "num";
const MENTIONABLE_OPTION_NAME = "mentionable";
const ATTACHMENT_OPTION_NAME = "attachment";

module.exports = {
	data: new SlashCommandBuilder()
		.setName("questionnaire")
		.setDescription("Asks you a series of questions!")
        .addStringOption(option =>
            option.setName(INPUT_OPTION_NAME)
            .setDescription("Your name?")
        )
        .addBooleanOption(option =>
            option.setName(BOOL_OPTION_NAME)
            .setDescription("True or False?")
        )
        .addUserOption(option =>
            option.setName(USER_OPTION_NAME)
            .setDescription("Closest friend?")
        )
        .addChannelOption(option =>
            option.setName(CHANNEL_OPTION_NAME)
            .setDescription("Favourite channel?")
        )
        .addRoleOption(option =>
            option.setName(ROLE_OPTION_NAME)
            .setDescription("Least favourite role?")
        )
        .addIntegerOption(option =>
            option.setName(INT_OPTION_NAME)
            .setDescription("Sides to a square?")
        )
        .addNumberOption(option =>
            option.setName(NUM_OPTION_NAME)
            .setDescription("Value of Pi?")
        )
        .addMentionableOption(option =>
            option.setName(MENTIONABLE_OPTION_NAME)
            .setDescription("Mention something!")
        )
        .addAttachmentOption(option =>
            option.setName(ATTACHMENT_OPTION_NAME)
            .setDescription("Best meme?")
        ),

	execute: async function(interaction)
    {
        const string = interaction.options.getString(INPUT_OPTION_NAME);
        const boolean = interaction.options.getBoolean(BOOL_OPTION_NAME);
        const user = interaction.options.getUser(USER_OPTION_NAME);
        const member = interaction.options.getMember(USER_OPTION_NAME);
        const channel = interaction.options.getChannel(CHANNEL_OPTION_NAME);
        const role = interaction.options.getRole(ROLE_OPTION_NAME);
        const integer = interaction.options.getInteger(INT_OPTION_NAME);
        const number = interaction.options.getNumber(NUM_OPTION_NAME);
        const mentionable = interaction.options.getMentionable(
            MENTIONABLE_OPTION_NAME
        );
        const attachment = interaction.options.getAttachment(
            ATTACHMENT_OPTION_NAME
        );

		console.log({
            string,
            boolean,
            user,
            member,
            channel,
            role,
            integer,
            number,
            mentionable,
            attachment
        });

        await interaction.reply("Your answers were recorded!");
	}
};
