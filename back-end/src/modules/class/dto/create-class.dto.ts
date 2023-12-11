import { IsArray, IsNotEmpty, IsString, ValidateNested } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
export class CreateClassDto {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  readonly name: string;
}
