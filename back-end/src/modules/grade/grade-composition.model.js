"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GradeCompositionModel = exports.GradeCompositionSchema = void 0;
var mongoose = require("mongoose");
exports.GradeCompositionSchema = new mongoose.Schema({
    class: { type: mongoose.Schema.Types.ObjectId, ref: 'Class' },
    // gradeStructure: { type: mongoose.Schema.Types.ObjectId, ref: 'GradeStructure' },
    grades: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Grade' }],
    name: { type: String },
    gradeScale: { type: Number },
    position: { type: Number },
    content: { type: String, default: '' },
    isFinal: { type: Boolean, default: false },
});
exports.GradeCompositionModel = mongoose.model('GradeComposition', exports.GradeCompositionSchema);
