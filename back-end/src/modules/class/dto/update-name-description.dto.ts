import { IsArray, IsNotEmpty, IsString, ValidateNested } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
export class UpdateInformationClassDto {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  readonly classId: string;

  @ApiProperty({ required: false })
  readonly name: string;

  @ApiProperty({ required: false })
  readonly description: string;
}
