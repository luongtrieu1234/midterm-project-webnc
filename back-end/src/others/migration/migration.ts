// migration-script.ts
import { connect, connection } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { UserModel } from '../../modules/users/users.model';
import { RoleModel } from '../../modules/role/role.model';
import { ClassModel } from '../../modules/class/class.model';
import { GradeCompositionModel } from '../../modules/grade/grade-composition.model';
import { GradeModel } from '../../modules/grade/grade.model';
import { config } from 'dotenv';
import { GradeStructureModel } from '../../modules/grade/grade-structure.model';
config();
async function runMigration() {
  try {
    console.log('Connecting to database...', process.env.DATABASE_URL, process.env.DATABASE_NAME);
    await connect(`${process.env.DATABASE_URL}/${process.env.DATABASE_NAME}`);
    await RoleModel.createCollection();
    await UserModel.createCollection();
    await ClassModel.createCollection();
    await GradeStructureModel.createCollection();
    await GradeCompositionModel.createCollection();
    await GradeModel.createCollection();

    const hashedPassword1 = await bcrypt.hash('adminaccount', 12);

    const usersData = [
      {
        fullname: 'Admin',
        email: 'admin@gmail.com',
        password: hashedPassword1,
        role: 'admin',
        active: true,
      },
    ];

    const createdUser = await UserModel.create(usersData);
    console.log('Admin user created:', createdUser);
  } catch (error) {
    console.error('Migration error:', error);
  } finally {
    // Close the connection
    console.log('Closing connection...');
    await connection.close();
  }
}

runMigration();
