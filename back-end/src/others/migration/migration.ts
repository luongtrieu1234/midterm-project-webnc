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
import { CommentModel } from '../../modules/grade/comment.model';
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
    await CommentModel.createCollection();

    const hashedPassword1 = await bcrypt.hash('adminaccount', 12);
    const hashedPassword2 = await bcrypt.hash('teacher', 12);
    const hashedPassword3 = await bcrypt.hash('student', 12);
    const hashedPassword4 = await bcrypt.hash('useraccount', 12);
    const usersData = [
      {
        fullname: 'Admin',
        email: 'admin@admin.com',
        password: hashedPassword1,
        role: 'admin',
        active: true,
      },
      {
        fullname: 'User',
        email: 'user@user.com',
        password: hashedPassword4,
        roles: 'user',
        active: true,
      },
      {
        fullname: 'Teacher',
        email: 'teacher@teacher.com',
        password: hashedPassword2,
        roles: 'user',
        active: true,
      },
      {
        fullname: 'Student',
        email: 'student@student.com',
        password: hashedPassword3,
        roles: 'user',
        active: true,
      },
    ];
    const createdUser = await UserModel.create(usersData);
    console.log('Users created:', createdUser);
    const student = await UserModel.findOne({ email: 'student@student.com' });
    const teacher = await UserModel.findOne({ email: 'teacher@teacher.com' });
    const classesData = [
      {
        name: 'Class 1',
        code: '123456',
        students: [
          {
            user: student._id.toString(),
          },
        ],
        teachers: [
          {
            user: teacher._id.toString(),
          },
        ],
      },
    ];
    const createdClass = await ClassModel.create(classesData);
    console.log('Class created:', createdClass);
    const classDocument = await ClassModel.findOne({ name: 'Class 1' });
    const gradeCompositionData = [
      {
        class: classDocument._id.toString(),
        name: 'Composition 1 Class 1',
        gradeScale: 10,
        position: 1,
        content: 'Content Composition 1 Class 1',
        isFinal: false,
      },
    ];
    const createdGradeComposition = await GradeCompositionModel.create(gradeCompositionData);
    console.log('Grade composition created:', createdGradeComposition);
    const gradeCompositionDocument = await GradeCompositionModel.findOne({
      name: 'Composition 1 Class 1',
    });
    classDocument.gradeComposition.push(gradeCompositionDocument._id.toString());
    await classDocument.save();
    const gradeData = [
      {
        value: 10,
        name: 'Grade 1 Composition 1 Class 1',
        gradeComposition: gradeCompositionDocument._id.toString(),
        student: student._id.toString(),
        class: classDocument._id.toString(),
        requestReview: false,
      },
    ];
    const createdGrade = await GradeModel.create(gradeData);
    console.log('Grade created:', createdGrade);
    const gradeDocument = await GradeModel.findOne({ name: 'Grade 1 Composition 1 Class 1' });
    gradeCompositionDocument.grades.push(gradeDocument._id.toString());
    await gradeCompositionDocument.save();
  } catch (error) {
    console.error('Migration error:', error);
  } finally {
    // Close the connection
    console.log('Closing connection...');
    await connection.close();
  }
}

runMigration();
