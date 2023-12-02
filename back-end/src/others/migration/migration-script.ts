import { RoleModel } from '../../modules/role/role.model';
// migration-script.ts
import { connect, connection } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { UserModel } from '../../modules/users/users.model';

async function runMigration() {
  try {
    await connect('mongodb+srv://admin1:admin1@cluster0.1npefek.mongodb.net/midterm');
    await connection.db.dropCollection('roles');
    await connection.db.dropCollection('users');
    await RoleModel.createCollection();
    await UserModel.createCollection();
    const rolesData = [
      { name: 'Admin' },
      { name: 'Teacher' },
      { name: 'Student' },
      // add more user data as needed
    ];
    const role1 = await RoleModel.create({ name: 'Admin' });
    const role2 = await RoleModel.create({ name: 'Teacher' });
    const role3 = await RoleModel.create({ name: 'Student' });

    const hashedPassword1 = await bcrypt.hash('admin', 12);
    const hashedPassword2 = await bcrypt.hash('teacher', 12);
    const hashedPassword3 = await bcrypt.hash('student', 12);

    const usersData = [
      {
        fullname: 'Admin',
        email: 'admin@admin.com',
        password: hashedPassword1,
        roles: [role1._id],
      },
      {
        fullname: 'Teacher',
        email: 'teacher@teacher.com',
        password: hashedPassword2,
        roles: [role2._id],
      },
      {
        fullname: 'Student',
        email: 'student@student.com',
        password: hashedPassword3,
        roles: [role3._id],
      },
      // add more user data as needed
    ];

    // const createdRoles = await RoleModel.create(rolesData);
    const createdUsers = await UserModel.create(usersData);
    // Perform data transformations using UserModel
    // Example: UserModel.updateMany({/* your query */}, {/* update fields */});
    // console.log('Multiple roles created:', createdRoles);
    console.log('Multiple users created:', createdUsers);
  } catch (error) {
    console.error('Migration error:', error);
  } finally {
    // Close the connection
    await connection.close();
  }
}

runMigration();
