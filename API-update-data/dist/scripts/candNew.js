"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.candNewRes = void 0;
const baseFileReader_model_1 = require("../models/baseFileReader.model");
class candNewRes extends baseFileReader_model_1.BaseFileReader {
    constructor(projectName) {
        super(projectName);
        this.projectName = projectName;
    }
    filterRecords(record, wsName) {
        console.log(record);
        this.user.FirstName = record['First Name'];
        this.user.LastName = record['Last Name'];
        this.user.Email = record.Email;
        this.user.Phone = record.Phone;
        this.newData.push(Object.assign(Object.assign({}, this.user), this.treasurer));
    }
}
exports.candNewRes = candNewRes;
