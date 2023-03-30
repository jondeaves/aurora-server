import { Injectable } from '@nestjs/common';

import { Character } from '../character/character.entity';
import { CharacterService } from '../character/character.service';

@Injectable()
export class GameService {
  constructor(private characterService: CharacterService) {}

  async findOrCreate(username: string): Promise<Character> {
    const result = await this.characterService.findOne(1);

    if (result === null) {
      console.log('Creating new player');
      return await this.characterService.create(username);
    }

    return result;
  }

  async updatePosition(id: number, x: number, y: number): Promise<Character> {
    return await this.characterService.updatePosition(id, x, y);
    // console.log(`Updating ${username} with {x: ${x}, y: ${y}, r: ${r}}`);
  }
}
