"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = exports.UserSchema = void 0;
var mongoose = require("mongoose");
exports.UserSchema = new mongoose.Schema({
    email: { type: String, required: true },
    password: { type: String, default: null },
    fullname: { type: String, default: '' },
    gender: { type: String, default: '' },
    dob: { type: String, default: '' },
    phone: { type: String, default: '' },
    address: { type: String, default: '' },
    job: { type: String, default: '' },
    active: { type: Boolean, default: false },
    hobby: { type: [String], default: [] },
    role: { type: String, default: 'user' },
    studentId: { type: String, default: '' },
    notifications: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Notification' }],
    deletedAt: { type: Date, default: null },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});
exports.UserModel = mongoose.model('User', exports.UserSchema);
