require('dotenv').config();
const fs = require('fs');
const { REST } = require("@discordjs/rest");
const { Routes } = require('discord.js');
require('colors');

const comandos = [];
const slashFiles = fs.readdirSync('./slash').filter(f => f.endsWith('.js'));

for (const file of slashFiles) {
    const slash = require(`./slash/${file}`);
    comandos.push(slash.data.toJSON());
}

const rest = new REST({
    version: '10'
}).setToken(process.env.TOKEN);

createSlash();

async function createSlash() {
    try {
        console.info(`[SLASH] Comenzó a actualizar los comandos de la aplicación (/).`.cyan);
        await rest.put(Routes.applicationCommands("823241881089605652"), {
            body: comandos
        });
        console.info(`[SLASH] Comandos de aplicación (/) recargados con éxito.`.green);
    } catch (e) {
        console.info(`[SLASH] ${e}`.red);
    }
}