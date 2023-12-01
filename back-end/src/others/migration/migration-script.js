"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var role_model_1 = require("../../modules/role/role.model");
// migration-script.ts
var mongoose_1 = require("mongoose");
var bcrypt = require("bcrypt");
var users_model_1 = require("../../modules/users/users.model");
function runMigration() {
    return __awaiter(this, void 0, void 0, function () {
        var rolesData, role1, role2, role3, hashedPassword1, hashedPassword2, hashedPassword3, usersData, createdUsers, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 13, 14, 16]);
                    return [4 /*yield*/, (0, mongoose_1.connect)('mongodb+srv://admin1:admin1@cluster0.1npefek.mongodb.net/midterm')];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, mongoose_1.connection.db.dropCollection('roles')];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, mongoose_1.connection.db.dropCollection('users')];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, role_model_1.RoleModel.createCollection()];
                case 4:
                    _a.sent();
                    return [4 /*yield*/, users_model_1.UserModel.createCollection()];
                case 5:
                    _a.sent();
                    rolesData = [
                        { name: 'Admin' },
                        { name: 'Teacher' },
                        { name: 'Student' },
                        // add more user data as needed
                    ];
                    return [4 /*yield*/, role_model_1.RoleModel.create({ name: 'Admin' })];
                case 6:
                    role1 = _a.sent();
                    return [4 /*yield*/, role_model_1.RoleModel.create({ name: 'Teacher' })];
                case 7:
                    role2 = _a.sent();
                    return [4 /*yield*/, role_model_1.RoleModel.create({ name: 'Student' })];
                case 8:
                    role3 = _a.sent();
                    return [4 /*yield*/, bcrypt.hash('admin', 12)];
                case 9:
                    hashedPassword1 = _a.sent();
                    return [4 /*yield*/, bcrypt.hash('teacher', 12)];
                case 10:
                    hashedPassword2 = _a.sent();
                    return [4 /*yield*/, bcrypt.hash('student', 12)];
                case 11:
                    hashedPassword3 = _a.sent();
                    usersData = [
                        {
                            fullname: 'Admin',
                            email: 'admin@admin.com',
                            password: hashedPassword1,
                            roles: [role1._id],
                        },
                        {
                            fullname: 'Teacher',
                            email: 'teacher@teacher.com',
                            password: hashedPassword2,
                            roles: [role2._id],
                        },
                        {
                            fullname: 'Student',
                            email: 'student@student.com',
                            password: hashedPassword3,
                            roles: [role3._id],
                        },
                        // add more user data as needed
                    ];
                    return [4 /*yield*/, users_model_1.UserModel.create(usersData)];
                case 12:
                    createdUsers = _a.sent();
                    // Perform data transformations using UserModel
                    // Example: UserModel.updateMany({/* your query */}, {/* update fields */});
                    // console.log('Multiple roles created:', createdRoles);
                    console.log('Multiple users created:', createdUsers);
                    return [3 /*break*/, 16];
                case 13:
                    error_1 = _a.sent();
                    console.error('Migration error:', error_1);
                    return [3 /*break*/, 16];
                case 14: 
                // Close the connection
                return [4 /*yield*/, mongoose_1.connection.close()];
                case 15:
                    // Close the connection
                    _a.sent();
                    return [7 /*endfinally*/];
                case 16: return [2 /*return*/];
            }
        });
    });
}
runMigration();
