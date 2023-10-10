import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop()
  email: string;

  @Prop()
  password: string;

  @Prop()
  firstName: string;

  @Prop()
  lastName: string;

  @Prop()
  country: string;

  @Prop()
  termsAndCondition: boolean; // true, false

  @Prop()
  talentTypes: string;

  @Prop()
  experience: string; // yes, no, don't know

  @Prop()
  role: string; //client ,talent

  @Prop({ default: '' })
  accessToken: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
