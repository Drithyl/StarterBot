const { SlashCommandBuilder, AttachmentBuilder } = require("discord.js");
const Canvas = require("@napi-rs/canvas");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("profile")
		.setDescription("Display your profile."),

	execute: async function(interaction)
	{
        // Create a canvas and get its 2d context object
        const canvas = Canvas.createCanvas(700, 250);
        const context = canvas.getContext("2d");

        // Load image to use as background
        const background = await Canvas.loadImage(
            "./assets/img/wallpaper.jpg"
        );

        // Draw loaded image at top-left corner,
        // and with canvas width and height
        context.drawImage(background, 0, 0, canvas.width, canvas.height);

        // Set stroke colour
        context.strokeStyle = "#0099ff";

        // Draw a rectangle with the dimensions of the canvas, as a border
        context.strokeRect(0, 0, canvas.width, canvas.height);

        // Select the font size and type from
        // one of the natively available fonts
        context.font = applyText(canvas, interaction.member.displayName);

        // Select the style that will be used to fill the text in
        context.fillStyle = "#ffffff";

        // Actually fill the text with a solid color
        context.fillText(
            interaction.member.displayName,
            canvas.width / 2.5,
            canvas.height / 1.8
        );

        // Pick up the pen
        context.beginPath();

        // Start the arc to form a circle
        context.arc(125, 125, 100, 0, Math.PI * 2, true);

        // Put the pen down
        context.closePath();

        // Clip off the region you drew on. More details here:
        // https://www.w3schools.com/tags/canvas_clip.asp
        // Once clip() is used, all future drawing is limited
        // to the clipped region. We could first use the save()
        // method to save the canvas and then use restore() to
        // restore it after the clip().
        context.clip();

        // Load user's profile picture as an image
        const avatar = await Canvas.loadImage(
            interaction.user.displayAvatarURL({ extension: "jpg" })
        );

        // Draw image on the left of canvas, with 200 width and height
        context.drawImage(avatar, 25, 25, 200, 200);

        // Encode canvas into a png image
        const encodedCanvas = await canvas.encode("png");

        // Build a message attachment with the canvas image
        const attachment = new AttachmentBuilder(
            encodedCanvas,
            { name: "profile-image.png" }
        );

        interaction.reply({ files: [ attachment ] });
	}
};

function applyText(canvas, text)
{
    const context = canvas.getContext("2d");

    // Declare a base size of the font
    let fontSize = 70;

    do
    {
        // Assign the font to the context and
        // decrement it so it can be measured again
        context.font = `${fontSize -= 10}px sans-serif`;
    }

    // Compare pixel width of the text to the
    // canvas minus the approximate avatar size
    while (
        context.measureText(text).width > canvas.width - 300
    );

    // Return the result to use in the actual canvas
    return context.font;
}