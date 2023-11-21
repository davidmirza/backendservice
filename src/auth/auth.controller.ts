import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { UserSignUpDto } from './dto/UserSignUp.dto';
import { ApiResponse, ApiBody } from '@nestjs/swagger';
import { LoginDTO } from './dto/login.dto';
import { IsLoginDTO } from './dto/checkLogin.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  signUp(@Body() userSignUpDto: UserSignUpDto): Promise<{ token: string}>{
    return this.authService.SignUp(userSignUpDto);
  }

  @Post('/signin')
  signIn(@Body() LoginDto: LoginDTO): Promise<{email: string, token: string}> {
    return this.authService.signIn(LoginDto)
  }


  @Get('/token/:token')
  findOne(@Param('token') token: string): Promise<{result:boolean}> {
    return this.authService.checkToken(token);
  }

   
}
