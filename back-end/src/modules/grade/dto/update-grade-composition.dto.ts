import { IsArray, IsNotEmpty, IsString, ValidateNested } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
export class UpdateGradeCompositionDto {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  readonly gradeStructureId: string;
  
  @ApiProperty({ required: true })
  @IsNotEmpty()
  readonly id: string;

  @ApiProperty({ required: false })
  @IsNotEmpty()
  readonly name: string;

  @ApiProperty({ required: false })
  @IsNotEmpty()
  readonly gradeScale: number;
}
