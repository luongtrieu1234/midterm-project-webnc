import * as mongoose from 'mongoose';

export const ClassSchema = new mongoose.Schema({
  name: { type: String },
  students: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  teachers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
});

export interface ClassModel {
  id: string;
  name: string;
  students: string[];
  teachers: string[];
}

export const ClassModel = mongoose.model<ClassModel>('Class', ClassSchema);
