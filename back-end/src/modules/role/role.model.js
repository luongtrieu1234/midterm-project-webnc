"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoleModel = exports.RoleSchema = void 0;
var mongoose = require("mongoose");
exports.RoleSchema = new mongoose.Schema({
    name: { type: String },
});
exports.RoleModel = mongoose.model('Role', exports.RoleSchema);
