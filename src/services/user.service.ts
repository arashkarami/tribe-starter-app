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

    this.client.on('error', (err) => logger.error("Redis connection failed",err));
    await this.client.connect();
  }

  public async increment() {
    try {
      await this.client.incr(this.USER_COUNT);
      return this.client.get(this.USER_COUNT);
    } catch (error) {
      logger.error(error);
    }
  }
}

export default UserService;
