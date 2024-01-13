"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentModel = exports.CommentSchema = void 0;
var mongoose = require("mongoose");
exports.CommentSchema = new mongoose.Schema({
    content: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    order: { type: Number, required: true, default: 0 },
    date: { type: Date, default: Date.now },
});
exports.CommentModel = mongoose.model('Comment', exports.CommentSchema);
