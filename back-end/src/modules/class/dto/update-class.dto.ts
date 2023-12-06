import { IsArray, IsNotEmpty, IsString, ValidateNested } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
class StudentDto {
  @ApiProperty()
  @IsString()
  email: string;
}
class TeacherDto {
  @ApiProperty()
  @IsString()
  email: string;
}
export class UpdateClassDto {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  readonly name: string;

  @ApiProperty({
    type: () => StudentDto,
    isArray: true,
    required: false,
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => StudentDto)
  students: StudentDto[];

  @ApiProperty({
    type: () => TeacherDto,
    isArray: true,
    required: false,
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TeacherDto)
  teachers: TeacherDto[];
}
