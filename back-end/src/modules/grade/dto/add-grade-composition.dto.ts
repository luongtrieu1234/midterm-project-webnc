import { IsArray, IsNotEmpty, IsString, ValidateNested } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
export class AddGradeCompositionDto {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  readonly classId: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  readonly name: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  readonly gradeScale: number;
}
