"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JacobRes = void 0;
const baseFileReader_model_1 = require("../models/baseFileReader.model");
const splitAddress_1 = require("../util/splitAddress");
const splitName_1 = require("../util/splitName");
class JacobRes extends baseFileReader_model_1.BaseFileReader {
    constructor(projectName) {
        super(projectName);
        this.projectName = projectName;
    }
    filterRecords(record, wsName, projectName) {
        if (!!record.NAME) {
            this.user.FirstName = splitName_1.splitName(record.NAME).firstName;
            this.user.LastName = splitName_1.splitName(record.NAME).lastName;
            if (!!record.TREASURER) {
                this.treasurer.TrFirstName = splitName_1.splitName(record.TREASURER).firstName;
                this.treasurer.TrLastName = splitName_1.splitName(record.TREASURER).lastName;
            }
            if (!!record.ADDRESS) {
                const address = splitAddress_1.splitOneCommaAddress(record.ADDRESS, wsName);
                this.treasurer.Address = address.address;
                this.treasurer.Zipcode = address.zipcode;
                this.treasurer.StateName = address.state;
            }
            if (!!record['PHONE & EMAIL']) {
                const contactSplit = record['PHONE & EMAIL'].split(';');
                contactSplit.map((record) => {
                    if (record.includes('@')) {
                        this.user.Email = record;
                    }
                    else {
                        this.user.Phone = record;
                    }
                });
            }
            if (record.ADDRESS) {
                this.splitAddress(record.ADDRESS, false, wsName, projectName);
            }
            this.user.OrganizationTypeID = 71;
            this.user.OrganizationLevelID = 2;
            this.newData.push(Object.assign(Object.assign({}, this.user), this.treasurer));
        }
    }
}
exports.JacobRes = JacobRes;
