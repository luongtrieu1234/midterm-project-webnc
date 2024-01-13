import * as mongoose from 'mongoose';

export enum NotificationType {
  TEACHER_FINALIZES_GRADE = 'teacher_finalizes_grade',
  TEACHER_REPLIES_TO_REVIEW = 'teacher_replies_to_review',
  TEACHER_CREATES_FINAL_DECISION = 'teacher_creates_final_decision',
  STUDENT_REQUESTS_REVIEW = 'student_requests_review',
  STUDENT_REPLIES_TO_REVIEW = 'student_replies_to_review',
}

export const NotificationSchema = new mongoose.Schema({
  type: { type: String, enum: Object.values(NotificationType), required: true },
  recipient: { type: mongoose.Types.ObjectId, ref: 'User', required: true },
  // relatedClass: { type: mongoose.Types.ObjectId, ref: 'Class', required: true },
  // relatedGradeComposition: { type: mongoose.Types.ObjectId, ref: 'GradeComposition' },
  // relatedGradeReview: { type: mongoose.Types.ObjectId, ref: 'GradeReview' },
  relatedGrade: { type: mongoose.Types.ObjectId, ref: 'Grade' },
  message: { type: String, required: true },
  read: { type: Boolean, default: false },
  currentPath: { type: String, default: '' },
  deletedAt: { type: Date, default: null }, // Set default value for deletedAt
  createdAt: { type: Date, default: Date.now }, // Set default value for createdAt to the current date and time
  updatedAt: { type: Date, default: Date.now },
});

export interface NotificationModel {
  id: string;
  type: NotificationType;
  recipient: mongoose.Types.ObjectId; // Reference to User model
  // relatedClass: mongoose.Types.ObjectId; // Reference to Class model
  // relatedGradeComposition?: mongoose.Types.ObjectId; // Reference to GradeComposition model
  // relatedGradeReview?: mongoose.Types.ObjectId; // Reference to GradeReview model
  relatedGrade?: mongoose.Types.ObjectId; // Reference to Grade model
  message: string;
  read: boolean;
  currentPath: string;
  deletedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

export const NotificationModel = mongoose.model<NotificationModel>(
  'Notification',
  NotificationSchema,
);
