import { IsArray, IsNotEmpty, IsString, ValidateNested } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
export class UpdateGradeCompositionDto {
  // @ApiProperty({ required: true })
  // @IsNotEmpty()
  // readonly classId: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  readonly gradeCompositionId: string;

  @ApiProperty({ required: false })
  @IsNotEmpty()
  readonly name: string;

  @ApiProperty({ required: false })
  @IsNotEmpty()
  readonly gradeScale: number;

  @ApiProperty({ required: false })
  readonly content: string;

  @ApiProperty({ required: false })
  readonly position: number;
}
