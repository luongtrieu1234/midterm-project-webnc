import { IsNotEmpty, IsString } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class MapStudentDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly studentId: string;
}
