import { Module } from '@nestjs/common';
import { JoinService } from './join.service';
import { JoinController } from './join.controller';
import { JoinSchema } from './schema/join.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'src/auth/schema/user.schema';

@Module({
  controllers: [JoinController],
  providers: [JoinService],
  imports: [
    MongooseModule.forFeature([
      {name:'JoinRoom', schema: JoinSchema},
      {name:'User', schema:UserSchema}
  ]),
  ],
})
export class JoinModule {}
