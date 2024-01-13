import { IsArray, IsNotEmpty, IsString, ValidateNested } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';
export class CommentDto {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  readonly gradeId: string;

  @ApiProperty({ required: false })
  // @IsNotEmpty()
  readonly content: string;

  currentPath: string;
}
