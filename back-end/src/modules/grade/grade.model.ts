import * as mongoose from 'mongoose';

export const GradeSchema = new mongoose.Schema({
  point: { type: Number },
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  class: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

export interface GradeModel {
  id: number;
  point: string;
  student: string[];
  class: string[];
}

export const GradeModel = mongoose.model<GradeModel>('Grade', GradeSchema);
