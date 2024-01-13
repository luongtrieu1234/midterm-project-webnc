import { HttpStatus, Inject, Injectable, Logger } from '@nestjs/common';
import { Model, SortOrder } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import * as bcrypt from 'bcrypt';
// import { JwtService } from '@nestjs/jwt';
import { AuthService } from '../../others/auth/auth.service';
import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UnauthorizedException,
} from '@nestjs/common';
import { Response, Request } from 'express';
import { MailService } from '../../others/mail/mail.service';
import { SharedService } from 'src/others/auth/shared.service';
import { UserModel } from '../users/users.model';
import { NotificationModel, NotificationType } from './notification.model';
import { RoleModel } from '../role/role.model';
import { GradeModel } from '../grade/grade.model';
import { GradeStructureModel } from '../grade/grade-structure.model';
import { ClassModel } from '../class/class.model';
import { GradeCompositionModel } from '../grade/grade-composition.model';

@Injectable()
export class NotificationService {
  constructor(
    // @Inject('UserRepository')
    // private readonly userRepository: typeof User,
    // private jwtService: JwtService,
    // private authService: AuthService,
    // private mailService: MailService,
    // private sharedService: SharedService,
    // @InjectModel('User')
    // private readonly userModel: Model<UserModel>,
    // @InjectModel('Class')
    // private readonly classModel: Model<ClassModel>,
    // @InjectModel('Grade')
    // private readonly gradeModel: Model<GradeModel>,
    // @InjectModel('GradeComposition')
    // private readonly gradeCompositionModel: Model<GradeCompositionModel>,
    // @InjectModel('Grade')
    // private readonly gradeModel: Model<GradeModel>,
    // @InjectModel('GradeStructure')
    // private readonly gradeStructureModel: Model<GradeStructureModel>,
    @InjectModel('Notification')
    private readonly notificationModel: Model<NotificationModel>,
  ) {}

  async notifyStudentsGradeCompositionFinalized(
    gradeCompositionId: string,
    students: string[],
    currentPath: string,
  ) {
    const message = `A grade composition has been finalized `;
    students.forEach(async (student) => {
      const notification = {
        type: NotificationType.TEACHER_FINALIZES_GRADE,
        recipient: student,
        relatedGradeComposition: gradeCompositionId,
        message,
        currentPath,
      };
      await this.notificationModel.create(notification);
    });
    return {
      message: 'Notifications sent successfully',
      statusCode: HttpStatus.OK,
    };
  }

  async notifyStudentGradeReviewReply(studentId: string, gradeId: string, currentPath: string) {
    const message = `Your grade review request has been replied`;
    const notification = {
      type: NotificationType.TEACHER_REPLIES_TO_REVIEW,
      recipient: studentId,
      relatedGrade: gradeId,
      message,
      currentPath,
    };
    await this.notificationModel.create(notification);
    return {
      message: 'Notification sent successfully',
      statusCode: HttpStatus.OK,
    };
  }

  async notifyStudentFinalMarkReviewDecision(
    studentId: string,
    gradeId: string,
    currentPath: string,
  ) {
    const message = 'Your final mark review request has been decided';
    const notification = {
      type: NotificationType.TEACHER_FINALIZES_GRADE,
      recipient: studentId,
      relatedGrade: gradeId,
      message,
      currentPath,
    };
    await this.notificationModel.create(notification);
  }

  async notifyTeachersGradeReviewRequest(gradeId: string, teachers: string[], currentPath: string) {
    const message = 'A student has requested a review for a grade composition';
    // const grade = await this.gradeModel.findById(gradeId).populate('class').exec();
    // const gradeCompositionDocument = await this.gradeCompositionModel
    //   .findById(grade.gradeComposition)
    //   .exec();
    // const teachers = await this.classModel.findById(grade.class).populate('teachers').exec();
    teachers.forEach(async (teacher) => {
      const notification = {
        type: NotificationType.STUDENT_REQUESTS_REVIEW,
        recipient: teacher,
        // relatedClass: gradeId,
        relatedGrade: gradeId,
        message,
        currentPath,
      };
      await this.notificationModel.create(notification);
    });
    return {
      message: 'Notifications sent successfully',
      statusCode: HttpStatus.OK,
      currentPath,
    };
  }

  async notifyTeacherStudentGradeReviewReply(
    teacherId: string,
    gradeId: string,
    currentPath: string,
  ) {
    const message = 'A student has replied to your review';
    const notification = {
      type: NotificationType.STUDENT_REPLIES_TO_REVIEW,
      recipient: teacherId,
      relatedGrade: gradeId,
      message,
      currentPath,
    };
    await this.notificationModel.create(notification);
    return {
      message: 'Notification sent successfully',
      statusCode: HttpStatus.OK,
      currentPath,
    };
  }

  async getNotificationDetail(notificationId: string) {
    const notification = await this.notificationModel
      .findById(notificationId)
      .populate('recipient')
      .populate('relatedGrade')
      .lean()
      .exec();
    return {
      message: 'Notification detail',
      statusCode: HttpStatus.OK,
      notification,
    };
  }
}
