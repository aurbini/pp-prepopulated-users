"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TravisRes = void 0;
const baseFileReader_model_1 = require("../models/baseFileReader.model");
const splitName_1 = require("../util/splitName");
const findStateName_1 = require("../util/findStateName");
class TravisRes extends baseFileReader_model_1.BaseFileReader {
    constructor(projectName) {
        super(projectName);
        this.projectName = projectName;
    }
    filterRecords(record, wsName, fn) {
        if (record.Name.includes(',')) {
            let reverseName = '';
            const name = record.Name.split(',');
            for (let i = name.length; i > 0; i--) {
                reverseName += name[i];
            }
            record.Name = reverseName;
        }
        this.user.FirstName = splitName_1.splitName(record.Name).firstName;
        this.user.LastName = splitName_1.splitName(record.Name).lastName;
        if (!!record.Treasurer) {
            this.treasurer.TrFirstName = splitName_1.splitName(record.Treasurer).firstName;
            this.treasurer.TrLastName = splitName_1.splitName(record.Treasurer).lastName;
        }
        if (!!record['T email'])
            this.treasurer.TrEmail = record['T email'];
        if (!!record['t email'])
            this.treasurer.TrEmail = record['t email'];
        if (!!record['contact info'])
            this.user.Phone = record['contact info'];
        if (!!record.Email)
            this.user.Email = record.Email;
        if (!!record.Phone)
            this.user.Phone = record.Phone;
        this.user.State = findStateName_1.findStateName(wsName);
        if (record.Address) {
            this.splitAddress(record.Address, true, wsName, fn);
        }
        this.user.OrganizationLevelID = 71;
        this.newData.push(Object.assign(Object.assign({}, this.user), this.treasurer));
    }
}
exports.TravisRes = TravisRes;
