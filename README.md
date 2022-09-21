# StarterBot
A simple Discord bot with the basic structure already coded. There are example commands for most functionality, and a config generator. It's been made following the [discord.js guides](https://discordjs.guide/#before-you-begin), currently updated to v14.

## How to run

1. Open a console on the repository's folder.
2. Run the command "npm install" to install all the dependencies.
3. Run the index.js file ("node index.js", or "node ."). You will get prompts to generate the first config.json file. It will contain the bot's login token, the client id, and the id of whichever guild you would like to use to test it.
4. Quit the program (you can use Ctrl+C).
5. Open the config.json file created in the config directory.
6. Using the oauth2 link generated in the file, invite the bot to your test guild.
7. Run the deploy-commands-to-guild.js script ("node deploy-comnmands-to-guild.js"). This will deploy the example slash commands to the test guild so they can be used there. Keep in mind you will need to do this whenever you have created or deleted commands.
8. Run the index.js file again, as in the first step. Now the bot should be logged in and the slash commands should be visible in the test guild.

## Commands

All new commands should be placed into the commands/files folder. They should all follow the same structure as the already existing command files: exporting an object with this structure:
```JavaScript
    {
        // Command creation using discord.js' SlashCommandBuiilder
        data: new SlashCommandBuilder()
            .setName("myCommand")
            .setDescription("This is a command")
            ...,
        execute: async function(interaction)
        {
            // Your command behaviour here
        },
        componentHandlers:
        {
            // If your command includes interactible components like
            // a button or a select, you need to add each of their
            // customId as a key here. The value of the key will be
            // the function that will be called when that button or
            // select will be interacted with by the user on Discord
            exampleId: someFunction
        }
    };
```
    
The example commands show most of the functionality possible in Discord v14, including command options, subcommands, option autocomplete, localization, buttons, selects, modals and application context commands (accessed by right-clicking the right target on Discord, then going to Apps>Your bot name).

## Deploying commands globally

Once you are ready to deploy your bot into other guilds, you should first deploy your commands globally, so that they are available anywhere that the bot is present. You can do this by running the deploy-global-commands.js script in the repository's folder. Keep in mind you need to do this whenever you have created or deleted commands.

## Events

All new event handlers should be created as their own file inside the events/files folder, much like the basic login and interactionCreate events.
