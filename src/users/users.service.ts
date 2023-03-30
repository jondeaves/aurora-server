import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private characterRepository: Repository<User>,
  ) {}

  async findOne(username: string): Promise<User | null> {
    return this.characterRepository.findOneBy({ username });
  }
}
