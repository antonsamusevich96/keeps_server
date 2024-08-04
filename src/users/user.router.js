"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = __importDefault(require("./user.controller"));
const validate_1 = require("../utils/validate");
const user_schema_1 = require("./user.schema");
const authentication_1 = require("../utils/authentication");
const PATH = '/auth';
const userRouter = (0, express_1.Router)();
userRouter.post(PATH + '/registration', (0, validate_1.validate)(user_schema_1.authSchema), user_controller_1.default.registration);
userRouter.post(PATH + '/login', (0, validate_1.validate)(user_schema_1.authSchema), user_controller_1.default.login);
userRouter.get(PATH + '/me', authentication_1.checkAuthentication, user_controller_1.default.getMe);
userRouter.post(PATH + '/refresh', (0, validate_1.validate)(user_schema_1.refreshSchema), user_controller_1.default.refreshToken);
exports.default = userRouter;
