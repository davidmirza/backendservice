import { Prop, Schema,SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({
    timestamps:true,
})
export class User extends Document {
    @Prop({unique: [false]})
    username: string;

    @Prop({ unique: [true, 'Email already Exist']})
    email: string;
   
    @Prop()
    password:string;

}
export const UserSchema = SchemaFactory.createForClass(User);