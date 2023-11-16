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
exports.UsersController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const users_service_1 = require("./users.service");
const user_signup_request_dto_1 = require("./dto/user-signup-request.dto");
const user_login_request_dto_1 = require("./dto/user-login-request.dto");
const user_update_profile_request_dto_1 = require("./dto/user-update-profile-request.dto");
let UsersController = class UsersController {
    constructor(usersService) {
        this.usersService = usersService;
    }
    userSignup(userSignupRequestDto) {
        return this.usersService.userSignup(userSignupRequestDto);
    }
    userLogin(userLoginRequestDto, response) {
        return this.usersService.userLogin(userLoginRequestDto, response);
    }
    userProfile(request) {
        return this.usersService.userProfile(request);
    }
    userUpdateProfile(userUpdateProfileRequestDto, response, request) {
        return this.usersService.userUpdateProfile(userUpdateProfileRequestDto, response, request);
    }
    async logout(response) {
        response.clearCookie('jwt');
        return {
            message: 'success',
        };
    }
};
exports.UsersController = UsersController;
__decorate([
    (0, common_1.Post)('signup'),
    (0, common_1.HttpCode)(201),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_signup_request_dto_1.UserSignupRequestDto]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "userSignup", null);
__decorate([
    (0, common_1.Post)('login'),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_login_request_dto_1.UserLoginRequestDto, Object]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "userLogin", null);
__decorate([
    (0, common_1.Get)('me'),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "userProfile", null);
__decorate([
    (0, common_1.Patch)('update'),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_update_profile_request_dto_1.UserUpdateProfileRequestDto, Object, Object]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "userUpdateProfile", null);
__decorate([
    (0, common_1.Post)('logout'),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "logout", null);
exports.UsersController = UsersController = __decorate([
    (0, common_1.Controller)('users'),
    (0, swagger_1.ApiTags)('users'),
    (0, swagger_1.ApiSecurity)('JWT-auth'),
    __metadata("design:paramtypes", [users_service_1.UsersService])
], UsersController);
//# sourceMappingURL=users.controller.js.map