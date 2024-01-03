// migration-script.ts
import { connect, connection } from 'mongoose';
import { GradeCompositionModel } from '~/modules/grade/grade-composition.model';

async function runMigration() {
  try {
    await connect(`${process.env.DATABASE_URL}/${process.env.DATABASE_NAME}`);
    await connection.db.dropCollection('grades');
    await GradeCompositionModel.createCollection();
  } catch (error) {
    console.error('Migration error:', error);
  } finally {
    // Close the connection
    await connection.close();
  }
}

runMigration();
