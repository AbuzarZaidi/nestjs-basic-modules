import {
  Injectable,
  NotFoundException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import * as CryptoJS from 'crypto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/typeorm/entities/user';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}
  async signUp(SignupDto: any) {
    const user = await this.userRepository.findOneBy({
      email: SignupDto.email,
    });
    if (user) {
      throw new HttpException('User already exist!', HttpStatus.OK);
    } else {
      const id = CryptoJS.randomBytes(16).toString('hex');
      const saltOrRounds = 10;
      const hashPassword = await bcrypt.hash(SignupDto.password, saltOrRounds);
      const newUser = this.userRepository.create({
        id: id,
        name: SignupDto.name,
        email: SignupDto.email,
        password: hashPassword,
      });
      const result = await this.userRepository.save(newUser);
      return result.id as string;
    }
  }

  async login(LoginDto: any) {
    const user = await this.userRepository.findOneBy({ email: LoginDto.email });
    if (!user) {
      throw new HttpException('Invalid Credentials!', HttpStatus.OK);
    } else {
      const isMatch = await bcrypt.compare(LoginDto.password, user.password);
      if (!isMatch) {
        throw new HttpException('Invalid Credentials!', HttpStatus.OK);
      }
      const payload = { username: user.email, id: user.id };
      return {
        access_token: this.jwtService.sign(payload),
      };
      // return user as any;
    }
  }
}
