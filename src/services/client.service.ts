import { TribeClient } from '@tribeplatform/gql-client';
import { logger } from '@utils/logger';
import { HttpException } from '@exceptions/HttpException';
import DiscordService from '@services/discord.service';
import UserService from '@services/user.service';
import { CLIENT_ID, CLIENT_SECRET, NETWORK_ID, MEMBER_ID } from '@config';

class ClientService {
  private tribeClient: TribeClient = null;
  private accessToken = null;
  private discordService = new DiscordService();
  private userService = new UserService();

  constructor() {
    this.initTribeClient();
  }

  private async initTribeClient() {
    this.genrateTribeClientInstance();
    await this.setAccessToken();
  }

  private genrateTribeClientInstance() {
    if (this.tribeClient === null) {
      this.tribeClient = new TribeClient({
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        graphqlUrl: 'https://app.tribe.so/graphql',
      });
    }
  }

  private async setAccessToken() {
    try {
      this.accessToken = await this.tribeClient.generateToken({
        networkId: NETWORK_ID,
        memberId: MEMBER_ID,
      });

    } catch (error) {
      logger.error(error);
      throw new HttpException(500, 'Can not generate Tribe Access token');
    }
  }

  public async getMemberByID(id) {
    try {
      //TODO get custom fields not all!
      const userInfo = await this.tribeClient.members.get(id, 'all', this.accessToken);

      //TODO why 'url' removed from userInfo.
      if (userInfo != null) {
        const totalUserCount = await this.userService.increment();

        await this.discordService.sendMessage(
          `:wave: ${userInfo.name} from ${userInfo.sessions[0].country} joint to community now. \r\n\n :muscle:** Total user count is ${totalUserCount} **.\r\n\n You can see in below link https://arash.tribeplatform.com/member/${userInfo.id}\n`,
        );
      }

      return userInfo;
    } catch (error) {
      logger.error(error);
      throw new HttpException(500, 'Can not get user info');
    }
  }
}

export default ClientService;
