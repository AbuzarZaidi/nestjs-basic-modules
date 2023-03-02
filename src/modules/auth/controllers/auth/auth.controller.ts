import {
    Controller,
    Post,
    Body,
    Get,
    Param,
    HttpException,
    HttpCode,
    HttpStatus,
  } from '@nestjs/common';
  import { UsePipes } from '@nestjs/common/decorators';
import { ValidationPipe } from '@nestjs/common/pipes';
import { AuthService } from '../../services/auth/auth.service';
import { SignupDto } from '../../dto/signup.dto';
import { LoginDto } from '../../dto/login.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {    }
    @Post('/signup')
    @UsePipes(ValidationPipe)
    async signUp(@Body() SignupDto: SignupDto) {
        const generatedId = await this.authService.signUp(SignupDto);
        return {
          id: generatedId,
          message: 'User Created Successfully!',
          StatusCode: HttpStatus.OK,
        };
      }
      @Post('/login')
      @UsePipes(ValidationPipe)
      async signIn(
        @Body() LoginDto: LoginDto
      ) {
         
          const result = await this.authService.login(
            LoginDto
          );
          return { data: result,message:"Login Successfully",StatusCode: HttpStatus.OK, };
        
      }
}
