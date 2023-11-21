import { Injectable } from '@nestjs/common';
import { Message } from './message/schema/message.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class AppService {
  constructor(
    @InjectModel(Message.name) private MsgModel: Model<Message>,
  ){  }
  getHello(): string {
    return 'Hello World!';
  }
  async saveMessage(data: any) {
    const{email,user,content} = data;
    const save = await this.MsgModel.create({
        email,user,content
    });
          
    return "save chat";
  }
  async getAllChat():Promise<{messages: Message[]}>{
    const messages = await this.MsgModel.find();

    return {messages};
  }
}
