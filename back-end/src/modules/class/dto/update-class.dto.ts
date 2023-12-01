import { IsArray, IsNotEmpty, IsOptional, IsString, ValidateNested } from 'class-validator';

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
export class CreateClassDto {
  @ApiProperty()
  @IsNotEmpty()
  readonly name: string;

  @ApiProperty({
    // type: () => StudentDto,
    // isArray: true,
    type: [StudentDto],
    required: false,
  })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => StudentDto)
  students: StudentDto[];

  @ApiProperty({
    type: () => TeacherDto,
    isArray: true,
    required: false,
  })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TeacherDto)
  teachers: TeacherDto[];
}
