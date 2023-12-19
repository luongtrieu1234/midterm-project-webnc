import * as mongoose from 'mongoose';

export const GradeSchema = new mongoose.Schema({
  value: { type: Number },
  gradeComposition: { type: mongoose.Schema.Types.ObjectId, ref: 'GradeComposition' },
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

export interface GradeModel {
  id: string;
  value: number;
  gradeComposition: string;
  student: string;
}

export const GradeModel = mongoose.model<GradeModel>('Grade', GradeSchema);
