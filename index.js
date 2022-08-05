require('dotenv').config();
require('./slash.js');
const fs = require('fs');
const { Client, GatewayIntentBits, Collection } = require('discord.js');
const client = new Client({
    intents: [ GatewayIntentBits.Guilds ]
});

client.on('ready', () => {
    console.info(`[INFO] ¡Iniciado sesión como ${client.user.tag}!`.green);
});

client.slashcommands = new Collection();
const slashcmd = fs.readdirSync('./slash').filter(file => file.endsWith('.js'));

for (const file of slashcmd) {
    const slash = require(`./slash/${file}`);
    console.info(`[SLASH] SlashCommands - ${file} cargado.`.cyan);
    client.slashcommands.set(slash.data.name, slash);
}

client.on('interactionCreate', async interaction => {
    if (!interaction.isChatInputCommand()) return;

    if (interaction.isCommand()) {
        const slashcmds = client.slashcommands.get(interaction.commandName);
        if (!slashcmds) return;
        try {
            await slashcmds.run(client, interaction);
        } catch (e) {
            console.info(`[ERROR] ${e}`.red);
        }
    }
});

client.login(process.env.TOKEN).then(() => {
    console.info(`[INFO] ${client.user.tag} ha sido autenticado con éxito.`.cyan);
});