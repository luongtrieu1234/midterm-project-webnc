import { Model } from 'sequelize-typescript';
export declare class User extends Model<User> {
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
