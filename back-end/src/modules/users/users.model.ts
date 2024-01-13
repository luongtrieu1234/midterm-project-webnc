import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, default: null },
  fullname: { type: String, default: '' },
  gender: { type: String, default: '' },
  dob: { type: String, default: '' },
  phone: { type: String, default: '' },
  address: { type: String, default: '' },
  job: { type: String, default: '' },
  active: { type: Boolean, default: false },
  hobby: { type: [String], default: [] },
  role: { type: String, default: 'user' },
  studentId: { type: String, default: '' },
  notifications: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Notification' }],
  deletedAt: { type: Date, default: null },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export interface UserModel {
  id: string;
  email: string;
  password: string;
  fullname: string;
  gender: string;
  dob: string;
  phone: string;
  address: string;
  job: string;
  active: boolean;
  hobby: string[];
  role: string;
  studentId: string;
  notifications: string[];
  deletedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

export const UserModel = mongoose.model<UserModel>('User', UserSchema);
