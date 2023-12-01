"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = exports.UserSchema = void 0;
var mongoose = require("mongoose");
exports.UserSchema = new mongoose.Schema({
    email: { type: String, required: true },
    password: { type: String, default: null },
    fullname: { type: String, default: '' },
    gender: { type: String, default: '' },
    dob: { type: Date, default: null },
    phone: { type: String, default: '' },
    address: { type: String, default: '' },
    job: { type: String, default: '' },
    hobby: { type: [String], default: [] },
    roles: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    deletedAt: { type: Date, default: null },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});
exports.UserModel = mongoose.model('User', exports.UserSchema);
