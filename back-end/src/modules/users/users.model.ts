import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  fullname: String,
  gender: String,
  dob: Date,
  phone: String,
  address: String,
  deletedAt: Date,
  createdAt: Date,
  updatedAt: Date,
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
  deletedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}
