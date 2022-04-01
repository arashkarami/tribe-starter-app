import { Client, Intents, TextChannel } from 'discord.js';
import { REDIS_CONNECTION } from '@config';
import { logger } from '@utils/logger';

class UserService {
  
    constructor() {
        this.genrateClientInstance();
        this.connect();
    }
    
    private genrateClientInstance() {
        //if (this.client === null) this.client = new Client({ intents: [Intents.FLAGS.GUILDS] });
    }
    
    private connect() {
        // this.client.on('ready', () => {
        //   console.log(`Discord_bot has been active!`);
        // });
    
        // this.client.login(REDIS_CONNECTION);
    }

    public async increase(){
        try {
            //++
            return 2;
        } catch (error) {
            logger.error(error);
            throw new error;
        } 
    }
}

export default UserService;