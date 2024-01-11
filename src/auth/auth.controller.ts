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
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupDto } from './dto/signup.dto';
import { ApiAcceptedResponse, ApiBadRequestResponse } from '@nestjs/swagger';
// import { User } from '../models/signup.entity';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('users')
  @HttpCode(200)
  async listAllUsers(
    @Query('name') name: string,
    @Query('email') email: string,
    @Query('search') search: string,
  ) {
    return await this.authService.getAllUsers(name, email, search);
  }

  @Get('users/:id')
  async listUser(@Param('id', ParseIntPipe) id: number) {
    return await this.authService.getUser(id);
  }

  @Post('users')
  @UsePipes(ValidationPipe)
  @ApiAcceptedResponse({ description: 'User Created Successfully' })
  @ApiBadRequestResponse({ description: 'User Cannot be Created.Try Again!!' })
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
