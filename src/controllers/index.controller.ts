import { NextFunction, Request, Response } from 'express';
import ClientService from '@services/client.service';
import DiscordService from '@services/discord.service';

class IndexController {
  private clientService = new ClientService();
  private discordService = new DiscordService();

  public index = async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (req.body?.data?.challenge) {
        res.json({
          type: 'TEST',
          status: 'SUCCEEDED',
          data: {
            challenge: req.body?.data?.challenge,
          },
        });
      } else {
        const memberInfo = await this.clientService.getMemberByID(req.body.data.object.ownerId);

        //TODO why url removed from memberInfo.
        if (memberInfo != null) {
          await this.discordService.sendMessage(
            `:wave: ${memberInfo.name} from ${memberInfo.sessions[0].country} joint to community now. You can see in below link https://arash.tribeplatform.com/member/${memberInfo.id}`,
          );
        }
        res.json(memberInfo);
      }
    } catch (error) {
      next(error);
    }
  };
}

export default IndexController;
