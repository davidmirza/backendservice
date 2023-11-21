import { Prop, Schema,SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { type } from 'os';

export type JoinRoomDocument = JoinRoom & Document;
@Schema({
    timestamps:true,
})
export class JoinRoom extends Document {
    @Prop({unique: [true]})
    email: string;

    @Prop({unique: [false]})
    displayname: string;
   
    @Prop({unique: [false]})
    room: string;
    
}
export const JoinSchema = SchemaFactory.createForClass(JoinRoom);