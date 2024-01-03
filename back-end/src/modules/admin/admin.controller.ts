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
import { FileFieldsInterceptor, FileInterceptor } from '@nestjs/platform-express';
import { ApiConsumes, ApiProperty, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { AuthService } from '~/others/auth/auth.service';
import { AdminService } from './admin.service';
import { AdminLoginRequestDto } from './dto/admin-login-request.dto';
import { Response, Request } from 'express';
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
    @Res({ passthrough: true }) response: Response,
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

  // @Get('all-classes')
  // @HttpCode(200)
  // @UseGuards(AuthGuardCustom)
  // @Roles(UserRole.ADMIN)
  // async getListClasses(
  //   @Req() req,
  //   @Query('filterOption') filterOption: string,
  //   @Query('sortType') sortType: string,
  // ) {
  //   console.log('req ', req.user);
  //   return await this.adminService.getListClasses(sortType, filterOption);
  // }

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

  @ApiConsumes('multipart/form-data')
  @Post('upload-file-grade')
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
