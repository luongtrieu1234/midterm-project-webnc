import * as mongoose from 'mongoose';
export declare const UserSchema: mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    fullname: string;
    gender: string;
    dob: Date;
    phone: string;
    address: string;
    job: string;
    hobby: string[];
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
    email: string;
    password: string;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    fullname: string;
    gender: string;
    dob: Date;
    phone: string;
    address: string;
    job: string;
    hobby: string[];
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
    email: string;
    password: string;
}>> & mongoose.FlatRecord<{
    fullname: string;
    gender: string;
    dob: Date;
    phone: string;
    address: string;
    job: string;
    hobby: string[];
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
    email: string;
    password: string;
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
    job: string;
    hobby: string[];
    deletedAt: Date;
    createdAt: Date;
    updatedAt: Date;
}
