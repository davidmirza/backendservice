import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/auth/schema/user.schema';
import { Model } from 'mongoose';
import { Profil, ProfilDocument } from './schema/profil.schema';

@Injectable()
export class ProfileService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(Profil.name) private profileModel: Model<Profil>,
    
  ){  }
  ChinesseZodiac = [
    'Rat', 'Ox', 'Tiger', 'Rabbit', 'Dragon', 'Snake',
    'Horse', 'Goat', 'Monkey', 'Rooster', 'Dog', 'Pig'
  ];
  async create(createProfileDto: CreateProfileDto): Promise<{success: boolean, message:string}> {
    const {displayname,firstname,lastname,weight,height,email,gender,birthday} = createProfileDto;
    let success = false;
    let message = '';

    const email_ = await this.userModel.findOne({email});
    if(!email_){
      message = "Email did not exist";
      return {success , message}
    }

    const emails = await this.profileModel.findOne({email});
    if(emails){
      message = "Already create Profile,";
      return {success , message}
    }
    const defDate = new Date(birthday);
    const year = defDate.getFullYear();
    const day = defDate.getDate();
    const month = defDate.getMonth() + 1;
    const ChinesseZodiac = this.getCZodiac(year);
    const horoscope = this.getHoroscope(day,month);
    const profil_ = await this.profileModel.create({
      displayname,firstname,lastname,weight,height,email,gender,birthday,horoscope:horoscope,Chinessehoroscope:ChinesseZodiac
    });
    if(!profil_){
      message = "Failed create Profile";
      return {success , message}
    }
    success = true;
    message = "Success create Profile";
    return {success , message}
  }


  async findOne(email: string): Promise<{success: boolean, message:string, Profile: Profil}> {
    const Profile = await this.profileModel.findOne({email});
    let message='';
    let success = true;
    if(!Profile){
      message = 'Email does not exist';
      success = false;
    }
    return {success, message, Profile};
  
  }
  getCZodiac(year:number){
    if (year >= 1900 && year <= 2099) {
      const index = (year - 1900) % 12;
      return this.ChinesseZodiac[index];
    } else {
      return null; 
    }
  }
  getHoroscope(day: number, month: number): string | null {
    if (
      (month === 3 && day >= 21) || (month === 4 && day <= 19)
    ) {
      return 'Aries';
    } else if (
      (month === 4 && day >= 20) || (month === 5 && day <= 20)
    ) {
      return 'Taurus';
    } else if (
      (month === 5 && day >= 21) || (month === 6 && day <= 20)
    ) {
      return 'Gemini';
    } else if (
      (month === 6 && day >= 21) || (month === 7 && day <= 22)
    ) {
      return 'Cancer';
    } else if (
      (month === 7 && day >= 23) || (month === 8 && day <= 22)
    ) {
      return 'Leo';
    } else if (
      (month === 8 && day >= 23) || (month === 9 && day <= 22)
    ) {
      return 'Virgo';
    } else if (
      (month === 9 && day >= 23) || (month === 10 && day <= 22)
    ) {
      return 'Libra';
    } else if (
      (month === 10 && day >= 23) || (month === 11 && day <= 21)
    ) {
      return 'Scorpio';
    } else if (
      (month === 11 && day >= 22) || (month === 12 && day <= 21)
    ) {
      return 'Sagittarius';
    } else if (
      (month === 12 && day >= 22) || (month === 1 && day <= 19)
    ) {
      return 'Capricorn';
    } else if (
      (month === 1 && day >= 20) || (month === 2 && day <= 18)
    ) {
      return 'Aquarius';
    } else if (
      (month === 2 && day >= 19) || (month === 3 && day <= 20)
    ) {
      return 'Pisces';
    } else {
      return null; 
    }
  }
  async update( updateProfileDto: UpdateProfileDto):Promise<{status:boolean,message:string, OldData:Profil,ChinesseZodiac: string, horoscope:string }> {
    const { displayname,firstname,lastname,weight,height,email,gender,birthday} = updateProfileDto;
   
    const defDate = new Date(birthday);
    const year = defDate.getFullYear();
    const day = defDate.getDate();
    const month = defDate.getMonth() + 1;

    const ChinesseZodiac = this.getCZodiac(year);
    const horoscope = this.getHoroscope(day,month);
    console.log(horoscope);
    const CheckMail = await this.profileModel.findOne({email});
    let status = false;
    let message='';
    if(!CheckMail){
      message = 'Failed to update profile';
    }
    const OldData = await this.profileModel.findOneAndUpdate({email}, { displayname,firstname,lastname,weight,height,email,gender,birthday,horoscope:horoscope,Chinessehoroscope:ChinesseZodiac });
    if(!OldData){
      message = 'Failed to update profile, data not exist';
    }else{
      status=true;
      message='Successfully update the data';
    }
      return {status,message, OldData,ChinesseZodiac,horoscope}
     
  }

 
}
