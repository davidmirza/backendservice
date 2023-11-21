import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import {ConfigService } from '@nestjs/config';
import { MongooseModule} from '@nestjs/mongoose'
import { UserSchema } from './schema/user.schema';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports:[
    PassportModule.register({ defaultStrategy: 'jwt'}),
    JwtModule.registerAsync({
      inject:[ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          secret: config.get<string>('JWT_SECRET'),
          signOptions: {
            expiresIn : config.get<string | number>('JWT_EXPIRES'),
        },
      };
    },
    }),
    MongooseModule.forFeature([{name:'User', schema: UserSchema}]),
    
  ],
  exports: [PassportModule]
})
export class AuthModule {

}
