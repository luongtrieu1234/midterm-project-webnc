import { UserUpdateProfileRequestDto } from './dto/user-update-profile-request.dto';
import { Sequelize } from 'sequelize-typescript';
import { User } from './users.entity';
import { UserSignupRequestDto } from './dto/user-signup-request.dto';
import { JwtService } from '@nestjs/jwt';
import { Response, Request } from 'express';
import { UserLoginRequestDto } from './dto/user-login-request.dto';
export declare class UsersService {
    private readonly userRepository;
    private jwtService;
    private readonly sequelize;
    constructor(userRepository: typeof User, jwtService: JwtService, sequelize: Sequelize);
    userSignup(userSignupRequestDto: UserSignupRequestDto): Promise<User>;
    userLogin(userLoginRequestDto: UserLoginRequestDto, response: Response): Promise<{
        message: string;
        jwt: string;
    }>;
    userProfile(request: Request): Promise<{
        id: string;
        email: string;
        fullname: string;
        gender: string;
        dob: Date;
        phone: string;
        address: string;
        deletedAt: Date;
        createdAt: Date;
        updatedAt: Date;
        version?: any;
        _attributes: User;
        dataValues: User;
        _creationAttributes: User;
        isNewRecord: boolean;
        sequelize: import("sequelize").Sequelize;
        _model: import("sequelize").Model<User, User>;
    }>;
    userUpdateProfile(userUpdateProfileRequestDto: UserUpdateProfileRequestDto, response: Response, request: Request): Promise<void>;
}
