
const { Signale } = require('signale');
const logger = new Signale({ scope: 'Pool' }); 

module.exports = {
	name: "interactionCreate",

	async execute(interaction) {

        const { client } = interaction;
		if (!interaction.isChatInputCommand()) return;
		
        const command = client.slashCommands.get(interaction.commandName);
		if (!command) return;

		try {
			await command.execute(interaction);
		} catch (err) {
			logger.error(err);
			interaction.reply({
				content: "Ooops. Ocorreu um erro:", ephemeral: true,
			});
		}
	},
};