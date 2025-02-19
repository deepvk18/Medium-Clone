"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateblogInput = exports.blogInput = exports.signInInput = exports.signUpInput = void 0;
const zod_1 = __importDefault(require("zod"));
exports.signUpInput = zod_1.default.object({
    email: zod_1.default.string().email(),
    password: zod_1.default.string(),
    name: zod_1.default.string().optional()
});
exports.signInInput = zod_1.default.object({
    email: zod_1.default.string().email(),
    password: zod_1.default.string()
});
exports.blogInput = zod_1.default.object({
    title: zod_1.default.string(),
    content: zod_1.default.string()
});
exports.updateblogInput = zod_1.default.object({
    title: zod_1.default.string(),
    content: zod_1.default.string(),
    id: zod_1.default.string()
});
