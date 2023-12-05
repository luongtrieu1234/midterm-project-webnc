import { UserModel } from './../../modules/users/users.model';
import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { AuthService } from './auth.service';
import { Reflector } from '@nestjs/core';
import { UserRole } from 'src/modules/role/roles.enum';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
export const ROLES_KEY = 'roles';

@Injectable()
export class AuthGuardCustom implements CanActivate {
  constructor(
    private jwtService: AuthService,
    private reflector: Reflector,
    @InjectModel('User')
    private readonly userModel: Model<UserModel>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException();
    }
    console.log('can activate 1');
    try {
      const payload = await this.jwtService.verifyToken(token);
      // 💡 We're assigning the payload to the request object here
      // so that we can access it in our route handlers
      request['user'] = payload;
      console.log('can activate 2');
    } catch {
      throw new UnauthorizedException();
    }
    const requiredRoles = this.reflector.getAllAndOverride<UserRole[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {
      return true;
    }
    const { user } = context.switchToHttp().getRequest();
    console.log('check user request ', user);
    const userRequest = await this.userModel.findOne({
      email: user.email,
    });
    console.log('check user  ', userRequest);
    return requiredRoles.some((role) => user.roles?.includes(role));
    // return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
