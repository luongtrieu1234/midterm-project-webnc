"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GradeStructureModel = exports.GradeStructureSchema = void 0;
var mongoose = require("mongoose");
exports.GradeStructureSchema = new mongoose.Schema({
    name: { type: String },
    gradeComposition: [{ type: mongoose.Schema.Types.ObjectId, ref: 'GradeComposition' }],
});
exports.GradeStructureModel = mongoose.model('GradeStructure', exports.GradeStructureSchema);
