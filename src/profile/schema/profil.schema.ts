import { Prop, Schema,SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { type } from 'os';

export type ProfilDocument = Profil & Document;
@Schema({
    timestamps:true,
})
export class Profil extends Document {
    @Prop({unique: [true]})
    email: string;

    @Prop({unique: [false]})
    displayname: string;
   
    @Prop({unique: [false]})
    firstname: string;
    
    @Prop({unique: [false]})
    lastname: string;

    @Prop({unique: [false]})
    gender: string;

    @Prop({unique: [false]})
    birthday: Date;

    @Prop({unique: [false]})
    horoscope: string;

    @Prop({unique: [false]})
    Chinessehoroscope: string;

    @Prop({unique: [false]})
    height: number;

    @Prop({unique: [false]})
    weight: number;
}
export const ProfilSchema = SchemaFactory.createForClass(Profil);