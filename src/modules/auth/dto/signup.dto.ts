import { IsEmail, IsNotEmpty } from 'class-validator';

export class SignupDto {
  @IsNotEmpty()
  name: string;
  @IsEmail()
  email: string;
  @IsNotEmpty()
  password: string;
}
