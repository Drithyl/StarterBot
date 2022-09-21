# StarterBot
A simple Discord bot with the basic structure already coded. There are example commands for most functionality, and a config generator.

## How to run

1. Run the index.js file ("node index.js", or "node ."). You will get prompts to generate the first config.json file. It will contain the bot's login token, the client id, and the id of whichever guild you would like to use to test it.
2. Quit the program (you can use Ctrl+C).
3. Open the config.json file created in the config directory.
4. Using the oauth2 link generated in the file, invite the bot to your test guild.
5. Run the deploy-commands-to-guild.js script ("node deploy-comnmands-to-guild.js"). This will deploy the example slash commands to the test guild so they can be used there.
6. Run the index.js file again, as in the first step. Now the bot should be logged in and the slash commands should be visible in the test guild.

## Commands

All new commands should be placed into the commands/files folder. They should all follow the same structure as the already existing command files: exporting an object with this structure:

    {
        // Command creation using discord.js' SlashCommandBuiilder
        data: new SlashCommandBuilder()
            .setName("myCommand")
            .setDescription("This is a command")
            ...,
        async execute(interaction)
        {
            // Your command behaviour here
        }
    };
    
The example commands show most of the functionality possible in Discord v14, including command options, subcommands, option autocomplete, localization, buttons, selects, modals and application context commands (accessed by right-clicking the right target on Discord, then going to Apps>Your bot name).

## Events

All new event handlers should be created as their own file inside the events/files folder, much like the basic login and interactionCreate events.
