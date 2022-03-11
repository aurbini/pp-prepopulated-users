"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AyaCalRes = void 0;
const baseFileReader_model_1 = require("../models/baseFileReader.model");
const splitName_1 = require("../util/splitName");
const splitPhoneEmail_1 = require("../util/splitPhoneEmail");
const findStateName_1 = require("../util/findStateName");
const reverseName_1 = require("../util/reverseName");
class AyaCalRes extends baseFileReader_model_1.BaseFileReader {
    constructor(projectName) {
        super(projectName);
        this.projectName = projectName;
    }
    filterRecords(record, wsName) {
        if (!!record['Senators'] && !!record['Treasurer']) {
            this.user.FirstName = splitName_1.splitName(record.Senators).firstName;
            this.user.LastName = splitName_1.splitName(record.Senators).lastName;
            if (!!record.Contact) {
                this.user.Email = splitPhoneEmail_1.splitPhoneEmail(record.Contact).email;
                this.user.Phone = splitPhoneEmail_1.splitPhoneEmail(record.Contact).phone;
            }
            if (record.Treasurer.includes(',')) {
                record.Treasurer = reverseName_1.reverseName(record.Treasurer);
            }
            this.treasurer.TrFirstName = splitName_1.splitName(record.Treasurer).firstName;
            this.treasurer.TrLastName = splitName_1.splitName(record.Treasurer).lastName;
            if (!!record['Treasurer info']) {
                this.user.Email = splitPhoneEmail_1.splitPhoneEmail(record['Treasurer info']).email;
                this.user.Phone = splitPhoneEmail_1.splitPhoneEmail(record['Treasurer info']).phone;
            }
            this.user.State = findStateName_1.findStateName(wsName);
            this.treasurer.StateName = findStateName_1.findStateName(wsName);
            this.user.OrganizationTypeID = 71;
            this.newData.push(Object.assign(Object.assign({}, this.user), this.treasurer));
        }
    }
}
exports.AyaCalRes = AyaCalRes;
