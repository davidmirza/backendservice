import { Module } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ProfileController } from './profile.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ProfilSchema } from './schema/profil.schema';
import { UserSchema } from 'src/auth/schema/user.schema';

@Module({
  controllers: [ProfileController],
  providers: [ProfileService],
  imports: [
    MongooseModule.forFeature([
      {name:'Profil', schema: ProfilSchema},
      {name:'User', schema:UserSchema}
  ]),
  ],
  exports:[]
})
export class ProfileModule {}
