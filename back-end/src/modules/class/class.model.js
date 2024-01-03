"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClassModel = exports.ClassSchema = void 0;
var mongoose = require("mongoose");
exports.ClassSchema = new mongoose.Schema({
    name: { type: String, required: true },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    students: [
        {
            user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
            classRole: { type: String, default: 'student' },
            studentId: { type: String, default: '' },
        },
    ],
    studentIds: [
        {
            id: { type: String },
            user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        },
    ],
    teachers: [
        {
            user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
            classRole: { type: String, default: 'teacher' },
        },
    ],
    gradeComposition: [{ type: mongoose.Schema.Types.ObjectId, ref: 'GradeComposition' }],
    classCode: { type: String },
    active: { type: Boolean, default: true },
    deletedAt: { type: Date, default: null },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});
exports.ClassModel = mongoose.model('Class', exports.ClassSchema);
