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
import { MailService } from '../../others/mail/mail.service';
import { SharedService } from 'src/others/auth/shared.service';
import { AddGradeCompositionDto } from './dto/add-grade-composition.dto';
import { UpdateGradeCompositionDto } from './dto/update-grade-composition.dto';
import { UserModel } from '../users/users.model';
import { ClassModel } from '../class/class.model';
import { GradeCompositionModel } from './grade-composition.model';
import { GradeStructureModel } from './grade-structure.model';

@Injectable()
export class GradeService {
  constructor(
    // @Inject('UserRepository')
    // private readonly userRepository: typeof User,
    private authService: AuthService,
    private mailService: MailService,
    private sharedService: SharedService,
    @InjectModel('User')
    private readonly userModel: Model<UserModel>,
    @InjectModel('Class')
    private readonly classModel: Model<ClassModel>,
    @InjectModel('GradeComposition')
    private readonly gradeCompositionModel: Model<GradeCompositionModel>,
    @InjectModel('GradeStructure')
    private readonly gradeStructureModel: Model<GradeStructureModel>,
     // @InjectModel('User')
  ) // private readonly userModel: Model<UserModel>,
  {}
  async showGradeStructure(classId: string) {
    try {
      const classDocument = await this.classModel
        .findById(classId)
        .populate('gradeStructure')
        .exec();

      if (!classDocument) {
        throw new BadRequestException('Class not found');
      }
      if (classDocument.gradeStructure) {
        const gradeStructureDocument = await this.gradeStructureModel.findById(classDocument.gradeStructure)
          .populate('gradeComposition')
          .exec();
      
        console.log('gradeStructureDocument', gradeStructureDocument);
        if (gradeStructureDocument.gradeComposition) {
          // const gradeCompositionDocument = await GradeCompositionModel.findById(gradeStructureDocument.gradeComposition)
          //   .populate('grades')
          //   .exec();
      
          // console.log('gradeCompositionDocument ', gradeCompositionDocument);
          return gradeStructureDocument;
        }
      }
    } catch (error) {
      console.error('Error retrieving current grade structure:', error.message);
      throw error;
    }
  }

  async addGradeComposition(addGradeCompositionDto: AddGradeCompositionDto) {
    try {
      const gradeStructureDocument = await this.gradeStructureModel.findById(addGradeCompositionDto.gradeStructureId);
      const gradeComposition = await this.gradeCompositionModel.create({
        name: addGradeCompositionDto.name,
        gradeScale: addGradeCompositionDto.gradeScale,
        gradeStructure: addGradeCompositionDto.gradeStructureId,
      });

      gradeStructureDocument.gradeComposition.push(gradeComposition._id.toString());
      gradeStructureDocument.save();

      return gradeComposition;
    } catch (error) {
      console.error('Error adding grade composition:', error.message);
      throw error;
    }
  }

  async updateGradeComposition(updateGradeCompositionDto: UpdateGradeCompositionDto) {
    try {
      const updatedGradeComposition = await this.gradeCompositionModel
        .findByIdAndUpdate(updateGradeCompositionDto.id, 
        {
          name: updateGradeCompositionDto.name,
          gradeScale: updateGradeCompositionDto.gradeScale,
        }, 
        { new: true })
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
}
