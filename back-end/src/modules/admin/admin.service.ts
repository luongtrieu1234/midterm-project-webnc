import { BadRequestException, Injectable } from '@nestjs/common';
import { AdminLoginRequestDto } from './dto/admin-login-request.dto';
import * as bcrypt from 'bcrypt';
import { Response, Request } from 'express';
import { InjectModel } from '@nestjs/mongoose';
import { Model, SortOrder } from 'mongoose';
import { UserModel } from '../users/users.model';
import { ClassModel } from '../class/class.model';
import { AuthService } from '~/others/auth/auth.service';
import { ClassService } from '../class/class.service';
import * as ExcelJS from 'exceljs';
@Injectable()
export class AdminService {
  constructor(
    @InjectModel('User')
    private readonly userModel: Model<UserModel>,
    @InjectModel('Class')
    private readonly classModel: Model<ClassModel>,
    private authService: AuthService,
    private classService: ClassService,
  ) {}

  async adminLogin(userLoginRequestDto: AdminLoginRequestDto, response: Response) {
    const user = await this.userModel.findOne({
      email: userLoginRequestDto.email,
    });
    if (!user) {
      throw new BadRequestException('Email not found');
    }
    if (!(await bcrypt.compare(userLoginRequestDto.password, user.password))) {
      throw new BadRequestException('Password not match');
    }
    if (user.role !== 'admin') {
      throw new BadRequestException('User is not admin');
    }
    // const jwt1 = await this.jwtService.signAsync({ id: user.id });
    const jwt = await this.authService.signAccessToken(user);
    // response.cookie('jwt', jwt, { httpOnly: true });
    return {
      message: 'success',
      // jwt1: jwt1,
      jwt: jwt,
      statusCode: 200,
    };
  }

  async inactivateAccount(userId: string) {
    const user = await this.userModel.findOne({
      _id: userId,
    });
    if (!user) {
      throw new BadRequestException('Account not found');
    }

    user.active = false;
    user.save();

    return {
      message: 'success',
      statusCode: 200,
    };
  }

  async activateAccount(userId: string) {
    const user = await this.userModel.findOne({
      _id: userId,
    });
    if (!user) {
      throw new BadRequestException('Account not found');
    }

    user.active = true;
    user.save();

    return {
      message: 'success',
      statusCode: 200,
    };
  }

  async getListUsers() {
    const users = await this.userModel.find({}).exec();
    return {
      users,
      message: 'success',
      statusCode: 200,
    };
  }

  async getListClasses(sortType: string, filterOption: string) {
    console.log('sortType ', sortType);
    console.log('filterOption ', filterOption);
    let sort: SortOrder = 1;
    if (sortType === 'desc') {
      sort = 'desc' as SortOrder;
    } else {
      sort = 'asc' as SortOrder;
    }
    let filter = {};
    if (filterOption === 'active') {
      filter = { active: true };
    } else if (filterOption === 'inactive') {
      filter = { active: false };
    }

    const classes = await this.classModel
      .find(filter)
      .sort({ createdAt: sort as SortOrder })
      .exec();
    const promises = classes?.map(async (classDocument) => {
      return await this.classService.getClassWithUserInfo(classDocument._id.toString());
    });
    return await Promise.all(promises);
  }

  async inactivateClass(classId: string) {
    const classDocument = await this.classModel.findOne({
      _id: classId,
    });
    if (!classDocument) {
      throw new BadRequestException('Class not found');
    }
    console.log('classDocument ', classDocument);

    classDocument.active = false;
    classDocument.save();

    return {
      message: 'success',
      statusCode: 200,
    };
  }

  async activateClass(classId: string) {
    const classDocument = await this.classModel.findOne({
      _id: classId,
    });
    if (!classDocument) {
      throw new BadRequestException('Class not found');
    }
    console.log('classDocument ', classDocument);

    classDocument.active = true;
    classDocument.save();

    return {
      message: 'success',
      statusCode: 200,
    };
  }

  async mapStudentAccount(studentId: string, userId: string) {
    console.log('studentId ', studentId);
    console.log('userId ', userId);
    const user = await this.userModel.findOne({ _id: userId });
    if (!user) {
      throw new BadRequestException('User not found');
    }
    if (user.studentId !== '') {
      throw new BadRequestException('This account has been mapped');
    }
    const studentAccount = await this.userModel.findOne({ studentId: studentId });
    if (studentAccount) {
      throw new BadRequestException('This studentId has been mapped');
    }
    user.studentId = studentId;
    user.save();
    return {
      user,
      message: 'success',
      statusCode: 200,
    };
  }

  async unMapStudentAccount(userId: string) {
    const user = await this.userModel.findOne({ _id: userId });
    if (!user) {
      throw new BadRequestException('User not found');
    }
    if (!user.studentId) {
      throw new BadRequestException('This account has not been mapped');
    }
    user.studentId = '';
    user.save();
    return {
      user,
      message: 'success',
      statusCode: 200,
    };
  }

  async mapStudentAccountFromFile(buffer: Buffer, originalname: string) {
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.load(buffer);

    const worksheet = workbook.getWorksheet(1);
    const data = [];

    worksheet.eachRow((row) => {
      data.push(row.values);
    });
    console.log('Uploaded data:', data);
    let keys = data[0].slice(1); // Get the keys from the first subarray, excluding the first empty item
    let values = data.slice(1); // Get the values from the rest of the subarrays

    let result: { No: any; StudentId: any; Email: any }[] = values.map((subarray) => {
      let obj: { No: any; StudentId: any; Email: any } = {
        No: undefined,
        StudentId: undefined,
        Email: undefined,
      };
      keys.forEach((key, index) => {
        obj[key] = subarray[index + 1]; // Assign the value to the corresponding key in the object, excluding the first empty item in the subarray
      });
      // if (obj.Email === undefined) {
      //   obj.Email = ;
      // }
      return obj;
    });

    console.log('result ', result);
    let notFoundUsers = [];
    let updatedUsers = [];
    let alreadyMappedUsers = [];
    let existedStudentId = [];
    for (const element of result) {
      const student = await this.userModel.findOne({
        email: element.Email?.text ?? element.Email,
      });
      if (!student) {
        notFoundUsers.push(element.Email?.text ?? element.Email);
        continue;
      }
      if (student.studentId !== '') {
        alreadyMappedUsers.push({
          email: element.Email?.text ?? element.Email,
          studentId: element.StudentId,
        });
        continue;
      }
      const studentIdExisted = await this.userModel.findOne({ studentId: element.StudentId });
      if (studentIdExisted) {
        existedStudentId.push({
          existedStudentId: studentIdExisted.studentId,
        });
        continue;
      }
      student.studentId = element.StudentId;
      updatedUsers.push({
        email: element.Email?.text ?? element.Email,
        studentId: element.StudentId,
      });
      await student.save();
    }

    return {
      notFoundUsers,
      message: 'success',
      statusCode: 200,
    };
  }
}
