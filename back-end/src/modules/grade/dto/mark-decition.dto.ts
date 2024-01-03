import { IsArray, IsNotEmpty, IsString, ValidateNested } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';
export class MarkDecisionDto {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  readonly gradeId: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  readonly updatedGrade: number;
}
