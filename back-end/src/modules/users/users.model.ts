import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, default: null },
  fullname: { type: String, default: '' }, // Set default value for fullname
  gender: { type: String, default: '' }, // Set default value for gender
  dob: { type: Date, default: null }, // Set default value for dob (you can set it to a specific date if needed)
  phone: { type: String, default: '' }, // Set default value for phone
  address: { type: String, default: '' }, // Set default value for address
  job: { type: String, default: '' }, // Set default value for job
  active: { type: Boolean, default: false }, // Set default value for job
  hobby: { type: [String], default: [] }, // Set default value for hobby
  roles: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
  deletedAt: { type: Date, default: null }, // Set default value for deletedAt
  createdAt: { type: Date, default: Date.now }, // Set default value for createdAt to the current date and time
  updatedAt: { type: Date, default: Date.now },
});

export interface UserModel {
  id: string;
  email: string;
  password: string;
  fullname: string;
  gender: string;
  dob: Date;
  phone: string;
  address: string;
  job: string;
  active: boolean;
  hobby: string[];
  roles: string;
  deletedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

export const UserModel = mongoose.model<UserModel>('User', UserSchema);
