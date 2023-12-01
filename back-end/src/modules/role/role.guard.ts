import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserRole } from './roles.enum';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRole = this.reflector.get('role', context.getHandler());

    if (!requiredRole) {
      return true; // No specific roles required, allow access
    }

    const { user } = context.switchToHttp().getRequest();
    return requiredRole.some((role) => user.roles.includes(role));
  }
}
