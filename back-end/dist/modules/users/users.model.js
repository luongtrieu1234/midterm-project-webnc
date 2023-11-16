"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSchema = void 0;
const mongoose = require("mongoose");
exports.UserSchema = new mongoose.Schema({
    email: { type: String, required: true },
    password: { type: String, required: true },
    fullname: String,
    gender: String,
    dob: Date,
    phone: String,
    address: String,
    deletedAt: Date,
    createdAt: Date,
    updatedAt: Date,
});
//# sourceMappingURL=users.model.js.map