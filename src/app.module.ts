import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { AuthModule } from './auth/auth.module';
import { CharacterModule } from './character/character.module';
import { GameModule } from './game/game.module';
import { UsersModule } from './users/users.module';

import { User } from './users/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      database: 'aurora',
      username: 'aurora',
      password: 'aurora',
      entities: [User],
      synchronize: process.env.NODE_ENV === 'production' ? false : true,
    }),
    AuthModule,
    CharacterModule,
    GameModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
