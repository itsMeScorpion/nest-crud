// auth.controller.ts
import { Controller, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from '../models/signup.entity';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('users')
  async findAllUsers(): Promise<User[]> {
    return this.authService.findAll();
  }
}
