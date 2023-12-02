import { IsNotEmpty, IsString } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class UserResetPasswordRequestDto {
  @ApiProperty()
  @IsNotEmpty()
  readonly email: string;
}
