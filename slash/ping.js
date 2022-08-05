const { SlashCommandBuilder } = require('@discordjs/builders');
const Discord = require('discord.js');
const wait = require('node:timers/promises').setTimeout;

module.exports = {
    data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Latencia actual del bot"),

    async run(client, interaction) {
        
        await interaction.deferReply({ ephemeral: true });
        await wait(1500);
        await interaction.editReply({
            content: `\\🏓 Pong! La latencia es de \`${client.ws.ping}ms\`.`
        });

    }
}