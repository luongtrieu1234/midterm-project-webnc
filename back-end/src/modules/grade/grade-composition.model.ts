import * as mongoose from 'mongoose';

export const GradeCompositionSchema = new mongoose.Schema({
  class: { type: mongoose.Schema.Types.ObjectId, ref: 'Class' },
  // gradeStructure: { type: mongoose.Schema.Types.ObjectId, ref: 'GradeStructure' },
  grades: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Grade' }],
  name: { type: String },
  gradeScale: { type: Number },
  position: { type: Number },
  content: { type: String, default: '' },
  isFinal: { type: Boolean, default: false },
});

export interface GradeCompositionModel {
  id: string;
  class: string;
  // gradeStructure: string;
  grades: string[];
  name: string;
  gradeScale: number;
  position: number;
  content: string;
  isFinal: boolean;
}

export const GradeCompositionModel = mongoose.model<GradeCompositionModel>(
  'GradeComposition',
  GradeCompositionSchema,
);
