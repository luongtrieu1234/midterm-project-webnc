"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GradeModel = exports.GradeSchema = void 0;
var mongoose = require("mongoose");
exports.GradeSchema = new mongoose.Schema({
    value: { type: Number },
    name: { type: String },
    gradeComposition: { type: mongoose.Schema.Types.ObjectId, ref: 'GradeComposition' },
    student: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    class: { type: mongoose.Schema.Types.ObjectId, ref: 'Class' },
    requestReview: { type: Boolean, default: false },
    expectedGrade: { type: Number },
    explanation: { type: String },
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
    finalDecision: { type: Boolean, default: false },
});
exports.GradeModel = mongoose.model('Grade', exports.GradeSchema);
