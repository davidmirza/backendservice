import { Injectable, UnauthorizedException,Req } from '@nestjs/common';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schema/user.schema';
import { Model } from 'mongoose';
import { UserSignUpDto } from './dto/UserSignUp.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt'
import { LoginDTO } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
    private jwtService: JwtService,
    
  ){  }

  async SignUp(userSignUpDto: UserSignUpDto): Promise<{token: string, email: string}>{
    const { email, username, password } = userSignUpDto;

    const email_ = await this.userModel.findOne({email});
    if(email_){
      throw new UnauthorizedException('Email already exist');
    }

    const HashPasswd = await bcrypt.hash(password,10);
    const user = await this.userModel.create({
      email, username, password: HashPasswd,
    });
      const token = this.jwtService.sign({id: user._id});
    return {token, email};
  }
  
  async signIn(LoginDto: LoginDTO): Promise<{email: string, token: string}>{
    const { email, password } = LoginDto;
    const email_ = await this.userModel.findOne({email});

    if(!email){
      throw new UnauthorizedException('Invalid Email');
    }
    const checkPaswd = await bcrypt.compare(password, email_.password);
    if(!checkPaswd){
      throw new UnauthorizedException('Password did not match');
    }
    const token = this.jwtService.sign({id: email_._id});
     
    return {email, token};
  }

  async checkToken(token: string ):Promise<{result:boolean}>{
    const token_  = token;
    try{
    const result = await this.jwtService.verifyAsync(token_ ,
      {
        secret:process.env.JWT_SECRET
      })
    
    return {result}
    }
    catch(err){
     throw new UnauthorizedException('Invalid Token')
    }
  }
  
}
