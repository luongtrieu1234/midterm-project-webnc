import { IsArray, IsNotEmpty, IsString, ValidateNested } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class SendInvitationDto {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  readonly name: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  readonly email: string;

}
