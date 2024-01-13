import { IsArray, IsNotEmpty, IsString, ValidateNested } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
export class ReviewRequestDto {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  readonly gradeId: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  readonly explanation: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  readonly expectedGrade: number;

  currentPath: string;
}
