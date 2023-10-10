import { Resolver, Mutation, Query, Args, Context } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/auth.gaurd';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { SigninInput } from './dto/signin.input';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => User)
  async register(@Args('createUserInput') createUserInput: CreateUserInput) {
    return await this.userService.create(createUserInput);
  }

  @Query(() => User)
  async signin(@Args('signinInput') signinInput: SigninInput) {
    return await this.userService.signin(signinInput);
  }

  @UseGuards(AuthGuard)
  @Mutation(() => User)
  async logout(@Context() context) {
    return await this.userService.logout(context);
  }
}
