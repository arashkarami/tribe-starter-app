import { createClient } from 'redis';
import { REDIS_CONNECTION } from '@config';
import { logger } from '@utils/logger';

class UserService {
  private client: any;
  private USER_COUNT = 'total';
  constructor() {
    (async () => {
      await this.generateInstance();
    })();
  }

  private async generateInstance() {
    this.client = createClient({ url: REDIS_CONNECTION });

    // this.client.on('error', (err) => console.log('Redis Client Error', err));
    // await this.client.connect();
  }

  public async increment() {
    try {
      return 1005;
      //    await this.client.icnr(this.USER_COUNT);
      //    return this.client.get(this.USER_COUNT);
    } catch (error) {
      logger.error(error);
      throw new error();
    }
  }
}

export default UserService;
