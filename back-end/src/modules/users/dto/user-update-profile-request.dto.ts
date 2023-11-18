import {
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class UserUpdateProfileRequestDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsOptional()
  readonly fullname: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsOptional()
  readonly gender: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsOptional()
  readonly dob: Date;

  @ApiProperty()
  @IsNotEmpty()
  @IsOptional()
  readonly phone: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsOptional()
  readonly address: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsOptional()
  readonly job: string;

  @ApiProperty({ type: [String], isArray: true })
  @IsNotEmpty()
  @IsOptional()
  readonly hobby: string[];

  // constructor(dto?: Partial<UserUpdateProfileRequestDto>) {
  //   if (dto) {
  //     this.fullname = dto.fullname || '';
  //     this.gender = dto.gender || '';
  //     this.dob = dto.dob || null; // Set a default date as needed
  //     this.phone = dto.phone || '';
  //     this.address = dto.address || '';
  //     this.job = dto.job || '';
  //     this.hobby = dto.hobby || [];
  //   }
  // }
}
