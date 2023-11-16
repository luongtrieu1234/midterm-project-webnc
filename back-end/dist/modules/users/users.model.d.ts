import * as mongoose from 'mongoose';
export declare const UserSchema: mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    email: string;
    password: string;
    fullname?: string;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
    gender?: string;
    dob?: Date;
    phone?: string;
    address?: string;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    email: string;
    password: string;
    fullname?: string;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
    gender?: string;
    dob?: Date;
    phone?: string;
    address?: string;
}>> & mongoose.FlatRecord<{
    email: string;
    password: string;
    fullname?: string;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
    gender?: string;
    dob?: Date;
    phone?: string;
    address?: string;
}> & {
    _id: mongoose.Types.ObjectId;
}>;
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
