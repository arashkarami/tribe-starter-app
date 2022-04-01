import { Client, Intents, TextChannel } from 'discord.js';
import { DISCORD_BOT_TOKEN, DISCORD_CHANNEL_ID } from '@config';

class DiscordService {
  private client: Client = null;

  constructor() {
    this.generateClientInstance();
    this.connect();
  }

  private generateClientInstance() {
    if (this.client === null) this.client = new Client({ intents: [Intents.FLAGS.GUILDS] });
  }

  private connect() {
    this.client.on('ready', () => {
      console.log(`Discord_bot has been active!`);
    });

    this.client.login(DISCORD_BOT_TOKEN);
  }

  public async sendMessage(message: string) {
    const channel = await this.client.channels.fetch(DISCORD_CHANNEL_ID);
    (channel as TextChannel).send(message);
  }
}

export default DiscordService;
