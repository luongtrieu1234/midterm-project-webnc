"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationModel = exports.NotificationSchema = exports.NotificationType = void 0;
var mongoose = require("mongoose");
var NotificationType;
(function (NotificationType) {
    NotificationType["TEACHER_FINALIZES_GRADE"] = "teacher_finalizes_grade";
    NotificationType["TEACHER_REPLIES_TO_REVIEW"] = "teacher_replies_to_review";
    NotificationType["TEACHER_CREATES_FINAL_DECISION"] = "teacher_creates_final_decision";
    NotificationType["STUDENT_REQUESTS_REVIEW"] = "student_requests_review";
    NotificationType["STUDENT_REPLIES_TO_REVIEW"] = "student_replies_to_review";
})(NotificationType || (exports.NotificationType = NotificationType = {}));
exports.NotificationSchema = new mongoose.Schema({
    type: { type: String, enum: Object.values(NotificationType), required: true },
    recipient: { type: mongoose.Types.ObjectId, ref: 'User', required: true },
    // relatedClass: { type: mongoose.Types.ObjectId, ref: 'Class', required: true },
    // relatedGradeComposition: { type: mongoose.Types.ObjectId, ref: 'GradeComposition' },
    // relatedGradeReview: { type: mongoose.Types.ObjectId, ref: 'GradeReview' },
    relatedGrade: { type: mongoose.Types.ObjectId, ref: 'Grade' },
    message: { type: String, required: true },
    read: { type: Boolean, default: false },
    deletedAt: { type: Date, default: null },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});
exports.NotificationModel = mongoose.model('Notification', exports.NotificationSchema);
