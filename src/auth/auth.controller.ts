import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupDto } from './dto/signup.dto';
// import { User } from '../models/signup.entity';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('users')
  @HttpCode(200)
  listAllUsers() {
    return this.authService.getAllUsers();
  }

  @Post('users')
  @UsePipes(ValidationPipe)
  async createUser(@Body() data: SignupDto) {
    return await this.authService.postUser(data);
  }

  @Patch('users/:id')
  @UsePipes(ValidationPipe)
  async editUser(
    @Body() data: SignupDto,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return await this.authService.patchUser(data, id);
  }

  @Delete('users/:id')
  async removeUser(@Param('id', ParseIntPipe) id: number) {
    return await this.authService.deleteUser(id);
  }
}
