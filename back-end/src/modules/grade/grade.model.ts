import * as mongoose from 'mongoose';

export const GradeSchema = new mongoose.Schema({
  value: { type: Number },
});

export interface GradeModel {
  id: string;
  value: number,
}

export const GradeModel = mongoose.model<GradeModel>('Grade', GradeSchema);
