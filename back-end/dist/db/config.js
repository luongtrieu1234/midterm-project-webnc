"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
const config_1 = require("../config");
dotenv_1.default.config();
module.exports = config_1.default.database();
//# sourceMappingURL=config.js.map