import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { GameGateway } from './game.gateway';

import { Player } from '../models/player.model';
import { GameService } from './game.service';

@Module({
  imports: [SequelizeModule.forFeature([Player])],
  providers: [GameGateway, GameService]
})
export class GameModule {}
