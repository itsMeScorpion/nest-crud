import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { SignupDto } from './dto/signup.dto';
import { InjectRepository } from '@nestjs/typeorm';
// import { AuthRepository } from './repository/auth.repository';
import { User } from './entity/signup.entity';
import { ILike, Like, Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private authRepository: Repository<User>,
  ) {}

  async getAllUsers(name: string, email: string, search: string) {
    let where: { [key: string]: any } = {};
    if (name) {
      where.name = ILike(name);
    }
    if (email) {
      where.email = { ...where, email };
    }
    if (search) {
      where = {
        ...where,
        name: ILike(`%${search}%`),
        email: Like(`%${search}%`),
      };
    }
    const userData = await this.authRepository.find({ where });
    return { message: 'Listing all the users', data: userData };
  }

  async getUser(id: number) {
    const user = await this.authRepository.findOne({ where: { id } });
    if (!user)
      throw new HttpException('User Not Found', HttpStatus.BAD_REQUEST);
    return { message: 'User Fetched Successfully', data: user };
  }

  async postUser(data: SignupDto) {
    const existingData = await this.authRepository.findOne({
      where: { email: data.email },
    });
    if (existingData) {
      throw new HttpException('User Already Present', HttpStatus.BAD_REQUEST);
    }
    return await this.authRepository.save(data);
  }

  async patchUser(data: SignupDto, id: number) {
    const existingData = await this.authRepository.findOne({ where: { id } });
    if (!existingData) {
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
