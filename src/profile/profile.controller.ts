import { Controller, Get, Post, Body, Patch, Param, Delete, UnauthorizedException } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { Profil } from './schema/profil.schema';
import {IsEmail} from 'class-validator'

@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Post()
  create(@Body() createProfileDto: CreateProfileDto): Promise<{success: boolean, message: string}> {
    return this.profileService.create(createProfileDto);
  }

 
  @Get(':email')
  findOne(@Param('email') email: string): Promise<{success:boolean, message:string, Profile: Profil}> {
  return  this.profileService.findOne(email);
  }

  @Patch(':email')
  update( @Body() updateProfileDto: UpdateProfileDto):Promise<{status:boolean,message:string,OldData:Profil,ChinesseZodiac: string, horoscope:string}> { 
    return this.profileService.update(updateProfileDto);
  }

}
