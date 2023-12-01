import * as mongoose from 'mongoose';

export const GradeSchema = new mongoose.Schema({
  point: { type: String },
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  class: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

export interface GradeModel {
  id: string;
  name: string;
  student: string[];
  class: string[];
}

export const GradeModel = mongoose.model<GradeModel>('Grade', GradeSchema);
