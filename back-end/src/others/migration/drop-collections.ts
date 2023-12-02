import { RoleModel } from '../../modules/role/role.model';
// migration-script.ts
import { connect, connection } from 'mongoose';

async function runMigration() {
  try {
    await connect('mongodb+srv://admin1:admin1@cluster0.1npefek.mongodb.net/midterm');
    await connection.db.dropCollection('roles');
    await connection.db.dropCollection('users');
    await connection.db.dropCollection('classes');
  } catch (error) {
    console.error('Migration error:', error);
  } finally {
    // Close the connection
    await connection.close();
  }
}

runMigration();
