import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Character } from './character.entity';

@Injectable()
export class CharacterService {
  constructor(
    @InjectRepository(Character)
    private characterRepository: Repository<Character>,
  ) {}

  async findAll(): Promise<Character[]> {
    return this.characterRepository.find();
  }

  async findOne(id: number): Promise<Character | null> {
    return this.characterRepository.findOneBy({ id });
  }

  async create(name: string): Promise<Character> {
    const character = new Character();
    character.name = name;

    return await this.characterRepository.save(character);
  }

  async updatePosition(id: number, x: number, y: number): Promise<Character> {
    const matchedCharacter = await this.findOne(id);

    matchedCharacter.x = x;
    matchedCharacter.y = y;

    return this.characterRepository.save(matchedCharacter);
  }
}
