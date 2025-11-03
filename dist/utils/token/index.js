"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.generateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dev_config_1 = require("../../config/dev.config");
const generateToken = ({ payload, secretKey = dev_config_1.devConfig.JWT_SECRET, options, }) => {
    return jsonwebtoken_1.default.sign(payload, secretKey, options);
};
exports.generateToken = generateToken;
// verify token
const verifyToken = ({ token, secretKey = dev_config_1.devConfig.JWT_SECRET, }) => {
    // any payload from type JwtPayload can it have any key from type string and value from type any
    return jsonwebtoken_1.default.verify(token, secretKey); // use JwtPayload after customise it becuse it have id and role of user
};
exports.verifyToken = verifyToken;
