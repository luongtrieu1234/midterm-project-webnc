import { IsNotEmpty, IsString } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class MapStudentIdToAccountDto {
  @ApiProperty()
  @IsNotEmpty()
  readonly studentId: string;

  @ApiProperty()
  @IsNotEmpty()
  readonly userId: string;
}
