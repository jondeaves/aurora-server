import { Module } from '@nestjs/common';

import { CharacterModule } from '../character/character.module';

import { GameGateway } from './game.gateway';
import { GameService } from './game.service';

@Module({
  imports: [CharacterModule],
  providers: [GameGateway, GameService],
})
export class GameModule {}
