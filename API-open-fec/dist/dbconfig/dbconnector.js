"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
exports.default = new pg_1.Pool({
    max: 20,
    connectionString: 'postgres://alexanderurbini:Cannes92$!@localhost:5432/candidates',
    idleTimeoutMillis: 30000
});
