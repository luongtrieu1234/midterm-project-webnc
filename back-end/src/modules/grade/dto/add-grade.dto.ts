import { IsArray, IsNotEmpty, IsString, ValidateNested } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
export class AddGradeDto {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  readonly gradeCompositionId: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  readonly userId: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  readonly value: number;
}
