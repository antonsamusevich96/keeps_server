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
const users_model_1 = __importDefault(require("./users.model"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const authentication_1 = require("../utils/authentication");
const SALT = 5;
class UserService {
    registration(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield users_model_1.default.findOne({ name: data.name });
            if (user) {
                const error = Error('такой пользователь существует');
                error.name = 'name';
                throw error;
            }
            const hashPassword = bcrypt_1.default.hashSync(data.password, SALT);
            const createdUser = yield users_model_1.default.create({ name: data.name, password: hashPassword });
            return (0, authentication_1.getAuthentication)({ name: createdUser.name, _id: createdUser._id || '' });
        });
    }
    login(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const currentUser = yield users_model_1.default.findOne({ name: data.name });
            if (!currentUser) {
                throw new Error('Такого пользователя не существует');
            }
            const checkPassword = bcrypt_1.default.compareSync(data.password, currentUser.password);
            if (checkPassword) {
                return (0, authentication_1.getAuthentication)({ name: currentUser.name, _id: currentUser._id || '' });
            }
            throw new Error('Неверный пароль');
        });
    }
    getMe(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield users_model_1.default.findById(id);
            if (!user) {
                throw new Error('Такого пользователя не существует');
            }
            return user;
        });
    }
}
exports.default = new UserService();
