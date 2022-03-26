"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CristinaStRes = void 0;
const baseFileReader_model_1 = require("../models/baseFileReader.model");
const splitName_1 = require("../util/splitName");
const findStateName_1 = require("../util/findStateName");
class CristinaStRes extends baseFileReader_model_1.BaseFileReader {
    constructor(projectName) {
        super(projectName);
        this.projectName = projectName;
    }
    filterRecords(record, wsName, fn) {
        if (!record.Name.includes(',')) {
            this.user.FirstName = (0, splitName_1.splitName)(record.Name).firstName;
            this.user.LastName = (0, splitName_1.splitName)(record.Name).lastName;
        }
        else {
            this.user.FirstName = record.Name.split(' ')[1];
            this.user.LastName = record.Name.split(' ')[0];
        }
        if (wsName == 'GA' && record.Phone)
            this.user.Phone = record.Phone.slice(0, 13);
        else
            this.user.Phone = record.Phone;
        this.user.Email = record.Email;
        if (!!record.Address && wsName == 'OK' || wsName == 'AR') {
            this.splitAddress(record.Address, false, wsName, fn);
        }
        else {
            this.user.State = (0, findStateName_1.findStateName)(wsName);
            this.treasurer.StateName = (0, findStateName_1.findStateName)(wsName);
        }
        if (!!record.Treasurer) {
            if (wsName == 'CO') {
                const treas = record.Treasurer.split('-');
                this.treasurer.TrFirstName = treas[0];
                this.treasurer.TrLastName = treas[1];
            }
            if (record.Treasurer.includes('Candidate')) {
                this.treasurer.TrFirstName = this.user.FirstName;
                this.treasurer.TrLastName = this.user.LastName;
            }
            else {
                this.treasurer.TrFirstName = (0, splitName_1.splitName)(record.Treasurer).firstName;
                this.treasurer.TrLastName = (0, splitName_1.splitName)(record.Treasurer).lastName;
            }
        }
        this.user.OrganizationTypeID = 71;
        this.newData.push(Object.assign(Object.assign({}, this.user), this.treasurer));
    }
}
exports.CristinaStRes = CristinaStRes;
