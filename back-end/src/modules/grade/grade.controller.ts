import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Patch,
  Post,
  Query,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ApiConsumes, ApiProperty, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { Response, Request } from 'express';

import { GradeService } from './grade.service';

import { AuthGuard } from '@nestjs/passport';
import { AuthService } from '../../others/auth/auth.service';
import { SharedService } from 'src/others/auth/shared.service';
import { AuthGuardCustom } from 'src/others/auth/auth.guard';
import { AddGradeCompositionDto } from './dto/add-grade-composition.dto';
import { UpdateGradeCompositionDto } from './dto/update-grade-composition.dto';

@Controller('grade')
@ApiTags('grade')
@ApiSecurity('JWT-auth')
export class GradeController {
  constructor(
    private readonly gradeService: GradeService,
    private authService: AuthService,
    private sharedService: SharedService,
  ) {}

  @Get('grade-structure')
  @UseGuards(AuthGuardCustom)
  // @Roles(UserRole.TEACHER)
  @HttpCode(200)
  async showGradeStructure(@Query('classId') classId: string) {
    return await this.gradeService.showGradeStructure(classId);
  }

  @Post('add-grade-composition')
  @UseGuards(AuthGuardCustom)
  // @Roles(UserRole.TEACHER)
  @HttpCode(200)
  async addGradeComposition(
    @Body() addGradeCompositionDto: AddGradeCompositionDto
  ) {
    return await this.gradeService.addGradeComposition(addGradeCompositionDto);
  }

  @Patch('update-grade-composition')
  @UseGuards(AuthGuardCustom)
  // @Roles(UserRole.TEACHER)
  @HttpCode(200)
  async updateGradeComposition(
    @Body() updateGradeCompositionDto: UpdateGradeCompositionDto
  ) {
    return await this.gradeService.updateGradeComposition(updateGradeCompositionDto);
  }

  @Post('delete-grade-composition')
  @UseGuards(AuthGuardCustom)
  // @Roles(UserRole.TEACHER)
  @HttpCode(200)
  async removeGradeComposition(
    @Query('gradeCompositionId') gradeCompositionId: string
    ) {
    return await this.gradeService.removeGradeComposition(gradeCompositionId);
  }
}
