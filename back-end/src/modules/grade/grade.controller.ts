import {
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
} from '@nestjs/common';
import { ApiConsumes, ApiProperty, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { Response, Request, Express } from 'express';

import { GradeService } from './grade.service';

import { AuthGuard } from '@nestjs/passport';
import { AuthService } from '../../others/auth/auth.service';
import { SharedService } from 'src/others/auth/shared.service';
import { AuthGuardCustom } from 'src/others/auth/auth.guard';
import { AddGradeCompositionDto } from './dto/add-grade-composition.dto';
import { UpdateGradeCompositionDto } from './dto/update-grade-composition.dto';
import { FileFieldsInterceptor, FileInterceptor } from '@nestjs/platform-express';
import { UploadFileDto } from './dto/upload-excel-file.dto';
import { multerOptions } from 'src/others/multer/multer.config';
import { AddGradeDto } from './dto/add-grade.dto';

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
  // @UseGuards(AuthGuardCustom)
  // @Roles(UserRole.TEACHER)
  @HttpCode(200)
  async showGradeStructure(@Query('classId') classId: string) {
    return await this.gradeService.showGradeStructure(classId);
  }

  @Post('add-grade-composition')
  // @UseGuards(AuthGuardCustom)
  // @Roles(UserRole.TEACHER)
  @HttpCode(200)
  async addGradeComposition(@Body() addGradeCompositionDto: AddGradeCompositionDto) {
    return await this.gradeService.addGradeComposition(addGradeCompositionDto);
  }

  @Patch('update-grade-composition')
  // @UseGuards(AuthGuardCustom)
  // @Roles(UserRole.TEACHER)
  @HttpCode(200)
  async updateGradeComposition(@Body() updateGradeCompositionDto: UpdateGradeCompositionDto) {
    return await this.gradeService.updateGradeComposition(updateGradeCompositionDto);
  }

  @Post('delete-grade-composition')
  // @UseGuards(AuthGuardCustom)
  // @Roles(UserRole.TEACHER)
  @HttpCode(200)
  async removeGradeComposition(@Query('gradeCompositionId') gradeCompositionId: string) {
    return await this.gradeService.removeGradeComposition(gradeCompositionId);
  }

  @Get('excel-template-list')
  @Header('Access-Control-Expose-Headers', 'Content-Disposition')
  async downloadTemplateFileList(
    @Res({ passthrough: true }) response: Response,
    @Query('classID') classId: string,
  ) {
    const { buffer, classCode } = await this.gradeService.downloadTemplateFileList(
      response,
      classId,
    );
    response.set('Content-Disposition', `attachment; filename=${classCode}.xlsx`);
    return response.send(buffer);
  }

  @Get('excel-template-grade')
  @Header('Access-Control-Expose-Headers', 'Content-Disposition')
  async downloadTemplateFileGrade(
    @Res({ passthrough: true }) response: Response,
    @Query('gradeCompositionId') gradeCompositionId: string,
  ) {
    const { buffer, gradeCompositionName } = await this.gradeService.downloadTemplateFileGrade(
      response,
      gradeCompositionId,
    );
    response.set('Content-Disposition', `attachment; filename=${gradeCompositionName}.xlsx`);
    return response.send(buffer);
  }

  @ApiConsumes('multipart/form-data')
  @Post('upload-file-list')
  @HttpCode(200)
  // @UseInterceptors(FileFieldsInterceptor([{ name: 'excelFile', maxCount: 1 }]))
  @UseInterceptors(FileFieldsInterceptor([{ name: 'excelFile', maxCount: 1 }], multerOptions))
  async uploadFileList(
    @Body() dto: UploadFileDto,
    @UploadedFiles()
    files: {
      excelFile?: Express.Multer.File[];
    },
  ) {
    // const data = await this.gradeService.readExcelFileList(
    //   files?.excelFile?.[0].buffer,
    //   files?.excelFile?.[0].originalname,
    // );
    // console.log('Uploaded data:', data);

    return { message: files, body: dto };
  }

  @ApiConsumes('multipart/form-data')
  @Post('upload-file-grade')
  @HttpCode(200)
  @UseInterceptors(FileFieldsInterceptor([{ name: 'excelFile', maxCount: 1 }]))
  // @UseInterceptors(FileFieldsInterceptor([{ name: 'excelFile', maxCount: 1 }], multerOptions))
  async uploadFileGrade(
    @Body() dto: UploadFileDto,
    @UploadedFiles()
    files: {
      excelFile?: Express.Multer.File[];
    },
  ) {
    await this.gradeService.readExcelFileGrade(
      files?.excelFile?.[0].buffer,
      files?.excelFile?.[0].originalname,
    );

    return { message: files, body: dto };
  }

  @Get('read-file')
  async readFile(@Query('classID') classId: string) {
    return await this.gradeService.getClassGrades(classId);
  }

  @Get('class-grades')
  async getClassGrades(@Query('classID') classId: string) {
    return await this.gradeService.getClassGrades(classId);
  }

  @Post('add-grade')
  async addGrade(@Body() dto: AddGradeDto) {
    return await this.gradeService.addGrade(dto);
  }

  @Post('set-final')
  async setFinalGradeComposition(@Query('gradeCompositionId') gradeCompositionId: string) {
    return await this.gradeService.setFinalGradeComposition(gradeCompositionId);
  }
}
