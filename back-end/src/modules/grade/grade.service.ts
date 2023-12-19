import { Inject, Injectable, Logger, Query } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import * as bcrypt from 'bcrypt';
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
import * as ExcelJS from 'exceljs';

import { MailService } from '../../others/mail/mail.service';
import { SharedService } from 'src/others/auth/shared.service';
import { AddGradeCompositionDto } from './dto/add-grade-composition.dto';
import { UpdateGradeCompositionDto } from './dto/update-grade-composition.dto';
import { UserModel } from '../users/users.model';
import { ClassModel } from '../class/class.model';
import { GradeCompositionModel } from './grade-composition.model';
import { GradeStructureModel } from './grade-structure.model';
import { ClassService } from '../class/class.service';

@Injectable()
export class GradeService {
  constructor(
    // @Inject('UserRepository')
    // private readonly userRepository: typeof User,
    private authService: AuthService,
    private mailService: MailService,
    private sharedService: SharedService,
    private classService: ClassService,
    @InjectModel('User')
    private readonly userModel: Model<UserModel>,
    @InjectModel('Class')
    private readonly classModel: Model<ClassModel>,
    @InjectModel('GradeComposition')
    private readonly gradeCompositionModel: Model<GradeCompositionModel>,
    @InjectModel('GradeStructure')
    private readonly gradeStructureModel: Model<GradeStructureModel>, // private readonly userModel: Model<UserModel>,
  ) // @InjectModel('User')
  {}
  async showGradeStructure(classId: string) {
    try {
      const classDocument = await this.classModel
        .findById(classId)
        .populate('gradeComposition')
        .exec();

      if (!classDocument) {
        throw new BadRequestException('Class not found');
      }
      return classDocument.gradeComposition;
      // if (classDocument.gradeStructure) {
      //   const gradeStructureDocument = await this.gradeStructureModel
      //     .findById(classDocument.gradeStructure)
      //     .populate('gradeComposition')
      //     .exec();

      //   console.log('gradeStructureDocument', gradeStructureDocument);
      //   if (gradeStructureDocument.gradeComposition) {
      //     // const gradeCompositionDocument = await GradeCompositionModel.findById(gradeStructureDocument.gradeComposition)
      //     //   .populate('grades')
      //     //   .exec();

      //     // console.log('gradeCompositionDocument ', gradeCompositionDocument);
      //     return gradeStructureDocument;
      //   }
      // }
    } catch (error) {
      console.error('Error retrieving current grade structure:', error.message);
      throw error;
    }
  }

  async addGradeComposition(addGradeCompositionDto: AddGradeCompositionDto) {
    try {
      const classDocument = await this.classModel.findById(addGradeCompositionDto.classId);
      const gradeComposition = await this.gradeCompositionModel.create({
        name: addGradeCompositionDto.name,
        gradeScale: addGradeCompositionDto.gradeScale,
        class: addGradeCompositionDto.classId,
      });

      classDocument.gradeComposition.push(gradeComposition._id.toString());
      classDocument.save();

      return gradeComposition;
    } catch (error) {
      console.error('Error adding grade composition:', error.message);
      throw error;
    }
  }

  async updateGradeComposition(updateGradeCompositionDto: UpdateGradeCompositionDto) {
    try {
      const updatedGradeComposition = await this.gradeCompositionModel
        .findByIdAndUpdate(
          updateGradeCompositionDto.gradeCompositionId,
          {
            name: updateGradeCompositionDto.name,
            gradeScale: updateGradeCompositionDto.gradeScale,
          },
          { new: true },
        )
        .exec();

      return updatedGradeComposition;
    } catch (error) {
      console.error('Error updating grade composition:', error.message);
      throw error;
    }
  }

  async removeGradeComposition(gradeCompositionId: string) {
    try {
      await this.gradeCompositionModel.findByIdAndDelete(gradeCompositionId).exec();
    } catch (error) {
      console.error('Error removing grade composition:', error.message);
      throw error;
    }
  }

  async downloadExcelFile(response: Response, classId: string) {
    const classDocument = await this.classService.getClassWithUserInfo('6573f769a7b3f37769656f00');
    const students = classDocument.students;
    console.log('students ', students);
    const workbook = new ExcelJS.Workbook();
    // create first sheet with file name exceljs-example
    const worksheet = workbook.addWorksheet('exceljs-example');

    worksheet.columns = [
      { header: 'No', key: 'no' },
      { header: 'StudentId', key: 'studentId' },
      { header: 'Fullname', key: 'fullname' },
    ];

    let data = [
      // { no: '1', name: 'Muhammad Ichsan' },
      // { no: '2', name: 'Muhammad Amin' },
    ];
    students?.map((student, index) => {
      console.log('student ', student.user['fullname']);
      data.push({
        no: index + 1,
        studentId: student.user['_id'],
        fullname: student.user['fullname'],
      });
    });

    data.forEach((val, i, _) => {
      worksheet.addRow(val);
    });
    return await workbook.xlsx.writeBuffer();
  }

  async readExcelFile(buffer: Buffer): Promise<any[]> {
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.load(buffer);

    const worksheet = workbook.getWorksheet(1);
    const data = [];

    worksheet.eachRow((row) => {
      data.push(row.values);
    });

    return data;
  }

  async getGrades(classId: string) {
    try {
      const classDocument = await this.classService.getClassWithUserInfo(classId);
      if (!classDocument) {
        throw new BadRequestException('Class not existed');
      }
      const gradeCompositionDocuments = await classDocument.gradeComposition;
      const studentDocuments = await classDocument.students;

      console.log('classDocument ', classDocument);
      console.log('gradeCompositionDocuments ', gradeCompositionDocuments);
      console.log('studentDocuments ', studentDocuments);
    } catch (error) {
      console.log('Error retrieving data ', error);
      throw new BadRequestException('Error');
    }
  }
}
