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
const sequelize_typescript_1 = require("sequelize-typescript");
const common_1 = require("@nestjs/common");
const bcrypt = require("bcrypt");
const jwt_1 = require("@nestjs/jwt");
const common_2 = require("@nestjs/common");
let UsersService = class UsersService {
    constructor(userRepository, jwtService, sequelize) {
        this.userRepository = userRepository;
        this.jwtService = jwtService;
        this.sequelize = sequelize;
    }
    async userSignup(userSignupRequestDto) {
        const hashedPassword = await bcrypt.hash(userSignupRequestDto.password, 12);
        const user = await this.userRepository.create({
            fullname: userSignupRequestDto.fullname,
            email: userSignupRequestDto.email,
            password: hashedPassword,
        });
        delete user.password;
        return user;
    }
    async userLogin(userLoginRequestDto, response) {
        const user = await this.userRepository.findOne({
            where: {
                email: userLoginRequestDto.email,
            },
        });
        if (!user) {
            throw new common_2.BadRequestException('invalid credentials');
        }
        if (!(await bcrypt.compare(userLoginRequestDto.password, user.password))) {
            throw new common_2.BadRequestException('invalid credentials');
        }
        const jwt = await this.jwtService.signAsync({ id: user.id });
        response.cookie('jwt', jwt, { httpOnly: true });
        return {
            message: 'success',
            jwt: jwt,
        };
    }
    async userProfile(request) {
        try {
            const cookie = request.cookies['jwt'];
            console.log(`check cookies ${cookie}`);
            const data = await this.jwtService.verifyAsync(cookie);
            if (!data) {
                throw new common_2.UnauthorizedException();
            }
            const user = await this.userRepository.findOne({
                where: { id: data['id'] },
            });
            console.log(`check user ${JSON.stringify(user)}`);
            const { password, ...result } = user;
            return result;
        }
        catch (e) {
            throw new common_2.UnauthorizedException();
        }
    }
    async userUpdateProfile(userUpdateProfileRequestDto, response, request) {
        const user = await this.userRepository.findOne({
            where: {
                email: userUpdateProfileRequestDto.email,
            },
        });
        if (!user) {
            throw new common_2.BadRequestException('User cannot find');
        }
        try {
            await this.sequelize.transaction(async (t) => {
                const transaction = { transaction: t };
                await user.update({ ...userUpdateProfileRequestDto }, transaction);
                return { success: true };
            });
        }
        catch (err) {
            console.log(err?.message || err?.response.code || err);
            throw new common_2.BadRequestException(err?.message || err?.response.code || err);
        }
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('UserRepository')),
    __param(2, (0, common_1.Inject)('SEQUELIZE')),
    __metadata("design:paramtypes", [Object, jwt_1.JwtService,
        sequelize_typescript_1.Sequelize])
], UsersService);
//# sourceMappingURL=users.service.js.map