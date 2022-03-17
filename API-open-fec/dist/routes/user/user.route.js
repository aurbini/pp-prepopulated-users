"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dbconnector_1 = __importDefault(require("../../dbconfig/dbconnector"));
class UserController {
    async get(req, res) {
        try {
            const client = await dbconnector_1.default.connect();
            const sql = "SELECT * FROM todos";
            const { rows } = await client.query(sql);
            const todos = rows;
            client.release();
            res.send(todos);
        }
        catch (error) {
            res.status(400).send(error);
        }
    }
}
exports.default = UserController;
