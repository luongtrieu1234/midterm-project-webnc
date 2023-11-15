import { Response, Request } from 'express';
import { UsersService } from './users.service';
import { UserSignupRequestDto } from './dto/user-signup-request.dto';
import { UserLoginRequestDto } from './dto/user-login-request.dto';
import { UserUpdateProfileRequestDto } from './dto/user-update-profile-request.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    userSignup(userSignupRequestDto: UserSignupRequestDto): Promise<import("./users.entity").User>;
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
        _attributes: import("./users.entity").User;
        dataValues: import("./users.entity").User;
        _creationAttributes: import("./users.entity").User;
        isNewRecord: boolean;
        sequelize: import("sequelize").Sequelize;
        _model: import("sequelize").Model<import("./users.entity").User, import("./users.entity").User>;
    }>;
    userUpdateProfile(userUpdateProfileRequestDto: UserUpdateProfileRequestDto, response: Response, request: Request): Promise<void>;
    logout(response: Response): Promise<{
        message: string;
    }>;
}
