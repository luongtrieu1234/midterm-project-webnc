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
// migration-script.ts
var mongoose_1 = require("mongoose");
var bcrypt = require("bcrypt");
var users_model_1 = require("../../modules/users/users.model");
var role_model_1 = require("../../modules/role/role.model");
var class_model_1 = require("../../modules/class/class.model");
var grade_composition_model_1 = require("../../modules/grade/grade-composition.model");
var grade_model_1 = require("../../modules/grade/grade.model");
var dotenv_1 = require("dotenv");
var grade_structure_model_1 = require("../../modules/grade/grade-structure.model");
var comment_model_1 = require("../../modules/grade/comment.model");
var notification_model_1 = require("../../modules/notification/notification.model");
(0, dotenv_1.config)();
function runMigration() {
    return __awaiter(this, void 0, void 0, function () {
        var hashedPassword1, hashedPassword2, hashedPassword3, hashedPassword4, usersData, createdUser, student, teacher, classesData, createdClass, classDocument, gradeCompositionData, createdGradeComposition, gradeCompositionDocument, gradeData, createdGrade, gradeDocument, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 25, 26, 28]);
                    console.log('Connecting to database...', process.env.DATABASE_URL, process.env.DATABASE_NAME);
                    return [4 /*yield*/, (0, mongoose_1.connect)("".concat(process.env.DATABASE_URL, "/").concat(process.env.DATABASE_NAME))];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, role_model_1.RoleModel.createCollection()];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, users_model_1.UserModel.createCollection()];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, class_model_1.ClassModel.createCollection()];
                case 4:
                    _a.sent();
                    return [4 /*yield*/, grade_structure_model_1.GradeStructureModel.createCollection()];
                case 5:
                    _a.sent();
                    return [4 /*yield*/, grade_composition_model_1.GradeCompositionModel.createCollection()];
                case 6:
                    _a.sent();
                    return [4 /*yield*/, grade_model_1.GradeModel.createCollection()];
                case 7:
                    _a.sent();
                    return [4 /*yield*/, comment_model_1.CommentModel.createCollection()];
                case 8:
                    _a.sent();
                    return [4 /*yield*/, notification_model_1.NotificationModel.createCollection()];
                case 9:
                    _a.sent();
                    return [4 /*yield*/, bcrypt.hash('adminaccount', 12)];
                case 10:
                    hashedPassword1 = _a.sent();
                    return [4 /*yield*/, bcrypt.hash('teacher', 12)];
                case 11:
                    hashedPassword2 = _a.sent();
                    return [4 /*yield*/, bcrypt.hash('student', 12)];
                case 12:
                    hashedPassword3 = _a.sent();
                    return [4 /*yield*/, bcrypt.hash('useraccount', 12)];
                case 13:
                    hashedPassword4 = _a.sent();
                    usersData = [
                        {
                            fullname: 'Admin',
                            email: 'admin@admin.com',
                            password: hashedPassword1,
                            role: 'admin',
                            active: true,
                        },
                        {
                            fullname: 'User',
                            email: 'user@user.com',
                            password: hashedPassword4,
                            roles: 'user',
                            active: true,
                        },
                        {
                            fullname: 'Teacher',
                            email: 'teacher@teacher.com',
                            password: hashedPassword2,
                            roles: 'user',
                            active: true,
                        },
                        {
                            fullname: 'Student',
                            email: 'student@student.com',
                            password: hashedPassword3,
                            roles: 'user',
                            active: true,
                        },
                    ];
                    return [4 /*yield*/, users_model_1.UserModel.create(usersData)];
                case 14:
                    createdUser = _a.sent();
                    console.log('Users created:', createdUser);
                    return [4 /*yield*/, users_model_1.UserModel.findOne({ email: 'student@student.com' })];
                case 15:
                    student = _a.sent();
                    return [4 /*yield*/, users_model_1.UserModel.findOne({ email: 'teacher@teacher.com' })];
                case 16:
                    teacher = _a.sent();
                    classesData = [
                        {
                            name: 'Class 1',
                            code: '123456',
                            owner: teacher._id.toString(),
                            students: [
                                {
                                    user: student._id.toString(),
                                },
                            ],
                            teachers: [
                                {
                                    user: teacher._id.toString(),
                                },
                            ],
                        },
                    ];
                    return [4 /*yield*/, class_model_1.ClassModel.create(classesData)];
                case 17:
                    createdClass = _a.sent();
                    console.log('Class created:', createdClass);
                    return [4 /*yield*/, class_model_1.ClassModel.findOne({ name: 'Class 1' })];
                case 18:
                    classDocument = _a.sent();
                    gradeCompositionData = [
                        {
                            class: classDocument._id.toString(),
                            name: 'Composition 1 Class 1',
                            gradeScale: 10,
                            position: 1,
                            content: 'Content Composition 1 Class 1',
                            isFinal: false,
                        },
                    ];
                    return [4 /*yield*/, grade_composition_model_1.GradeCompositionModel.create(gradeCompositionData)];
                case 19:
                    createdGradeComposition = _a.sent();
                    console.log('Grade composition created:', createdGradeComposition);
                    return [4 /*yield*/, grade_composition_model_1.GradeCompositionModel.findOne({
                            name: 'Composition 1 Class 1',
                        })];
                case 20:
                    gradeCompositionDocument = _a.sent();
                    classDocument.gradeComposition.push(gradeCompositionDocument._id.toString());
                    return [4 /*yield*/, classDocument.save()];
                case 21:
                    _a.sent();
                    gradeData = [
                        {
                            value: 10,
                            name: 'Grade 1 Composition 1 Class 1',
                            gradeComposition: gradeCompositionDocument._id.toString(),
                            student: student._id.toString(),
                            class: classDocument._id.toString(),
                            requestReview: false,
                        },
                    ];
                    return [4 /*yield*/, grade_model_1.GradeModel.create(gradeData)];
                case 22:
                    createdGrade = _a.sent();
                    console.log('Grade created:', createdGrade);
                    return [4 /*yield*/, grade_model_1.GradeModel.findOne({ name: 'Grade 1 Composition 1 Class 1' })];
                case 23:
                    gradeDocument = _a.sent();
                    gradeCompositionDocument.grades.push(gradeDocument._id.toString());
                    return [4 /*yield*/, gradeCompositionDocument.save()];
                case 24:
                    _a.sent();
                    return [3 /*break*/, 28];
                case 25:
                    error_1 = _a.sent();
                    console.error('Migration error:', error_1);
                    return [3 /*break*/, 28];
                case 26:
                    // Close the connection
                    console.log('Closing connection...');
                    return [4 /*yield*/, mongoose_1.connection.close()];
                case 27:
                    _a.sent();
                    return [7 /*endfinally*/];
                case 28: return [2 /*return*/];
            }
        });
    });
}
runMigration();
