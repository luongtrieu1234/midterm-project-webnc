import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Header,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  Req,
  Res,
  UploadedFile,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
  Response,
} from '@nestjs/common';
import { ApiConsumes, ApiProperty, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { Request, Express } from 'express';

import { GradeService } from './grade.service';

import { AuthGuard } from '@nestjs/passport';
import { AuthService } from '../../others/auth/auth.service';
import { SharedService } from 'src/others/auth/shared.service';
import { AuthGuardCustom } from 'src/others/auth/auth.guard';
import { AddGradeCompositionDto } from './dto/add-grade-composition.dto';
import { UpdateGradeCompositionDto } from './dto/update-grade-composition.dto';
import { FileFieldsInterceptor, FileInterceptor } from '@nestjs/platform-express';
import { UploadFileDto } from './dto/upload-excel-file.dto';
import { UploadFileGradeDto } from './dto/upload-excel-file-grade.dto';
import { multerOptions } from 'src/others/multer/multer.config';
import { AddGradeDto } from './dto/add-grade.dto';
import { ReviewRequestDto } from './dto/review-request.dto';
import { CommentDto } from './dto/comment.dto';
import { MarkDecisionDto } from './dto/mark-decition.dto';
import { ClassService } from '../class/class.service';
import { UsersService } from '../users/users.service';
import { MapStudentIdToAccountDto } from './dto/map-student-account.dto';

@Controller('grade')
@ApiTags('grade')
@ApiSecurity('JWT-auth')
export class GradeController {
  constructor(
    private readonly gradeService: GradeService,
    private readonly classService: ClassService,
    private readonly usersService: UsersService,
    private authService: AuthService,
    private sharedService: SharedService,
  ) {}

  @Get('grade-structure')
  @UseGuards(AuthGuardCustom)
  // @Roles(UserRole.TEACHER)
  @HttpCode(200)
  async showGradeStructure(@Query('classId') classId: string, @Req() req) {
    return await this.gradeService.showGradeStructure(classId);
  }

  @Post('add-grade-composition')
  @UseGuards(AuthGuardCustom)
  // @Roles(UserRole.TEACHER)
  @HttpCode(200)
  async addGradeComposition(@Body() addGradeCompositionDto: AddGradeCompositionDto, @Req() req) {
    const userRole = await this.classService.getUserRoleInClass(
      addGradeCompositionDto.classId,
      req.user.id,
    );
    if (!userRole) throw new BadRequestException('You are not in this class');
    console.log('userRole ', userRole);
    console.log('req.user ', req.user);
    if (userRole.role !== 'teacher')
      throw new BadRequestException('You are not a teacher of this class');
    return await this.gradeService.addGradeComposition(addGradeCompositionDto);
  }

  @Patch('update-grade-composition')
  @UseGuards(AuthGuardCustom)
  // @Roles(UserRole.TEACHER)
  @HttpCode(200)
  async updateGradeComposition(
    @Body() updateGradeCompositionDto: UpdateGradeCompositionDto,
    @Req() req,
  ) {
    const gradeCompositionDocument = await this.gradeService.getGradeCompositionDetail(
      updateGradeCompositionDto.gradeCompositionId,
    );
    const userRole = await this.classService.getUserRoleInClass(
      gradeCompositionDocument.result.class,
      req.user.id,
    );
    if (!userRole) throw new BadRequestException('You are not in this class');
    if (userRole.role !== 'teacher')
      throw new BadRequestException('You are not a teacher of this class');
    return await this.gradeService.updateGradeComposition(updateGradeCompositionDto);
  }

  @Post('delete-grade-composition')
  @UseGuards(AuthGuardCustom)
  // @Roles(UserRole.TEACHER)
  @HttpCode(200)
  async removeGradeComposition(
    @Query('gradeCompositionId') gradeCompositionId: string,
    @Req() req,
  ) {
    const gradeDocument = await this.gradeService.getGradeCompositionDetail(gradeCompositionId);
    const userRole = await this.classService.getUserRoleInClass(
      gradeDocument.result.class,
      req.user.id,
    );
    if (!userRole) throw new BadRequestException('You are not in this class');
    if (userRole.role !== 'teacher')
      throw new BadRequestException('You are not a teacher of this class');
    return await this.gradeService.removeGradeComposition(gradeCompositionId);
  }

  @Get('grade-composition-detail')
  @UseGuards(AuthGuardCustom)
  @HttpCode(200)
  async getGradeCompositionDetail(
    @Req() req,
    @Query('gradeCompositionId') gradeCompositionId: string,
  ) {
    return await this.gradeService.getGradeCompositionDetail(gradeCompositionId);
  }

  @Get('excel-template-list')
  @UseGuards(AuthGuardCustom)
  @Header('Access-Control-Expose-Headers', 'Content-Disposition')
  async downloadTemplateFileList(
    @Response({ passthrough: true }) response,
    @Query('classId') classId: string,
    @Req() req,
  ) {
    const userRole = await this.classService.getUserRoleInClass(classId, req.user.id);
    if (!userRole) throw new BadRequestException('You are not in this class');
    if (userRole.role !== 'teacher')
      throw new BadRequestException('You are not a teacher of this class');
    const { buffer, className } = await this.gradeService.downloadTemplateFileList(
      response,
      classId,
    );
    // response.set('Content-Disposition', `attachment; filename=${className}.xlsx`);
    response.set({
      'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'Content-Disposition': `attachment; filename=${className}.xlsx`,
    });
    response.send(buffer);
  }

  @Get('excel-template-grade')
  @UseGuards(AuthGuardCustom)
  @Header('Access-Control-Expose-Headers', 'Content-Disposition')
  async downloadTemplateFileGrade(
    @Response({ passthrough: true }) response,
    @Query('gradeCompositionId') gradeCompositionId: string,
    @Req() req,
  ) {
    const gradeCompositionDocument =
      await this.gradeService.getGradeCompositionDetail(gradeCompositionId);
    console.log('gradeCompositionDocument ', gradeCompositionDocument);
    const userRole = await this.classService.getUserRoleInClass(
      gradeCompositionDocument.result.class,
      req.user.id,
    );
    // if (!userRole) throw new BadRequestException('You are not in this class');
    // if (userRole.role !== 'teacher')
    //   throw new BadRequestException('You are not a teacher of this class');
    const { buffer, gradeCompositionName } = await this.gradeService.downloadTemplateFileGrade(
      response,
      gradeCompositionId,
    );
    // response.set('Content-Disposition', `attachment; filename=${gradeCompositionName}.xlsx`);
    response.set({
      'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'Content-Disposition': `attachment; filename=${gradeCompositionName}.xlsx`,
    });
    response.send(buffer);
  }

  @Get('export-file-grade')
  @UseGuards(AuthGuardCustom)
  @Header('Access-Control-Expose-Headers', 'Content-Disposition')
  async exportFileGrade(
    @Response({ passthrough: true }) response,
    @Query('classId') classId: string,
    @Req() req,
  ) {
    const userRole = await this.classService.getUserRoleInClass(classId, req.user.id);
    if (!userRole) throw new BadRequestException('You are not in this class');
    if (userRole.role !== 'teacher')
      throw new BadRequestException('You are not a teacher of this class');
    const { buffer, className } = await this.gradeService.exportFileGrade(response, classId);
    // response.set('Content-Disposition', `attachment; filename=${className}.xlsx`);
    response.set({
      'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'Content-Disposition': `attachment; filename=${className}.xlsx`,
    });
    response.send(buffer);
  }

  @ApiConsumes('multipart/form-data')
  @Post('upload-file-list')
  @UseGuards(AuthGuardCustom)
  @HttpCode(200)
  @UseInterceptors(FileFieldsInterceptor([{ name: 'excelFile', maxCount: 1 }]))
  // @UseInterceptors(FileFieldsInterceptor([{ name: 'excelFile', maxCount: 1 }], multerOptions))
  async uploadFileList(
    @Body() dto: UploadFileDto,
    @UploadedFiles()
    files: {
      excelFile?: Express.Multer.File[];
    },
    @Req() req,
  ) {
    return await this.gradeService.readExcelFileList(
      files?.excelFile?.[0].buffer,
      files?.excelFile?.[0].originalname,
    );

    // { message: files, body: dto };
  }

  @ApiConsumes('multipart/form-data')
  @Post('upload-file-grade')
  @UseGuards(AuthGuardCustom)
  @HttpCode(200)
  @UseInterceptors(FileFieldsInterceptor([{ name: 'excelFile', maxCount: 1 }]))
  // @UseInterceptors(FileFieldsInterceptor([{ name: 'excelFile', maxCount: 1 }], multerOptions))
  async uploadFileGrade(
    @Body() dto: UploadFileGradeDto,
    @UploadedFiles()
    files: {
      excelFile?: Express.Multer.File[];
    },
    @Req() req,
  ) {
    return await this.gradeService.readExcelFileGrade(
      files?.excelFile?.[0].buffer,
      files?.excelFile?.[0].originalname,
      dto.gradeCompositionId,
    );

    // { message: files, body: dto };
  }

  // @Get('read-file')
  // async readFile(@Query('classId') classId: string) {
  //   return await this.gradeService.getClassGrades(classId);
  // }

  @Get('class-grades')
  @UseGuards(AuthGuardCustom)
  async getClassGrades(@Query('classId') classId: string, @Req() req) {
    const userRole = await this.classService.getUserRoleInClass(classId, req.user.id);
    // if (!userRole) throw new BadRequestException('You are not in this class');
    // if (userRole.role !== 'teacher')
    //   throw new BadRequestException('You are not a teacher of this class');
    return await this.gradeService.getClassGrades(classId);
  }

  @Post('add-grade')
  @UseGuards(AuthGuardCustom)
  async addGrade(@Body() dto: AddGradeDto, @Req() req) {
    const gradeDocument = await this.gradeService.getGradeCompositionDetail(dto.gradeCompositionId);
    const userRole = await this.classService.getUserRoleInClass(
      gradeDocument.result.class,
      req.user.id,
    );
    if (!userRole) throw new BadRequestException('You are not in this class');
    if (userRole.role !== 'teacher')
      throw new BadRequestException('You are not a teacher of this class');
    return await this.gradeService.addGrade(dto);
  }

  @Post('update-grade')
  @UseGuards(AuthGuardCustom)
  async updateGrade(@Body() dto: AddGradeDto, @Req() req) {
    const gradeDocument = await this.gradeService.getGradeCompositionDetail(dto.gradeCompositionId);
    const userRole = await this.classService.getUserRoleInClass(
      gradeDocument.result.class,
      req.user.id,
    );
    if (!userRole) throw new BadRequestException('You are not in this class');
    if (userRole.role !== 'teacher')
      throw new BadRequestException('You are not a teacher of this class');
    return await this.gradeService.updateGrade(dto);
  }

  @Post('mark-grade-composition-final')
  @UseGuards(AuthGuardCustom)
  async markFinalGradeComposition(
    @Query('gradeCompositionId') gradeCompositionId: string,
    @Req() req,
  ) {
    const gradeDocument = await this.gradeService.getGradeCompositionDetail(gradeCompositionId);
    const userRole = await this.classService.getUserRoleInClass(
      gradeDocument.result.class,
      req.user.id,
    );
    if (!userRole) throw new BadRequestException('You are not in this class');
    console.log('gradeDocument ', gradeDocument);
    console.log('userRole ', userRole);
    console.log('req.user ', req.user);
    if (userRole.role !== 'teacher')
      throw new BadRequestException('You are not a teacher of this class');
    return await this.gradeService.markFinalGradeComposition(gradeCompositionId);
  }

  @Get('grade-of-student')
  @UseGuards(AuthGuardCustom)
  @HttpCode(200)
  async getGradesOfStudent(
    @Req() req,
    @Query('classId') classId: string,
    @Query('userId') userId: string,
  ) {
    return await this.gradeService.getGradesOfStudent(classId, userId);
  }

  @Post('review-request')
  @UseGuards(AuthGuardCustom)
  @HttpCode(200)
  async requestReviewGrade(@Body() reviewRequestDto: ReviewRequestDto, @Req() req) {
    return await this.gradeService.requestReviewGrade(reviewRequestDto);
  }

  @Get('list-review-request')
  @UseGuards(AuthGuardCustom)
  @HttpCode(200)
  async getListGradeReviewRequests(@Req() req, @Query('classId') classId: string) {
    const userRole = await this.classService.getUserRoleInClass(classId, req.user.id);
    if (!userRole) throw new BadRequestException('You are not in this class');
    if (userRole.role !== 'teacher')
      throw new BadRequestException('You are not a teacher of this class');
    return await this.gradeService.getListGradeReviewRequests(classId);
  }

  @Get('review-request-detail')
  @UseGuards(AuthGuardCustom)
  @HttpCode(200)
  async getGradeReviewRequestDetail(
    @Req() req,
    @Query('classId') classId: string,
    @Query('gradeId') gradeId: string,
  ) {
    return await this.gradeService.getGradeReviewRequestDetail(classId, gradeId);
  }

  @Get('grade-detail-by-id')
  @UseGuards(AuthGuardCustom)
  @HttpCode(200)
  async getGradeDetailByGradeId(@Req() req, @Query('gradeId') gradeId: string) {
    return await this.gradeService.getGradeDetailByGradeId(gradeId);
  }

  @Post('comment')
  @UseGuards(AuthGuardCustom)
  @HttpCode(200)
  async commentReview(@Body() commentDto: CommentDto, @Req() req) {
    return await this.gradeService.commentReview(commentDto, req.user.id);
  }

  @Post('mark-decision')
  @UseGuards(AuthGuardCustom)
  async markFinalDecisionGrade(@Body() markDecisionDto: MarkDecisionDto, @Req() req) {
    const user = await this.usersService.findUserByEmail(req.user.email);
    const gradeDocument = await this.gradeService.getGradeDetailByGradeId(markDecisionDto.gradeId);
    const userRole = await this.classService.getUserRoleInClass(
      gradeDocument.result.class,
      user.id,
    );
    if (!userRole) throw new BadRequestException('You are not in this class');
    if (userRole.role !== 'teacher')
      throw new BadRequestException('You are not a teacher of this class');
    return await this.gradeService.markFinalDecisionGrade(markDecisionDto);
  }

  @Post('map-student')
  @HttpCode(200)
  @UseGuards(AuthGuardCustom)
  async mapStudentIdToAccount(@Body() dto: MapStudentIdToAccountDto, @Req() req) {
    return await this.usersService.mapStudentIdToAccount(dto.studentId, dto.userId);
  }
}
