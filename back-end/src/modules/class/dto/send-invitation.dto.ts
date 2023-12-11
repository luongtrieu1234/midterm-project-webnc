import { IsArray, IsNotEmpty, IsOptional, IsString, ValidateNested } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class SendInvitationDto {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  readonly classId: string;

  @ApiProperty({ required: true })
  @IsOptional()
  readonly name: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  readonly email: string;
}
