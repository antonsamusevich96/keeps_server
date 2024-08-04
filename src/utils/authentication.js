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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAuthentication = exports.checkRefresh = exports.checkAuthentication = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const accesses_1 = require("../accesses");
const checkAuthentication = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    if (req.method === 'OPTIONS') {
        next();
    }
    const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
    if (!token) {
        res.status(403).json('Не авторизован');
        return;
    }
    try {
        req.userData = (0, jsonwebtoken_1.verify)(token, accesses_1.DECODE_KEY);
        console.log((0, jsonwebtoken_1.verify)(token, accesses_1.DECODE_KEY), 'verify');
        next();
    }
    catch (err) {
        if (err instanceof jsonwebtoken_1.JsonWebTokenError) {
            res.status(403).json(err.message);
            return;
        }
        res.status(500);
    }
});
exports.checkAuthentication = checkAuthentication;
const checkRefresh = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.method === 'OPTIONS') {
        next();
    }
    console.log(123, 'test');
    const token = req.body.token;
    try {
        req.userData = (0, jsonwebtoken_1.verify)(token, accesses_1.DECODE_KEY);
        next();
    }
    catch (err) {
        if (err instanceof jsonwebtoken_1.JsonWebTokenError) {
            res.status(403).json(err.message);
            return;
        }
        res.status(500);
    }
});
exports.checkRefresh = checkRefresh;
const getAuthentication = (data) => {
    return {
        access: (0, jsonwebtoken_1.sign)(data, accesses_1.DECODE_KEY, { expiresIn: '1m' }),
        refresh: (0, jsonwebtoken_1.sign)(data, accesses_1.DECODE_KEY, { expiresIn: '1h' }),
    };
};
exports.getAuthentication = getAuthentication;
