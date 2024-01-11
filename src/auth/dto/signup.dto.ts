import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Length, IsEmail } from 'class-validator';

export class SignupDto {
  @ApiProperty({
    example: 'name',
    description: 'The name of the User',
  })
  @IsNotEmpty({ message: 'Name is necessary' })
  @Length(2, 255)
  name: string;

  @ApiProperty({
    example: 'example@123.com',
    description: 'The email of the User',
  })
  @IsEmail({}, { message: 'Invalid email format' })
  @IsNotEmpty({ message: 'Email is necessary' })
  email: string;

  @ApiProperty({
    example: 'password',
    description: 'The password of the User',
  })
  @IsNotEmpty({ message: 'Password is necessary' })
  @Length(3, 255)
  password: string;
}
