import * as mongoose from 'mongoose';

export const ClassSchema = new mongoose.Schema({
  name: { type: String, required: true },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  students: [
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      role: { type: mongoose.Schema.Types.ObjectId, ref: 'Role' },
    },
  ],
  teachers: [
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      role: { type: mongoose.Schema.Types.ObjectId, ref: 'Role' },
    },
  ],
  gradeComposition: [{ type: mongoose.Schema.Types.ObjectId, ref: 'GradeComposition' }],
  deletedAt: { type: Date, default: null }, // Set default value for deletedAt
  createdAt: { type: Date, default: Date.now }, // Set default value for createdAt to the current date and time
  updatedAt: { type: Date, default: Date.now },
});

export interface ClassModel {
  id: string;
  name: string;
  owner: string;
  students: { user: string; role: string }[];
  teachers: { user: string; role: string }[];
  gradeComposition: string[];
  deletedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

export const ClassModel = mongoose.model<ClassModel>('Class', ClassSchema);
