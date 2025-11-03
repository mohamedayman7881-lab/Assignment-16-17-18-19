"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.compareHash = exports.generateHash = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
// use hash not hashSync becuse hashSync run in main thread and if tow user make register one wait one
const generateHash = async (plainText) => {
    return await bcryptjs_1.default.hash(plainText, 10);
};
exports.generateHash = generateHash;
const compareHash = async (password, hashPassword) => {
    return await bcryptjs_1.default.compare(password, hashPassword);
};
exports.compareHash = compareHash;
