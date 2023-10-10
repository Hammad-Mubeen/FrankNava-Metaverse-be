import { InputType, Field } from '@nestjs/graphql';
import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
} from 'class-validator';

@InputType()
export class CreateUserInput {
  @Field()
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  password: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  lastName: string;

  @Field({ nullable: true })
  country: string;

  @Field()
  @IsNotEmpty()
  @IsBoolean()
  termsAndCondition: boolean; // true, false

  @Field({ nullable: true })
  talentTypes: string;

  @Field({ nullable: true })
  experience: string; // yes, no, don't know

  @Field()
  @IsNotEmpty()
  @IsString()
  role: string; //client ,talent
}
