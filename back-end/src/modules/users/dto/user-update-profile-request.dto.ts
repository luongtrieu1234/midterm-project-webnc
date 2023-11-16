import {
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class UserUpdateProfileRequestDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsOptional()
  readonly fullname: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsOptional()
  readonly email: string;

  // @ApiProperty()
  // @IsString()
  // @IsNotEmpty()
  // @IsOptional()
  // //   @MinLength(6)
  // //   @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{6,})/, {
  // //     message: 'password too weak',
  // //   })
  // readonly password: string;
}
