import * as mongoose from 'mongoose';

export const GradeCompositionSchema = new mongoose.Schema({
  class: { type: mongoose.Schema.Types.ObjectId, ref: 'Class' },
  gradeStructure: { type: mongoose.Schema.Types.ObjectId, ref: 'GradeStructure' },
  grades: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Grade' }],
  name: { type: String },
  gradeScale: { type: Number },
});

export interface GradeCompositionModel {
  id: string;
  class: string;
  gradeStructure: string;
  grade: string[];
  name: string;
  gradeScale: number;
}

export const GradeCompositionModel = mongoose.model<GradeCompositionModel>('GradeComposition', GradeCompositionSchema);
