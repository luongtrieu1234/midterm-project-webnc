import { IsNotEmpty, IsOptional } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class UploadFileGradeDto {
  //   @IsNotEmpty()
  @ApiProperty({ type: 'string', format: 'binary', required: false })
  readonly excelFile: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  readonly gradeCompositionId: string;

  excelFileUrl: string;
}
