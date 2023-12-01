import { SetMetadata } from '@nestjs/common';
import { UserRole } from './roles.enum';

export const Roles = (role: UserRole) => SetMetadata('role', role);
