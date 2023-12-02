import * as mongoose from 'mongoose';

export const RoleSchema = new mongoose.Schema({
  name: { type: String },
});

export interface RoleModel {
  id: string;
  name: string;
}

export const RoleModel = mongoose.model<RoleModel>('Role', RoleSchema);
