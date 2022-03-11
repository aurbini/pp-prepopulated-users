"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RiRes = void 0;
const baseFileReader_model_1 = require("../models/baseFileReader.model");
const splitName_1 = require("../util/splitName");
const findStateName_1 = require("../util/findStateName");
class RiRes extends baseFileReader_model_1.BaseFileReader {
    constructor(projectName) {
        super(projectName);
        this.projectName = projectName;
    }
    filterRecords(record, wsName) {
        if (!!record.Senators && !!record['Contact']) {
            const candContactSplit = [record['Contact'].slice(0, 14), record['Contact'].slice(14)];
            this.user.FirstName = splitName_1.splitName(record.Senators).firstName;
            this.user.LastName = splitName_1.splitName(record.Senators).lastName;
            this.user.Phone = candContactSplit[0].trim();
            this.user.Email = candContactSplit[1].trim();
            this.treasurer.TrFirstName = this.user.FirstName;
            this.treasurer.TrLastName = this.user.LastName;
            this.treasurer.TrEmail = this.user.Email;
            this.treasurer.TrPhone = this.user.Phone;
            this.treasurer.StateName = findStateName_1.findStateName(wsName);
            this.user.OrganizationLevelID = 71;
            // console.log(this.user, this.treasurer)
            this.newData.push(Object.assign(Object.assign({}, this.user), this.treasurer));
        }
    }
}
exports.RiRes = RiRes;
