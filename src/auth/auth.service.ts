import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../models/signup.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly authReposotory: Repository<User>,
  ) {}
  async findAll(): Promise<User[]> {
    return await this.authReposotory.find();
  }
}
