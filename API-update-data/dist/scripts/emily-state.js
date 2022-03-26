"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmilyStRes = void 0;
const baseFileReader_model_1 = require("../models/baseFileReader.model");
const splitMiddleName_1 = require("../util/splitMiddleName");
class EmilyStRes extends baseFileReader_model_1.BaseFileReader {
    constructor(projectName) {
        super(projectName);
        this.projectName = projectName;
    }
    filterRecords(record, wsName, fn) {
        if (!record.Name && wsName !== 'Texas')
            return;
        else if (wsName == "Texas" && !record.Name)
            return;
        if (wsName == "Missouri")
            return;
        if (!!record.Name && record.Name.trim() !== 'No R incumbent') {
            this.user.FirstName = (0, splitMiddleName_1.splitMiddleName)(record.Name).firstName;
            this.user.LastName = (0, splitMiddleName_1.splitMiddleName)(record.Name).lastName;
            if (wsName == 'Florida' && !!record['Campaign Treasurer']) {
                this.treasurer.TrFirstName = (0, splitMiddleName_1.splitMiddleName)(record['Campaign Treasurer']).firstName;
                this.treasurer.TrLastName = (0, splitMiddleName_1.splitMiddleName)(record['Campaign Treasurer']).lastName;
                this.user.Phone = record['Contact info'];
            }
            else if (wsName == 'Utah') {
                this.user.Email = record['Contact info'];
            }
            else {
                this.user.Email = record['Contact info'];
            }
        }
        if (wsName == 'Utah') {
            if (record.Address) {
                this.splitAddress(record.Address, false, wsName, this.projectName);
            }
        }
        if (record['Name House']) {
            this.user.OrganizationTypeID = 70;
        }
        else {
            this.user.OrganizationTypeID = 71;
        }
        this.user.State = wsName.trim();
        this.treasurer.StateName = wsName.trim();
        if (this.user.FirstName && this.user.LastName) {
            this.newData.push(Object.assign(Object.assign({}, this.user), this.treasurer));
        }
    }
}
exports.EmilyStRes = EmilyStRes;
