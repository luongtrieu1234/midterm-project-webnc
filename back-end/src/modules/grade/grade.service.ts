import { Inject, Injectable, Logger, Query, StreamableFile } from '@nestjs/common';
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
import { ReviewRequestDto } from './dto/review-request.dto';
import { CommentModel } from './comment.model';
import { CommentDto } from './dto/comment.dto';
import { MarkDecisionDto } from './dto/mark-decition.dto';
import { NotificationService } from '../notification/notification.service';

@Injectable()
export class GradeService {
  constructor(
    // @Inject('UserRepository')
    // private readonly userRepository: typeof User,
    private authService: AuthService,
    private mailService: MailService,
    private sharedService: SharedService,
    private classService: ClassService,
    private notificationService: NotificationService,
    @InjectModel('User')
    private readonly userModel: Model<UserModel>,
    @InjectModel('Class')
    private readonly classModel: Model<ClassModel>,
    @InjectModel('GradeComposition')
    private readonly gradeCompositionModel: Model<GradeCompositionModel>,
    @InjectModel('GradeStructure')
    private readonly gradeStructureModel: Model<GradeStructureModel>,
    @InjectModel('Grade')
    private readonly gradeModel: Model<GradeModel>,
    @InjectModel('Comment')
    private readonly commentModel: Model<CommentModel>, // @InjectModel('User')
    // private readonly userModel: Model<UserModel>,
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
        content: addGradeCompositionDto?.content,
        position: addGradeCompositionDto?.position,
      });

      classDocument.gradeComposition.push(gradeComposition._id.toString());
      classDocument.save();

      return gradeComposition;
    } catch (error) {
      console.error('Error adding grade composition:', error.message);
      throw error;
    }
  }

  async getGradeCompositionDetail(gradeCompositionId: string) {
    try {
      const gradeCompositionDocument = await this.gradeCompositionModel
        .findById(gradeCompositionId)
        .populate('grades')
        .exec();

      if (!gradeCompositionDocument) {
        throw new BadRequestException('Grade composition not found');
      }

      return {
        message: 'success',
        statusCode: 200,
        result: gradeCompositionDocument,
      };
    } catch (error) {
      console.error('Error retrieving grade composition detail:', error);
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
            content: updateGradeCompositionDto?.content,
            position: updateGradeCompositionDto?.position,
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
      const classDocument = await this.classModel.findOne({ gradeComposition: gradeCompositionId });
      const index = classDocument.gradeComposition.indexOf(gradeCompositionId);
      if (index !== -1) {
        classDocument.gradeComposition.splice(index, 1);
      }
      classDocument.save();
    } catch (error) {
      console.error('Error removing grade composition:', error.message);
      throw error;
    }
  }

  async downloadTemplateFileList(response: Response, classId: string) {
    const classDocument = await this.classModel.findById(classId);
    console.log('classId ', classId);
    if (!classDocument) {
      throw new BadRequestException('Class not existed');
    }
    const workbook = new ExcelJS.Workbook();
    // create first sheet with file name exceljs-example
    const worksheet = workbook.addWorksheet('exceljs-example');

    worksheet.columns = [
      { header: 'No', key: 'no' },
      { header: 'StudentId', key: 'studentId' },
      { header: 'Fullname', key: 'fullname' },
      { header: 'Email', key: 'email' },
    ];
    const buffer = await workbook.xlsx.writeBuffer();
    const className = classDocument.name;
    return { buffer, className };
  }

  async downloadTemplateFileGrade(response: Response, gradeCompositionId: string) {
    const gradeCompositionDocument = await this.gradeCompositionModel.findById(gradeCompositionId);
    const gradeCompositionName = gradeCompositionDocument.name;
    const workbook = new ExcelJS.Workbook();
    // create first sheet with file name exceljs-example
    const worksheet = workbook.addWorksheet('exceljs-example');

    worksheet.columns = [
      { header: 'No', key: 'no' },
      { header: 'StudentId', key: 'studentId' },
      { header: 'Grade', key: 'grade' },
    ];
    const buffer = await workbook.xlsx.writeBuffer();
    return { buffer, gradeCompositionName };
  }

  async exportFileGrade(response: Response, classId: string) {
    const classDocument = await this.classModel
      .findById(classId)
      .populate({ path: 'gradeComposition', options: { sort: { position: 1 } } })
      .exec();
    const gradeCompositions = classDocument.gradeComposition;
    console.log('classId ', classId);
    if (!classDocument) {
      throw new BadRequestException('Class not existed');
    }
    const classData = await this.getClassGrades(classId);
    const workbook = new ExcelJS.Workbook();
    // create first sheet with file name exceljs-example
    const worksheet = workbook.addWorksheet('exceljs-example');

    const columnData = [
      { header: 'No', key: 'no' },
      { header: 'StudentId', key: 'studentId' },
      { header: 'Name', key: 'name' },
    ];
    for (let i = 0; i < classData?.result?.[0]?.gradeComposition?.length; i++) {
      columnData.push({
        header: gradeCompositions?.[i]?.['name'],
        key: gradeCompositions?.[i]?.['name'],
      });
    }
    console.log(
      'classData?.result?.[0]?.gradeComposition ',
      classData?.result?.[0]?.gradeComposition,
    );
    worksheet.columns = columnData;
    let columns = [...columnData];
    columns.shift();
    columns.shift();
    columns.shift();
    console.log('columnData ', columnData);
    console.log('columns ', columns);
    let data = [
      // { no: '1', name: 'Muhammad Ichsan' },
      // { no: '2', name: 'Muhammad Amin' },
    ];
    classData?.result?.map((student, index) => {
      // console.log('student ', student.user['fullname']);
      // data.push({
      //   no: index + 1,
      //   studentId: student.user['_id'],
      //   fullname: student.user['fullname'],
      // });
      let studentData = { no: index + 1 }; // Initialize with 'no' key
      studentData['studentId'] = student.studentDetails['studentId']; // Add 'studentId' key
      studentData['name'] = student.studentDetails['fullname']; // Add 'name' key

      columns.forEach((column, index) => {
        studentData[column.key] = student.gradeComposition?.[index]?.grade?.['value']; // Add keys from columnData
      });

      data.push(studentData);
    });

    data.forEach((val, i, _) => {
      worksheet.addRow(val);
    });
    const buffer = await workbook.xlsx.writeBuffer();
    const className = classDocument.name;
    return { buffer, className };
  }

  async readExcelFileList(buffer: Buffer, originalname: string) {
    const parts = originalname.split('.');
    const nameWithoutExtension = parts.slice(0, -1).join('.');
    console.log(nameWithoutExtension);
    const classDocument = await this.classModel.findOne({
      name: nameWithoutExtension,
    });
    console.log('classDocument ', classDocument);
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

    let result: { No: any; StudentId: any; Fullname: any; Email: any }[] = values.map(
      (subarray) => {
        let obj: { No: any; StudentId: any; Fullname: any; Email: any } = {
          No: undefined,
          StudentId: undefined,
          Fullname: undefined,
          Email: undefined,
        };
        keys.forEach((key, index) => {
          obj[key] = subarray[index + 1]; // Assign the value to the corresponding key in the object, excluding the first empty item in the subarray
        });
        // if (obj.Email === undefined) {
        //   obj.Email = ;
        // }
        return obj;
      },
    );

    console.log('result ', result);
    // let notFoundStudents = [];
    // let updatedStudents = [];
    // for (const element of result) {
    //   const student = await this.userModel.findOne({
    //     studentId: element.StudentId,
    //   });
    //   if (!student) {
    //     notFoundStudents.push(element.StudentId);
    //     continue;
    //   }
    //   student.fullname = element.Fullname;
    //   updatedStudents.push(element.StudentId);
    //   await student.save();
    // }
    let notFoundStudents = [];
    let updatedStudents = [];
    let alreadyMappedStudents = [];
    for (const element of result) {
      const student = await this.userModel.findOne({
        email: element.Email?.text ?? element.Email,
      });
      if (!student) {
        notFoundStudents.push({
          email: element.Email?.text ?? element.Email,
          studentId: element.StudentId,
        });
        continue;
      }
      await this.classService.addUsersToClass({
        name: classDocument.name.replace(/\+/g, ' '),
        students: [{ email: student.email }],
        teachers: [],
      });
      if (student.studentId !== '') {
        alreadyMappedStudents.push({
          email: element.Email?.text ?? element.Email,
          studentId: element.StudentId,
          existedStudentId: student.studentId,
        });
        continue;
      }
      student.studentId = element.StudentId;
      updatedStudents.push({
        email: element.Email?.text ?? element.Email,
        studentId: element.StudentId,
      });
      await student.save();
    }

    return {
      notFoundStudents,
      updatedStudents,
      alreadyMappedStudents,
      message: 'success',
      statusCode: 200,
    };
  }

  async readExcelFileGrade(buffer: Buffer, originalname: string) {
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
    let keys = data[0].slice(1); // Get the keys from the first subarray, excluding the first empty item
    let values = data.slice(1); // Get the values from the rest of the subarrays

    let result: { No: any; StudentId: any; Grade: any }[] = values.map((subarray) => {
      let obj: { No: any; StudentId: any; Grade: any } = {
        No: undefined,
        StudentId: undefined,
        Grade: undefined,
      };
      keys.forEach((key, index) => {
        obj[key] = subarray[index + 1]; // Assign the value to the corresponding key in the object, excluding the first empty item in the subarray
      });
      return obj;
    });

    console.log('result ', result);
    // const promises = result?.map(async (element: { Grade: any; StudentId: any }) => {
    //   const student = await this.userModel.findOne({ studentId: element.StudentId });
    //   const gradeDocument = await this.gradeModel.create({
    //     value: element.Grade,
    //     gradeComposition: gradeCompositionDocument._id.toString(),
    //     student: student._id.toString(),
    //   });
    //   gradeCompositionDocument.grades.push(gradeDocument._id.toString());
    //   return gradeCompositionDocument.save();
    // });
    // await Promise.all(promises);
    let notFoundStudents = [];
    let updatedGradeStudents = [];
    let createdGradeStudents = [];
    for (const element of result) {
      const student = await this.userModel.findOne({ studentId: element.StudentId });
      if (!student) {
        notFoundStudents.push(element.StudentId);
        continue;
      }
      const currentGradeDocument = await this.gradeModel.findOne({
        gradeComposition: gradeCompositionDocument._id.toString(),
        student: student._id.toString(),
      });
      if (currentGradeDocument) {
        currentGradeDocument.value = element.Grade;
        await currentGradeDocument.save();
        updatedGradeStudents.push(element.StudentId);
        continue;
      }
      const gradeDocument = await this.gradeModel.create({
        value: element.Grade,
        gradeComposition: gradeCompositionDocument._id.toString(),
        student: student._id.toString(),
      });
      gradeCompositionDocument.grades.push(gradeDocument._id.toString());
      console.log('element.StudentId ', element.StudentId);
      createdGradeStudents.push(element.StudentId);
      await gradeCompositionDocument.save();
    }
    // await this.addGrade({
    //   gradeCompositionId: gradeCompositionDocument._id.toString(),
    //   studentId: result[0].StudentId,
    //   value: result[0].Grade,
    // });

    return {
      notFoundStudents,
      updatedGradeStudents,
      createdGradeStudents,
      message: 'success',
      statusCode: 200,
    };
  }

  // async readExcelGrade(filePath) {
  //   const workbook = new ExcelJS.Workbook();

  //   try {
  //     await workbook.xlsx.readFile(filePath);

  //     // Assuming there's only one sheet in the Excel file; adjust accordingly
  //     const worksheet = workbook.getWorksheet(1);

  //     // Iterate through rows and columns
  //     worksheet.eachRow((row, rowNumber) => {
  //       console.log(`Row ${rowNumber}:`);
  //       row.eachCell((cell, colNumber) => {
  //         console.log(`  Column ${colNumber}: ${cell.value}`);
  //       });
  //     });
  //   } catch (error) {
  //     console.error('Error reading Excel file:', error.message);
  //   }
  // }

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
      // console.log('studentDocuments ', studentDocuments);
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
          $unwind: '$studentGrades',
        },
        // {
        //   $addFields: {
        //     'students.totalGrade': { $sum: '$studentGrades.value' },
        //   },
        // },
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
                // grades: '$studentGrades',
              },
            },
            totalGrade: { $sum: '$studentGrades.value' },
            overallGrade: { $avg: '$studentGrades.value' },
          },
        },
      ]);
      let dataReturn = [];
      for (const student of studentDocuments) {
        let studentData = { studentDetails: student.user };
        let gradeCompositionData = {};
        // let gradeData = [];
        for (const gradeComposition of gradeCompositionDocuments) {
          const a = await this.gradeCompositionModel.findById(gradeComposition).select('name');
          // gradeCompositionData.push(a);
          const gradeDocument = await this.gradeModel.findOne({
            gradeComposition: gradeComposition['_id'].toString(),
            student: student.user['_id'].toString(),
          });
          // gradeData.push(gradeDocument);
          let gradeData = { name: a?.name };
          gradeData['grade'] = gradeDocument?.value;
          console.log('value ', gradeDocument?.value ?? null);
          // studentData['grade'] = gradeDocument;
          // gradeCompositionData.push(gradeData);
          // console.log('studentData ', studentData);
          // console.log('gradeDocument ', gradeDocument);
          gradeCompositionData[gradeComposition['_id'].toString()] = gradeData;
        }
        studentData[`gradeComposition`] = gradeCompositionData;
        // studentData['grade'] = gradeData;

        dataReturn.push(studentData);
      }
      return { result: dataReturn, statusCode: 200, message: 'success' };
    } catch (error) {
      console.log('Error retrieving data ', error);
      throw new BadRequestException('Error', error);
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

      const classDocument = await this.classModel.findById(gradeCompositionDocument.class);
      const gradeDocument = await this.gradeModel.create({
        value: dto.value,
        gradeComposition: dto.gradeCompositionId,
        student: dto.userId,
        class: classDocument._id.toString(),
      });

      gradeCompositionDocument.grades.push(gradeDocument._id.toString());
      gradeCompositionDocument.save();

      return gradeDocument;
    } catch (error) {
      console.log('Error retrieving data ', error);
      throw new BadRequestException('Error', error.response.message);
    }
  }

  async updateGrade(dto: AddGradeDto) {
    try {
      const gradeCompositionDocument = await this.gradeCompositionModel
        .findById(dto.gradeCompositionId)
        .exec();

      if (!gradeCompositionDocument) {
        throw new BadRequestException('Grade composition not existed');
      }

      const gradeDocument = await this.gradeModel.findOne({
        gradeComposition: dto.gradeCompositionId,
        student: dto.userId,
      });

      if (!gradeDocument) {
        const classDocument = await this.classModel.findById(gradeCompositionDocument.class);
        const gradeDocument = await this.gradeModel.create({
          value: dto.value,
          gradeComposition: dto.gradeCompositionId,
          student: dto.userId,
          class: classDocument._id.toString(),
        });

        gradeCompositionDocument.grades.push(gradeDocument._id.toString());
        gradeCompositionDocument.save();
        return {
          message: 'Success',
          statusCode: 200,
          data: gradeDocument,
        };
      }
      gradeDocument.value = dto.value;
      gradeDocument.save();
      return {
        message: 'Success',
        statusCode: 200,
        data: gradeDocument,
      };
    } catch (error) {
      console.log('Error retrieving data ', error);
      throw new BadRequestException('Error', error.response.message);
    }
  }

  async markFinalGradeComposition(gradeCompositionId: string) {
    const gradeCompositionDocument = await this.gradeCompositionModel.findById(gradeCompositionId);
    gradeCompositionDocument.isFinal = true;
    gradeCompositionDocument.save();
    const classDocument = await this.classModel.findById(gradeCompositionDocument.class);
    const students = await this.classModel.findById(classDocument._id).populate('students');
    const studentIds = students.students.map((student) => student.user.toString());
    console.log('studentIds ', studentIds);
    await this.notificationService.notifyStudentsGradeCompositionFinalized(
      gradeCompositionId,
      studentIds,
    );
    return {
      message: 'success',
      statusCode: 200,
    };
  }

  async getGradesOfStudent(classId: string, userId: string) {
    try {
      const classDocument = await this.classModel.findById(classId);
      if (!classDocument) {
        throw new BadRequestException('Class not existed', 'Class not existed');
      }
      // const gradeCompositionDocuments = await classDocument.gradeComposition;
      const gradeCompositionDocuments = await this.gradeCompositionModel.find({ class: classId });
      const studentDocument = await this.userModel.findById(userId);
      console.log('studentDocument ', studentDocument);
      if (!studentDocument) {
        throw new BadRequestException('Student not existed');
      }
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
          $match: {
            'gradeCompositionDetails.isFinal': true,
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
          $match: {
            'students.user': new mongoose.Types.ObjectId(userId),
          },
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
          $unwind: '$studentGrades',
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
            totalGrade: { $sum: '$studentGrades.value' },
            overallGrade: { $avg: '$studentGrades.value' },
          },
        },
      ]);
      let dataReturn = [];
      let studentData = { studentDetails: studentDocument };
      let gradeCompositionData = {};
      // let gradeData = [];
      for (const gradeComposition of gradeCompositionDocuments) {
        const a = await this.gradeCompositionModel.findById(gradeComposition).select('name');
        // gradeCompositionData.push(a);
        const gradeDocument = await this.gradeModel.findOne({
          gradeComposition: gradeComposition['_id'].toString(),
          student: studentDocument['_id'].toString(),
        });
        // if (gradeComposition['isFinal'] === false) {
        //   continue;
        // }
        // gradeData.push(gradeDocument);
        let gradeData = { name: a?.name };
        gradeData['grade'] = gradeDocument?.value;
        console.log('value ', gradeDocument?.value ?? null);
        // studentData['grade'] = gradeDocument;
        // gradeCompositionData.push(gradeData);
        // console.log('studentData ', studentData);
        // console.log('gradeDocument ', gradeDocument);
        gradeCompositionData[gradeComposition['_id'].toString()] = gradeData;
      }
      studentData[`gradeComposition`] = gradeCompositionData;
      // studentData['grade'] = gradeData;

      dataReturn.push(studentData);
      return { result: dataReturn, statusCode: 200, message: 'success' };
      // return { result, statusCode: 200, message: 'success' };
    } catch (error) {
      console.log('Error retrieving data ', error);
      throw new BadRequestException('Error', error.response.message);
    }
  }

  async requestReviewGrade(reviewRequestDto: ReviewRequestDto) {
    const updatedGradeDocument = await this.gradeModel.findOneAndUpdate(
      { _id: reviewRequestDto.gradeId },
      {
        $set: {
          requestReview: true,
          finalDecision: false,
          expectedGrade: reviewRequestDto.expectedGrade,
          explanation: reviewRequestDto.explanation,
        },
      },
      { new: true }, // This option returns the updated document
    );

    const teachers = await this.classModel
      .findById(updatedGradeDocument.class)
      .populate('teachers');
    const teacherIds = teachers.teachers.map((teacher) => teacher.user.toString());
    console.log('teacherIds ', teacherIds);
    await this.notificationService.notifyTeachersGradeReviewRequest(
      reviewRequestDto.gradeId,
      teacherIds,
    );
    if (!updatedGradeDocument) {
      throw new BadRequestException('Grade not found');
    }

    return {
      message: 'Success',
      statusCode: 200,
      data: updatedGradeDocument,
    };
  }

  async getListGradeReviewRequests(classId: string) {
    const classDocument = await this.classModel.findById(classId);
    if (!classDocument) {
      throw new BadRequestException('Class not existed');
    }

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
                    { $eq: ['$requestReview', true] }, // Add this line
                  ],
                },
              },
            },
            {
              $lookup: {
                from: 'comments',
                localField: 'comments',
                foreignField: '_id',
                pipeline: [
                  {
                    $sort: {
                      order: -1, // Sort by 'order' in ascending order
                    },
                  },
                ],
                as: 'comments',
              },
            },
          ],
          as: 'studentGrades',
        },
      },
      {
        $match: {
          'studentGrades.requestReview': true,
        },
      },
      {
        $group: {
          _id: {
            classId: '$_id',
            // gradeCompositionId: '$gradeComposition',
          },
          students: {
            $push: {
              // studentDetails: '$studentDetails',
              grades: '$studentGrades',
            },
          },
          // gradeCompositionDetails: { $first: '$gradeCompositionDetails' },
        },
      },
    ]);
    return { result, statusCode: 200, message: 'success' };
  }

  async getGradeReviewRequestDetail(classId: string, gradeId: string) {
    const grade = await this.gradeModel
      .findById(gradeId)
      .populate('student')
      .populate('gradeComposition')
      .populate('comments');
    return grade;
  }

  async getGradeDetailByGradeId(gradeId: string) {
    const gradeDocument = await this.gradeModel.findById(gradeId).populate('comments');
    return {
      message: 'success',
      statusCode: 200,
      result: gradeDocument,
    };
  }

  async commentReview(commentDto: CommentDto, userId: string) {
    const gradeDocument = await this.gradeModel.findById(commentDto.gradeId).populate('comments');
    if (!gradeDocument) {
      throw new BadRequestException('Grade not existed');
    }
    const comments = await this.commentModel.find({ _id: { $in: gradeDocument.comments } });
    const orders = comments.map((comment) => {
      return comment.order;
    });
    console.log('comments ', comments);
    let orderMax = Math.max(...orders.map(Number));
    if (orderMax === -Infinity) {
      orderMax = 0;
    }
    const commentDocument = await this.commentModel.create({
      content: commentDto.content,
      user: userId,
      order: orderMax + 1,
    });
    gradeDocument.comments.push(commentDocument._id.toString());
    await gradeDocument.save();
    const currentGradeDocument = await this.gradeModel
      .findById(commentDto.gradeId)
      .populate({ path: 'comments', options: { sort: { created_at: -1 } } });
    const user = await this.classService.getUserRoleInClass(currentGradeDocument.class, userId);
    const userRole = user.role;
    if (userRole === 'teacher') {
      const student = await this.userModel.findById(currentGradeDocument.student);
      await this.notificationService.notifyStudentGradeReviewReply(
        student._id.toString(),
        currentGradeDocument._id.toString(),
      );
    } else if (userRole === 'student') {
      const teachers = await this.classModel
        .findById(currentGradeDocument.class)
        .populate('teachers');
      const teacherIds = teachers.teachers.map((teacher) => teacher.user.toString());
      teacherIds.map(async (teacherId) => {
        await this.notificationService.notifyTeacherStudentGradeReviewReply(
          teacherId,
          currentGradeDocument._id.toString(),
        );
      });
    }
    return {
      message: 'success',
      statusCode: 200,
      currentGradeDocument,
    };
  }

  async markFinalDecisionGrade(markDecisionDto: MarkDecisionDto) {
    const updatedGradeDocument = await this.gradeModel.findOneAndUpdate(
      { _id: markDecisionDto.gradeId },
      { $set: { finalDecision: true, value: markDecisionDto.updatedGrade } },
      { new: true }, // This option returns the updated document
    );

    if (!updatedGradeDocument) {
      return {
        message: 'Grade not found',
        statusCode: 404,
      };
    }

    const student = await this.userModel.findById(updatedGradeDocument.student);
    await this.notificationService.notifyStudentFinalMarkReviewDecision(
      student._id.toString(),
      updatedGradeDocument._id.toString(),
    );
    return {
      message: 'Success',
      statusCode: 200,
      updatedGradeDocument: updatedGradeDocument,
    };
  }
}
