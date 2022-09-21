module.exports.createClient = createClient;
module.exports.login = login;

function createClient()
{
	// Require the necessary discord.js classes
	const { Client, GatewayIntentBits } = require("discord.js");
	const events = require("../events/events-index");
	const commands = require("../commands/commands-index");

	// Create a new client instance
	const client = new Client({
		intents: [GatewayIntentBits.Guilds],
	});

	events.load(client);
	client.commands = commands.read();
	return client;
}

async function login(client)
{
	const { token } = require("../config/config.json");

	// Login to Discord with your client's token
	client.login(token);
}
