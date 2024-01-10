import { Injectable, NotFoundException } from '@nestjs/common';
import { SignupDto } from './dto/signup.dto';
import { InjectRepository } from '@nestjs/typeorm';
// import { AuthRepository } from './repository/auth.repository';
import { User } from './entity/signup.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private authRepository: Repository<User>,
  ) {}

  async getAllUsers() {
    const userData = await this.authRepository.find();
    return { message: 'Listing all the users', data: userData };
  }

  async postUser(data: SignupDto) {
    return await this.authRepository.save(data);
  }

  async patchUser(data: SignupDto, id: number) {
    const existingData = await User.findOne({ where: { id } });
    if (!existingData) {
      // throw new HttpException('ID not found', HttpStatus.BAD_REQUEST);
      throw new NotFoundException('User Not Found');
    }
    const userData = await this.authRepository.save({
      ...existingData,
      ...data,
    });
    return { message: 'Data Updated Successfully', userData };
  }

  async deleteUser(id: number) {
    const existingData = await User.findOne({ where: { id } });
    if (!existingData) {
      throw new NotFoundException('User Not Found');
    }
    await User.delete(id);
    return 'User deleted Successfully';
  }
}
