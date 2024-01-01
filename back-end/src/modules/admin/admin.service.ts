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
      id: userId,
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
}
