import { IsNotEmpty, IsOptional } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class UploadFileDto {
  //   @IsNotEmpty()
  @ApiProperty({ type: 'string', format: 'binary', required: false })
  readonly excelFile: string;

  @ApiProperty({ required: false })
  //   @IsNotEmpty()
  readonly classId: string;

  excelFileUrl: string;
}
