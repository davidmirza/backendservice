import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { ProfileModule } from './profile/profile.module';
// import { MessageGateModule } from './messagegateway/messagegateway.module';
import { JoinModule } from './join/join.module';
import { MessageSchema } from './message/schema/message.schema';

@Module({
  imports: [ConfigModule.forRoot({
    envFilePath: '.env',
    isGlobal: true,
  }),
    MongooseModule.forRoot(process.env.Mongo_Url),
    AuthModule,
    ProfileModule,
    JoinModule,
    MongooseModule.forFeature([
      {name:'Message', schema: MessageSchema}
    
  ])
    
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {} 
