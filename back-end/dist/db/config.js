// "use strict";
// Object.defineProperty(exports, "__esModule", { value: true });
// const dotenv_1 = require("dotenv");
// const config_1 = require("../config");
// dotenv_1.default.config();
// module.exports = config_1.default.database();
// //# sourceMappingURL=config.js.map

'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const dotenv_1 = __importDefault(require('dotenv'));
const config_1 = __importDefault(require('../config'));
dotenv_1.default.config();
module.exports = config_1.default.database();
//# sourceMappingURL=config.js.map
