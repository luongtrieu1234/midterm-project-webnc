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
  Response,
  BadRequestException,
} from '@nestjs/common';
import { FileFieldsInterceptor, FileInterceptor } from '@nestjs/platform-express';
import { ApiConsumes, ApiProperty, ApiQuery, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { AuthService } from '~/others/auth/auth.service';
import { AdminService } from './admin.service';
import { AdminLoginRequestDto } from './dto/admin-login-request.dto';
import { Request } from 'express';
import { AuthGuardCustom } from '~/others/auth/auth.guard';
import { UserRole } from '../role/roles.enum';
import { Roles } from '../role/role.decorator';
import { UploadFileDto } from './dto/upload-excel-file.dto';

@Controller('admin')
@ApiTags('admin')
@ApiSecurity('JWT-auth')
export class AdminController {
  constructor(
    private readonly adminService: AdminService,
    private authService: AuthService,
  ) {}

  @Post('login')
  @HttpCode(200)
  async adminLogin(
    @Body() adminLoginRequestDto: AdminLoginRequestDto,
    @Res({ passthrough: true }) response,
  ) {
    return await this.adminService.adminLogin(adminLoginRequestDto, response);
  }

  @Post('inactivate-account/:userId')
  @HttpCode(200)
  @UseGuards(AuthGuardCustom)
  @Roles(UserRole.ADMIN)
  async inactivateAccount(
    @Param('userId') userId: string,
    @Res({ passthrough: true }) response: Response,
  ) {
    return await this.adminService.inactivateAccount(userId);
  }

  @Post('activate-account/:userId')
  @HttpCode(200)
  @UseGuards(AuthGuardCustom)
  @Roles(UserRole.ADMIN)
  async activateAccount(
    @Param('userId') userId: string,
    @Res({ passthrough: true }) response: Response,
  ) {
    return await this.adminService.activateAccount(userId);
  }

  @Post('map-student/:userId/:studentId')
  @HttpCode(200)
  @UseGuards(AuthGuardCustom)
  @Roles(UserRole.ADMIN)
  async mapStudentAccount(
    @Param('userId') userId: string,
    @Param('studentId') studentId: string,
    @Res({ passthrough: true }) response: Response,
  ) {
    return await this.adminService.mapStudentAccount(studentId, userId);
  }

  @Post('unmap-student/:userId')
  @HttpCode(200)
  @UseGuards(AuthGuardCustom)
  @Roles(UserRole.ADMIN)
  async unMapStudentAccount(
    @Param('userId') userId: string,
    @Res({ passthrough: true }) response: Response,
  ) {
    return await this.adminService.unMapStudentAccount(userId);
  }

  @Get('all-classes')
  @ApiQuery({
    name: 'sortType',
    description:
      'sortType dùng cho việc sắp xếp các lớp theo thứ tự tăng dần hoặc giảm dần có giá trị (asc, desc) theo thời gian tạo lớp',
    required: false,
  })
  @ApiQuery({
    name: 'filterOption',
    description:
      'filterOption dùng cho việc lọc các lớp theo các tiêu chí có giá trị (all, active, inactive)',
    required: false,
  })
  @HttpCode(200)
  @UseGuards(AuthGuardCustom)
  @Roles(UserRole.ADMIN)
  async getListClasses(
    @Req() req,
    @Query('filterOption') filterOption: string,
    @Query('sortType') sortType: string,
  ) {
    console.log('req ', req.user);
    return await this.adminService.getListClasses(sortType, filterOption);
  }

  @Get('all-users')
  @HttpCode(200)
  @UseGuards(AuthGuardCustom)
  @Roles(UserRole.ADMIN)
  async getListUsers(
    @Req() req,
    // @Query('filterOption') filterOption: string,
    // @Query('sortType') sortType: string,
  ) {
    console.log('req ', req.user);
    return await this.adminService.getListUsers();
  }

  @Post('inactivate-class/:classId')
  @HttpCode(200)
  @UseGuards(AuthGuardCustom)
  @Roles(UserRole.ADMIN)
  async inactivateClass(
    @Param('classId') classId: string,
    @Res({ passthrough: true }) response: Response,
  ) {
    return await this.adminService.inactivateClass(classId);
  }

  @Post('activate-class/:classId')
  @HttpCode(200)
  @UseGuards(AuthGuardCustom)
  @Roles(UserRole.ADMIN)
  async activateClass(
    @Param('classId') classId: string,
    @Res({ passthrough: true }) response: Response,
  ) {
    return await this.adminService.activateClass(classId);
  }

  @Get('excel-template-list')
  @UseGuards(AuthGuardCustom)
  @Roles(UserRole.ADMIN)
  @Header('Access-Control-Expose-Headers', 'Content-Disposition')
  async downloadTemplateFileList(@Response({ passthrough: true }) response, @Req() req) {
    const buffer = await this.adminService.downloadTemplateFileList(response);
    // response.set('Content-Disposition', `attachment; filename=${className}.xlsx`);
    response.set({
      'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'Content-Disposition': `attachment; filename=template.xlsx`,
    });
    response.send(buffer);
  }

  @ApiConsumes('multipart/form-data')
  @Post('upload-file-list')
  @HttpCode(200)
  @UseInterceptors(FileFieldsInterceptor([{ name: 'excelFile', maxCount: 1 }]))
  // @UseInterceptors(FileFieldsInterceptor([{ name: 'excelFile', maxCount: 1 }], multerOptions))
  async mapStudentAccountFromFile(
    @Body() dto: UploadFileDto,
    @UploadedFiles()
    files: {
      excelFile?: Express.Multer.File[];
    },
  ) {
    return await this.adminService.mapStudentAccountFromFile(
      files?.excelFile?.[0].buffer,
      files?.excelFile?.[0].originalname,
    );

    // { message: files, body: dto };
  }
}
