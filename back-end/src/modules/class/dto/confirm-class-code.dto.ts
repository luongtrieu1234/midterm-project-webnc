import { IsNotEmpty, IsString } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class ConfirmClassCodeDto {
  @ApiProperty()
  @IsNotEmpty()
  readonly classId: string;

  @ApiProperty()
  @IsNotEmpty()
  readonly code: string;
}
