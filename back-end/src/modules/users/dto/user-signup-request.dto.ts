import { IsNotEmpty, IsString, Matches, MinLength } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class UserSignupRequestDto {
  @ApiProperty()
  @IsNotEmpty()
  readonly fullname: string;

  @ApiProperty()
  @IsNotEmpty()
  readonly email: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  //   @MinLength(6)
  //   @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{6,})/, {
  //     message: 'password too weak',
  //   })
  readonly password: string;
}
