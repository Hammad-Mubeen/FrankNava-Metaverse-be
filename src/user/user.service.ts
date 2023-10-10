import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import { CreateUserInput } from './dto/create-user.input';
import { SigninInput } from './dto/signin.input';
import { User } from './schemas/user.schema';
import { AuthService } from '../auth/auth.service';
import { MiddlewareService } from '../middleware/middleware.service';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    private authService: AuthService,
    private middleware: MiddlewareService,
  ) {}

  //permission: client and talent
  async create(createUserInput: CreateUserInput) {
    // check for allowed roles
    this.middleware.allowedRoles(createUserInput.role);

    // check permission
    this.middleware.checkRole(['client', 'talent'], createUserInput.role);

    const emailcheck = await this.userModel.findOne({
      email: createUserInput.email,
    });
    if (emailcheck) {
      throw new BadRequestException({
        statusCode: 400,
        message: 'This user already exists.',
      });
    }

    const hashedPassword = await bcrypt.hash(
      createUserInput.password,
      parseInt(process.env.BCRYPT_SALT_ROUNDS),
    );

    createUserInput.password = hashedPassword;

    if (createUserInput.termsAndCondition == false) {
      throw new BadRequestException({
        statusCode: 403,
        message: 'User have to accept the terms and conditions.',
      });
    }

    const createdUser = new this.userModel({
      email: createUserInput.email,
      password: createUserInput.password,
      firstName: createUserInput.firstName,
      lastName: createUserInput.lastName,
      termsAndCondition: createUserInput.termsAndCondition,
      role: createUserInput.role,
    });

    if (createUserInput.role === 'client') {
      if (createUserInput.country == null) {
        throw new BadRequestException({
          statusCode: 404,
          message: 'country not found in the request body.',
        });
      }
      createdUser.country = createUserInput.country;
    } else {
      if (createUserInput.talentTypes == null) {
        throw new BadRequestException({
          statusCode: 404,
          message: 'talentTypes not found in the request body.',
        });
      }
      if (createUserInput.experience == null) {
        throw new BadRequestException({
          statusCode: 404,
          message: 'experience not found in the request body.',
        });
      }
      createdUser.talentTypes = createUserInput.talentTypes;
      createdUser.experience = createUserInput.experience;
    }

    await this.userModel.create(createdUser);

    return createdUser;
  }

  //permission: client and talent
  async signin(signinInput: SigninInput) {
    const user = await this.userModel.findOne({ email: signinInput.email });
    if (!user) {
      throw new BadRequestException({
        statusCode: 400,
        message: "User don't exist against this email.",
      });
    }

    // check permission
    this.middleware.checkRole(['client', 'talent'], user.role);

    const validPassword = bcrypt.compareSync(
      signinInput.password,
      user.password,
    ); // user password is stored as hashed
    if (!validPassword) {
      throw new BadRequestException({
        statusCode: 403,
        message: 'Incorrect password entered.',
      });
    }

    const JWTToken = this.authService.signJWT(user.id, user.role);
    user.accessToken = JWTToken;
    console.log('access JWT Token :', JWTToken);

    return user;
  }

  //permission: client and talent
  async logout(context) {
    // retrieve payload data
    const ctx = this.authService.getPayloadData(context);

    // check permission
    this.middleware.checkRole(['client', 'talent'], ctx.role);

    const user = await this.userModel.findById(ctx.userId);
    if (!user) {
      throw new BadRequestException({
        statusCode: 400,
        message: "User don't exist against this userId.",
      });
    }
    //expire current token
    return user;
  }
}
