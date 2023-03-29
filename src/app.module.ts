import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { Player } from './models/player.model';
import { GameModule } from './game/game.module';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: 'localhost',
      port: 5432,
      database: 'aurora',
      username: 'aurora',
      password: 'aurora',
      models: [Player],
      autoLoadModels: true,
    }),
    GameModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
