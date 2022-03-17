"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const search_1 = __importDefault(require("../../controller/search"));
const router = express_1.Router();
const searchDataController = new search_1.default();
router.route('/')
    .get(searchDataController.getCandidates);
exports.default = router;
