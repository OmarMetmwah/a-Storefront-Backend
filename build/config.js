"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.default = {
    port: process.env.PORT,
    host: process.env.PG_HOST,
    dbport: process.env.PG_PORT,
    db: process.env.ENV === 'dev' ? process.env.PG_DB : process.env.PG_DB_TEST,
    user: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    pepper: process.env.BCRYPT,
    salt: process.env.SALT_ROUNDS,
    tokenSecret: process.env.TOKEN_SECRET,
};
