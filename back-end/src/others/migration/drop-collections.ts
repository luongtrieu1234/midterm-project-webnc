import { RoleModel } from '../../modules/role/role.model';
// migration-script.ts
import { connect, connection } from 'mongoose';
import { config } from 'dotenv';
config();
async function runMigration() {
  try {
    await connect(`${process.env.DATABASE_URL}/${process.env.DATABASE_NAME}`);
    await connection.db.dropCollection('roles');
    await connection.db.dropCollection('users');
    await connection.db.dropCollection('classes');
    await connection.db.dropCollection('gradestructures');
    await connection.db.dropCollection('gradecompositions');
    await connection.db.dropCollection('grades');
    await connection.db.dropCollection('comments');
    await connection.db.dropCollection('notifications');
  } catch (error) {
    console.error('Migration error:', error);
  } finally {
    // Close the connection
    console.log('Closing connection...');
    await connection.close();
  }
}

runMigration();
