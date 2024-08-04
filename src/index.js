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
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const user_router_1 = __importDefault(require("./users/user.router"));
const PORT = 5000;
const dbURL = 'mongodb+srv://dantes:dantes_dantes@keeps.d9bnevl.mongodb.net/?retryWrites=true&w=majority&appName=Keeps';
const appServer = (0, express_1.default)();
appServer.use(express_1.default.json());
appServer.use('/api', user_router_1.default);
const startApp = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield mongoose_1.default.connect(dbURL);
        console.log('connected db');
    }
    catch (error) {
        console.log(error, 'error db');
    }
});
appServer.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
startApp();
