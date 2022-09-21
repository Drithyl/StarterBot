module.exports = async function()
{
    const fs = require("fs");
    const readline = require("node:readline");
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    if (fs.existsSync("./config") === false)
        fs.mkdirSync("config");

    // Enhance rl interface with a promisified question function
    rl.promisifiedQuestion = promisifiedQuestion;

    rl.write(
        "No config.json file found. Follow the steps to generate one. " +
        "Once done, remember to run the deploy-commands-to-guild.js " +
        "to deploy all slash commands to your test guild.\n\n"
    );

    const token = await rl.promisifiedQuestion(
        "Paste your bot's token: "
    );

    const clientId = await rl.promisifiedQuestion(
        "Paste your bot's client id: "
    );

    const testGuildId = await rl.promisifiedQuestion(
        "Paste the id of the guild you will use for testing: "
    );

    const config = {
        token,
        clientId,
        testGuildId,
        // The oauth2 link to use to invite the bot to a guild
        oauth2link:
            "https://discord.com/api/oauth2/authorize?client_id=" +
            clientId +
            "&permissions=395405478928&scope=bot%20applications.commands"
    };

    rl.write(
        "\nWriting config file..."
    );

    fs.writeFileSync(
        "./config/config.json",
        JSON.stringify(config, null, 2)
    );

    rl.write(
        "\n\nConfig file written successfully! Logging in...\n\n"
    );

    rl.close();
};

function promisifiedQuestion(questionStr)
{
    return new Promise((resolve) =>
    {
        this.question(questionStr, (answer) =>
        {
            resolve(answer);
        });
    });
}