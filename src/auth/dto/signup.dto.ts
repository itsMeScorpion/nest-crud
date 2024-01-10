import { IsNotEmpty, Length, IsEmail } from 'class-validator';

export class SignupDto {
  @IsNotEmpty({ message: 'Name is necessary' })
  @Length(2, 255)
  name: string;

  @IsEmail({}, { message: 'Invalid email format' })
  @IsNotEmpty({ message: 'Email is necessary' })
  email: string;

  @IsNotEmpty({ message: 'Password is necessary' })
  @Length(3, 255)
  password: string;
}
