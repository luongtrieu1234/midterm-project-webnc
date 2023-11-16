"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("mongoose");
const mongoose_2 = require("@nestjs/mongoose");
const bcrypt = require("bcrypt");
const jwt_1 = require("@nestjs/jwt");
const common_2 = require("@nestjs/common");
let UsersService = class UsersService {
    constructor(jwtService, userModel) {
        this.jwtService = jwtService;
        this.userModel = userModel;
    }
    async userSignup(userSignupRequestDto) {
        const currentUser = await this.userModel.findOne({
            where: {
                email: userSignupRequestDto.email,
            },
        });
        if (currentUser) {
            throw new common_2.BadRequestException('Email already signed up');
        }
        const hashedPassword = await bcrypt.hash(userSignupRequestDto.password, 12);
        const user = await this.userModel.create({
            fullname: userSignupRequestDto.fullname,
            email: userSignupRequestDto.email,
            password: hashedPassword,
        });
        delete user.password;
        return user;
    }
    async userLogin(userLoginRequestDto, response) {
        const user = await this.userModel.findOne({
            where: {
                email: userLoginRequestDto.email,
            },
        });
        const u = await this.userModel.findOne({
            email: userLoginRequestDto.email,
        });
        if (!u) {
            throw new common_2.BadRequestException('Email not found');
        }
        if (!(await bcrypt.compare(userLoginRequestDto.password, u.password))) {
            throw new common_2.BadRequestException('invalid credentials');
        }
        const jwt = await this.jwtService.signAsync({ id: u.id });
        response.cookie('jwt', jwt, { httpOnly: true });
        return {
            message: 'success',
            jwt: jwt,
        };
    }
    async userProfile(request) {
        try {
            const [type, token] = request.headers.authorization?.split(' ') ?? [];
            type === 'Bearer' ? token : undefined;
            console.log(`check token ${token}`);
            const data = await this.jwtService.verifyAsync(token);
            if (!data) {
                throw new common_2.UnauthorizedException('Access token error');
            }
            console.log(`check data ${JSON.stringify(data['id'])}`);
            const user = await this.userModel.findOne({
                _id: data['id'],
            });
            console.log(`check user ${JSON.stringify(user)}`);
            const { password, ...result } = user;
            console.log(password);
            return user;
        }
        catch (e) {
            throw new common_2.UnauthorizedException('Access token does not exist');
        }
    }
    async userUpdateProfile(userUpdateProfileRequestDto, response, request) {
        try {
            const [type, token] = request.headers.authorization?.split(' ') ?? [];
            type === 'Bearer' ? token : undefined;
            console.log(`check token ${token}`);
            const data = await this.jwtService.verifyAsync(token);
            if (!data) {
                throw new common_2.UnauthorizedException();
            }
            const user = await this.userModel.findOne({
                _id: data['id'],
            });
            console.log(`check user ${JSON.stringify(user)}`);
            const { password, ...result } = user;
            await user.updateOne({ ...userUpdateProfileRequestDto });
        }
        catch (e) {
            throw new common_2.UnauthorizedException();
        }
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, mongoose_2.InjectModel)('User')),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        mongoose_1.Model])
], UsersService);
//# sourceMappingURL=users.service.js.map