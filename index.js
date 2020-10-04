//index.js Open line developed by Florian Lepage
const discord = require("discord.js"); // load of discord.js
const fs = require("fs"); // load of file system
const client = new discord.Client({partials: ['MESSAGE', 'CHANNEL', 'REACTION']}); // add partials to get older messages
// json imports
const config = JSON.parse(fs.readFileSync("./config/config.json")); // load of the config file
const languages = JSON.parse(fs.readFileSync("./languages/en-US.json"));
// class imports
const {Database} = require("./src/database/Database.js"); // load the database class

//Commands imports
const {Stocks} = require("./src/commands/Stocks.js");

//API Imports
const {Fmp} = require("./src/api/Fmp.js");

// client events
client.on("ready", () => { // event when the bot's ready
    let time = `${new Date(Date.now()).getHours()}:${new Date(Date.now()).getMinutes()}:${new Date(Date.now()).getSeconds()}`; // init time variable
    console.log(`[${time}] The client '${client.user.username}' has been connected.`);
    // new Database(config).tryConnection(); // check connection with the database
});
client.on("message",  (message) => {
    new Stocks(message, client, config, languages).selector();
});
//
client.login(config.client.token); // Discord api login
