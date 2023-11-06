import {
  AllowNull,
  BelongsTo,
  Column,
  CreatedAt,
  DataType,
  Default,
  DeletedAt,
  HasMany,
  Model,
  Table,
  Unique,
  UpdatedAt,
} from 'sequelize-typescript';

@Table({
  tableName: 'users',
})
export class User extends Model<User> {
  @Column({
    field: 'id',
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  id: string;

  @AllowNull(false)
  @Unique
  @Column
  email: string;

  @AllowNull(false)
  @Column
  password: string;

  // @AllowNull(false)
  @Column({ field: 'full_name' })
  fullname: string;

  @Column({ field: 'gender' })
  gender: string;

  @Column({ field: 'dob' })
  dob: Date;

  @Column({ field: 'phone' })
  phone: string;

  @Column({ field: 'address' })
  address: string;

  @DeletedAt
  @Column({ field: 'deleted_at' })
  deletedAt: Date;

  @CreatedAt
  @Default(new Date())
  @Column({ field: 'created_at' })
  createdAt: Date;

  @UpdatedAt
  @Column({ field: 'updated_at' })
  updatedAt: Date;
}
