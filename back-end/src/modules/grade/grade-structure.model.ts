import * as mongoose from 'mongoose';

export const GradeStructureSchema = new mongoose.Schema({
  name: { type: String },
  gradeComposition: [{ type: mongoose.Schema.Types.ObjectId, ref: 'GradeComposition' }],
});

export interface GradeStructureModel {
  name: string;
  gradeComposition: string[];
}

export const GradeStructureModel = mongoose.model<GradeStructureModel>('GradeStructure', GradeStructureSchema);
