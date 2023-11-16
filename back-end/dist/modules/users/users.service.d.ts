/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose/types/inferschematype" />
import { UserUpdateProfileRequestDto } from './dto/user-update-profile-request.dto';
import { Model } from 'mongoose';
import { UserSignupRequestDto } from './dto/user-signup-request.dto';
import { JwtService } from '@nestjs/jwt';
import { Response, Request } from 'express';
import { UserLoginRequestDto } from './dto/user-login-request.dto';
import { UserModel } from './users.model';
export declare class UsersService {
    private jwtService;
    private readonly userModel;
    constructor(jwtService: JwtService, userModel: Model<UserModel>);
    userSignup(userSignupRequestDto: UserSignupRequestDto): Promise<import("mongoose").Document<unknown, {}, UserModel> & UserModel & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    userLogin(userLoginRequestDto: UserLoginRequestDto, response: Response): Promise<{
        message: string;
        jwt: string;
    }>;
    userProfile(request: Request): Promise<import("mongoose").Document<unknown, {}, UserModel> & UserModel & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    userUpdateProfile(userUpdateProfileRequestDto: UserUpdateProfileRequestDto, response: Response, request: Request): Promise<void>;
}
