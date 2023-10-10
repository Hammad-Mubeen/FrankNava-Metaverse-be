import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'user' })
export class User {
  @Field(() => ID)
  id: string;

  @Field()
  email: string;

  @Field()
  password: string;

  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field({ nullable: true })
  country: string;

  @Field()
  termsAndCondition: boolean; // true, false

  @Field({ nullable: true })
  talentTypes: string;

  @Field({ nullable: true })
  experience: string; // yes, no, don't know

  @Field()
  role: string; //client ,talent

  @Field({ nullable: true })
  accessToken: string;
}
