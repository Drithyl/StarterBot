begin();

async function begin()
{
    const fs = require("fs");
    const generateConfig = require("./generate-config");

    if (fs.existsSync("./config/config.json") === false)
        await generateConfig();

    initializeClient();
}

function initializeClient()
{
    const discordClient = require("./client/discord-client");
    const client = discordClient.createClient();
    discordClient.login(client);
}