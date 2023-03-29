import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { Player } from '../models/player.model';

@Injectable()
export class GameService {
  constructor(
    @InjectModel(Player)
    private userModel: typeof Player,
  ){}

  async findOrCreate(username: string): Promise<Player> {
    const result = await this.userModel.findOne({
      where: {
        username,
      },
    });

    if (result === null) {
      console.log('Creating new player');
      return await this.userModel.create({username,})
    }

    return result;
  }

  async updatePosition(username: string, x: number, y: number, r: number) {
    const player = await this.findOrCreate(username);
    await player.update({x, y, r});
    // console.log(`Updating ${username} with {x: ${x}, y: ${y}, r: ${r}}`);
    // const updatedCount = await this.userModel.update({x, y, r}, {where:{username}});
    // console.log(updatedCount);
  }
}
