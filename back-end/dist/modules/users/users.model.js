"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSchema = void 0;
const mongoose = require("mongoose");
exports.UserSchema = new mongoose.Schema({
    email: { type: String, required: true },
    password: { type: String, required: true },
    fullname: { type: String, default: '' },
    gender: { type: String, default: '' },
    dob: { type: Date, default: null },
    phone: { type: String, default: '' },
    address: { type: String, default: '' },
    job: { type: String, default: '' },
    hobby: { type: [String], default: [] },
    deletedAt: { type: Date, default: null },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});
//# sourceMappingURL=users.model.js.map