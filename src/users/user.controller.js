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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_service_1 = __importDefault(require("./user.service"));
const jsonwebtoken_1 = require("jsonwebtoken");
const accesses_1 = require("../accesses");
const authentication_1 = require("../utils/authentication");
class UserController {
    registration(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, password } = req.body;
                const access = yield user_service_1.default.registration({ name, password });
                res.status(200).send(access);
            }
            catch (error) {
                console.log({ [error.name]: error === null || error === void 0 ? void 0 : error.message });
                res.status(400).json({ [error.name]: error === null || error === void 0 ? void 0 : error.message });
            }
        });
    }
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, password } = req.body;
                const access = yield user_service_1.default.login({ name, password });
                res.status(200).send(access);
            }
            catch (error) {
                res.status(400).json({ message: error.message });
            }
        });
    }
    getMe(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
                const { _id } = (0, jsonwebtoken_1.verify)(token, accesses_1.DECODE_KEY);
                const result = yield user_service_1.default.getMe(_id);
                res.status(200).json({
                    name: result.name,
                    id: result._id
                });
            }
            catch (error) {
                res.status(400).json({ message: error.message });
            }
        });
    }
    refreshToken(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const token = req.body.token;
                const access = (0, jsonwebtoken_1.verify)(token, accesses_1.DECODE_KEY);
                const newPairTokens = (0, authentication_1.getAuthentication)(access);
                res.status(200).send(newPairTokens);
            }
            catch (error) {
                res.status(400).json({ message: error.message });
            }
        });
    }
}
exports.default = new UserController();
