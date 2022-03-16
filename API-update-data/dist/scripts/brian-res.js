"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StandardRes = void 0;
const baseFileReader_model_1 = require("../models/baseFileReader.model");
const findStateName_1 = require("../util/findStateName");
class StandardRes extends baseFileReader_model_1.BaseFileReader {
    constructor(projectName) {
        super(projectName);
        this.projectName = projectName;
    }
    filterRecords(record, wsName) {
        this.user.FirstName = record.Salutation;
        this.user.LastName = record.Last;
        this.user.City = record.City;
        this.user.Email = record.Email;
        this.user.Phone = record['Work Phone'];
        this.user.State = findStateName_1.findStateName(record.STATE);
        this.treasurer.Address = record['Address 1'] + record['Address 2'];
        this.treasurer.StateName = findStateName_1.findStateName(record.STATE);
        this.treasurer.Zipcode = record.ZIPCODE;
        this.newData.push(Object.assign(Object.assign({}, this.user), this.treasurer));
    }
}
exports.StandardRes = StandardRes;
