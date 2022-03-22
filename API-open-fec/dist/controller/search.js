"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const url_1 = require("../utils/url");
const dotenv = __importStar(require("dotenv"));
// import fetch from 'node-fetch';
const axios_1 = __importDefault(require("axios"));
dotenv.config();
const url_param = '/candidates/?page=1&sort_nulls_last=false&sort_hide_null=false&per_page=20&sort_null_only=false&sort=name&api_key=';
class SearchDataController {
    async getCandidates(req, res) {
        try {
            const result = await axios_1.default.get(url_1.fec_url + url_param + process.env.API_KEY);
            console.log(result.data);
            res.send(result.data);
        }
        catch (error) {
            console.log(error);
            res.status(400).send(error);
        }
    }
}
exports.default = SearchDataController;
