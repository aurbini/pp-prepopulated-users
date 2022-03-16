"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = __importDefault(require("pg"));
const pool = new pg_1.default({
    user: 'alexanderurbini',
    host: 'localhost',
    database: 'api',
    password: 'Cannes92$!',
    port: 5432
});
