import * as mongoose from 'mongoose';

export const GradeSchema = new mongoose.Schema({
  value: { type: Number },
  name: { type: String },
  gradeComposition: { type: mongoose.Schema.Types.ObjectId, ref: 'GradeComposition' },
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  class: { type: mongoose.Schema.Types.ObjectId, ref: 'Class' },
  requestReview: { type: Boolean, default: false },
  expectedGrade: { type: Number },
  explanation: { type: String, default: '' },
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
  finalDecision: { type: Boolean, default: false },
});

export interface GradeModel {
  id: string;
  value: number;
  name: string;
  gradeComposition: string;
  student: string;
  class: string;
  requestReview: boolean;
  expectedGrade: number;
  explanation: string;
  comments: string[];
  finalDecision: boolean;
}

export const GradeModel = mongoose.model<GradeModel>('Grade', GradeSchema);
