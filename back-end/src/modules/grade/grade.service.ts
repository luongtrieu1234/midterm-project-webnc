import { Inject, Injectable, Logger, Query } from '@nestjs/common';
import mongoose, { Model } from 'mongoose';
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
import { GradeModel } from './grade.model';
import { AddGradeDto } from './dto/add-grade.dto';

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
    private readonly gradeStructureModel: Model<GradeStructureModel>,
    @InjectModel('Grade')
    private readonly gradeModel: Model<GradeModel>, // private readonly userModel: Model<UserModel>,
    // @InjectModel('User')
  ) {}
  async showGradeStructure(classId: string) {
    try {
      // const classDocument = await this.classModel
      //   .findById(classId)
      //   .populate({ path: 'gradeComposition', options: { sort: { position: 1 } } })
      //   // .populate('gradeComposition')
      //   .exec();

      // if (!classDocument) {
      //   throw new BadRequestException('Class not found');
      // }
      // return classDocument.gradeComposition;

      const gradeCompositionDocuments = await this.gradeCompositionModel
        .find({ class: classId })
        .sort({ position: 1 })
        .populate('grades');
      return gradeCompositionDocuments;
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

  async downloadTemplateFileList(response: Response, classId: string) {
    const workbook = new ExcelJS.Workbook();
    // create first sheet with file name exceljs-example
    const worksheet = workbook.addWorksheet('exceljs-example');

    worksheet.columns = [
      { header: 'No', key: 'no' },
      { header: 'StudentId', key: 'studentId' },
      { header: 'Fullname', key: 'fullname' },
      { header: 'Email', key: 'email' },
    ];
    const classDocument = await this.classModel.findById(classId);
    console.log('classId ', classId);
    if (!classDocument) {
      throw new BadRequestException('Class not existed');
    }
    console.log('classDocument ', classDocument);
    const classCode = classDocument.classCode;
    const buffer = await workbook.xlsx.writeBuffer();
    return { buffer, classCode };

    // let data = [
    //   // { no: '1', name: 'Muhammad Ichsan' },
    //   // { no: '2', name: 'Muhammad Amin' },
    // ];
    // students?.map((student, index) => {
    //   console.log('student ', student.user['fullname']);
    //   data.push({
    //     no: index + 1,
    //     studentId: student.user['_id'],
    //     fullname: student.user['fullname'],
    //   });
    // });

    // data.forEach((val, i, _) => {
    //   worksheet.addRow(val);
    // });
  }

  async downloadTemplateFileGrade(response: Response, gradeCompositionId: string) {
    const workbook = new ExcelJS.Workbook();
    // create first sheet with file name exceljs-example
    const worksheet = workbook.addWorksheet('exceljs-example');

    worksheet.columns = [
      { header: 'No', key: 'no' },
      { header: 'StudentId', key: 'studentId' },
      { header: 'Grade', key: 'grade' },
    ];
    const gradeCompositionDocument = await this.gradeCompositionModel.findById(gradeCompositionId);
    const gradeCompositionName = gradeCompositionDocument.name;
    const buffer = await workbook.xlsx.writeBuffer();
    return { buffer, gradeCompositionName };
  }

  async readExcelFileList(buffer: Buffer, originalname: string): Promise<any[]> {
    const parts = originalname.split('.');
    const nameWithoutExtension = parts.slice(0, -1).join('.');
    console.log(nameWithoutExtension);
    const classDocument = await this.classModel.findOne({
      classCode: nameWithoutExtension,
    });
    console.log('classDocument ', classDocument);
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.load(buffer);

    const worksheet = workbook.getWorksheet(1);
    const data = [];

    worksheet.eachRow((row) => {
      data.push(row.values);
    });

    return data;
  }

  async readExcelFileGrade(buffer: Buffer, originalname: string): Promise<any[]> {
    const parts = originalname.split('.');
    const nameWithoutExtension = parts.slice(0, -1).join('.');
    console.log(nameWithoutExtension);
    const gradeCompositionDocument = await this.gradeCompositionModel.findOne({
      name: nameWithoutExtension,
    });
    console.log('gradeCompositionDocument ', gradeCompositionDocument);
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.load(buffer);

    const worksheet = workbook.getWorksheet(1);
    const data = [];

    worksheet.eachRow((row) => {
      data.push(row.values);
    });
    console.log('Uploaded data:', data);

    return data;
  }

  async readExcelGrade(filePath) {
    const workbook = new ExcelJS.Workbook();

    try {
      await workbook.xlsx.readFile(filePath);

      // Assuming there's only one sheet in the Excel file; adjust accordingly
      const worksheet = workbook.getWorksheet(1);

      // Iterate through rows and columns
      worksheet.eachRow((row, rowNumber) => {
        console.log(`Row ${rowNumber}:`);
        row.eachCell((cell, colNumber) => {
          console.log(`  Column ${colNumber}: ${cell.value}`);
        });
      });
    } catch (error) {
      console.error('Error reading Excel file:', error.message);
    }
  }

  async getClassGrades(classId: string) {
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
      // const result = await this.classModel.aggregate([
      //   {
      //     $match: {
      //       _id: new mongoose.Types.ObjectId(classId),
      //     },
      //   },
      //   {
      //     $unwind: '$gradeComposition',
      //   },
      //   {
      //     $lookup: {
      //       from: 'gradecompositions', // Target collection (GradeCompositionModel.collection.name)
      //       localField: 'gradeComposition',
      //       foreignField: '_id',
      //       as: 'gradeCompositionDetails',
      //     },
      //   },
      //   {
      //     $unwind: '$gradeCompositionDetails',
      //   },
      //   {
      //     $unwind: '$students',
      //   },
      //   {
      //     $lookup: {
      //       from: 'users', // Target collection (UserModel.collection.name)
      //       localField: 'students.user',
      //       foreignField: '_id',
      //       as: 'studentDetails',
      //     },
      //   },
      //   {
      //     $unwind: '$studentDetails',
      //   },
      //   {
      //     $lookup: {
      //       from: 'grades', // Target collection (GradesModel.collection.name)
      //       let: { studentId: '$students.user', gradeCompositionId: '$gradeComposition' },
      //       pipeline: [
      //         {
      //           $match: {
      //             $expr: {
      //               $and: [
      //                 { $eq: ['$student', '$$studentId'] },
      //                 { $eq: ['$gradeComposition', '$$gradeCompositionId'] },
      //               ],
      //             },
      //           },
      //         },
      //       ],
      //       as: 'studentGrades',
      //     },
      //   },
      //   {
      //     $group: {
      //       _id: {
      //         classId: '$_id',
      //         gradeCompositionId: '$gradeComposition',
      //       },
      //       students: {
      //         $push: {
      //           studentDetails: '$studentDetails',
      //           grades: '$studentGrades',
      //         },
      //       },
      //       gradeCompositionDetails: { $first: '$gradeCompositionDetails' },
      //     },
      //   },
      // ]);
      const result = await this.classModel.aggregate([
        {
          $match: {
            _id: new mongoose.Types.ObjectId(classId),
          },
        },
        {
          $unwind: '$gradeComposition',
        },
        {
          $lookup: {
            from: 'gradecompositions', // Target collection (GradeCompositionModel.collection.name)
            localField: 'gradeComposition',
            foreignField: '_id',
            as: 'gradeCompositionDetails',
          },
        },
        {
          $sort: {
            'gradeCompositionDetails.position': 1, // Sort by the 'position' field in ascending order
          },
        },
        {
          $unwind: '$gradeCompositionDetails',
        },
        {
          $unwind: '$students',
        },
        {
          $lookup: {
            from: 'users', // Target collection (UserModel.collection.name)
            localField: 'students.user',
            foreignField: '_id',
            as: 'studentDetails',
          },
        },
        {
          $unwind: '$studentDetails',
        },
        {
          $lookup: {
            from: 'grades', // Target collection (GradesModel.collection.name)
            let: { studentId: '$students.user', gradeCompositionId: '$gradeComposition' },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $and: [
                      { $eq: ['$student', '$$studentId'] },
                      { $eq: ['$gradeComposition', '$$gradeCompositionId'] },
                    ],
                  },
                },
              },
            ],
            as: 'studentGrades',
          },
        },
        {
          $group: {
            _id: {
              classId: '$_id',
              studentId: '$students.user',
            },
            studentDetails: { $first: '$studentDetails' },
            gradeComposition: {
              $push: {
                gradeCompositionDetails: '$gradeCompositionDetails',
                grades: '$studentGrades',
              },
            },
          },
        },
      ]);
      return result;
    } catch (error) {
      console.log('Error retrieving data ', error);
      throw new BadRequestException('Error');
    }
  }

  async addGrade(dto: AddGradeDto) {
    try {
      const gradeCompositionDocument = await this.gradeCompositionModel
        .findById(dto.gradeCompositionId)
        .exec();

      if (!gradeCompositionDocument) {
        throw new BadRequestException('Grade composition not existed');
      }

      const gradeDocument = await this.gradeModel.create({
        value: dto.value,
        gradeComposition: dto.gradeCompositionId,
        student: dto.studentId,
      });

      gradeCompositionDocument.grades.push(gradeDocument._id.toString());
      gradeCompositionDocument.save();

      return gradeDocument;
    } catch (error) {
      console.log('Error retrieving data ', error);
      throw new BadRequestException('Error');
    }
  }

  async setFinalGradeComposition(gradeCompositionId: string) {
    const gradeCompositionDocument = await this.gradeCompositionModel.findById(gradeCompositionId);
    gradeCompositionDocument.isFinal = true;
    gradeCompositionDocument.save();
    return {
      message: 'success',
      statusCode: 200,
    };
  }
}
