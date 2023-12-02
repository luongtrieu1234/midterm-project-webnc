import * as mongoose from 'mongoose';

export const ClassSchema = new mongoose.Schema({
  name: { type: String, required: true },
  students: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  teachers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  grades: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Grade' }],
  deletedAt: { type: Date, default: null }, // Set default value for deletedAt
  createdAt: { type: Date, default: Date.now }, // Set default value for createdAt to the current date and time
  updatedAt: { type: Date, default: Date.now },
});

export interface ClassModel {
  id: string;
  name: string;
  students: string[];
  teachers: string[];
  grades: number[];
  deletedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

export const ClassModel = mongoose.model<ClassModel>('Class', ClassSchema);
