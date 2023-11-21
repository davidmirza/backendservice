import { Prop, Schema,SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { type } from 'os';

export type MessageDocument = Message & Document;
@Schema({
    timestamps:true,
})
export class Message extends Document {
    @Prop({unique: [false]})
    email: string;

    @Prop({unique: [false]})
    user: string;
   
    @Prop({unique: [false]})
    content: string;
    
}
export const MessageSchema = SchemaFactory.createForClass(Message);