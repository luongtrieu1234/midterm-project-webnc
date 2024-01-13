import * as mongoose from 'mongoose';

export const ClassSchema = new mongoose.Schema({
  name: { type: String, required: true },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  students: [
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      classRole: { type: String, default: 'student' },
      studentId: { type: String, default: '' },
    },
  ],
  studentIds: [
    {
      id: { type: String },
      user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    },
  ],
  teachers: [
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      classRole: { type: String, default: 'teacher' },
    },
  ],
  gradeComposition: [{ type: mongoose.Schema.Types.ObjectId, ref: 'GradeComposition' }],
  classCode: { type: String },
  active: { type: Boolean, default: true },
  description: { type: String, default: '' },
  deletedAt: { type: Date, default: null },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export interface ClassModel {
  id: string;
  name: string;
  owner: string;
  students: { user: string; classRole: string }[];
  teachers: { user: string; classRole: string }[];
  gradeComposition: string[];
  classCode: string;
  active: boolean;
  description: string;
  deletedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

export const ClassModel = mongoose.model<ClassModel>('Class', ClassSchema);
