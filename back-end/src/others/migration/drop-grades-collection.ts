// migration-script.ts
import { connect, connection } from 'mongoose';
import { GradeModel } from '~/modules/grade/grade.model';

async function runMigration() {
  try {
    await connect(`${process.env.DATABASE_URL}/${process.env.DATABASE_NAME}`);
    await connection.db.dropCollection('grades');
    await GradeModel.createCollection();
  } catch (error) {
    console.error('Migration error:', error);
  } finally {
    // Close the connection
    await connection.close();
  }
}

runMigration();
