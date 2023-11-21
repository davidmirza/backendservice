import { Injectable } from '@nestjs/common';
import { CreateJoinDto } from './dto/create-join.dto';
import { UpdateJoinDto } from './dto/update-join.dto';
import { JoinRoom } from './schema/join.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/auth/schema/user.schema';

@Injectable()
export class JoinService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(JoinRoom.name) private joinroomModel: Model<JoinRoom>,

  ){  }
  async create(createJoinDto: CreateJoinDto): Promise<{success: boolean, message:string}>  {
    const {email,room} = createJoinDto;
    let success = false;
    let message = '';
    const email_ = await this.userModel.findOne({email});
    console.log(email_.username);
    if(!email_){
      message = "Email did not exist";
      return {success , message}
    }

     const joins_ = await this.joinroomModel.create({
       email,room,displayname:email_.username
     })
     if(!joins_){
      message = "Failed to join room";
      return {success , message}
     }
    success = true;
    message = "Success Join Room";
    return {success , message}
  }

  findAll() {
    return `This action returns all join`;
  }

  async findOne(email: string): Promise<{success: boolean, message:string, dtJoin: JoinRoom}> {
    const dtJoin = await this.joinroomModel.findOne({email});
    let message='';
    let success = true;
    if(!dtJoin){
      message = 'User does not exist';
      success = false;
    }
    return {success, message, dtJoin};
  
  }

  update(id: number, updateJoinDto: UpdateJoinDto) {
    return `This action updates a #${id} join`;
  }

  remove(id: number) {
    return `This action removes a #${id} join`;
  }
}
