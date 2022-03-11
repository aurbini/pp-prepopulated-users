"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StateHouseRes = void 0;
const baseFileReader_model_1 = require("../models/baseFileReader.model");
const splitMiddleName_1 = require("../util/splitMiddleName");
class StateHouseRes extends baseFileReader_model_1.BaseFileReader {
    constructor(projectName) {
        super(projectName);
        this.projectName = projectName;
    }
    filterRecords(record, wsName, fn) {
        if (wsName.trim() == 'Florida')
            return;
        if (wsName !== 'Missouri' && wsName !== 'Maryland' && wsName !== 'Virginia') {
            if (!record['Name House'])
                return;
            this.user.FirstName = splitMiddleName_1.splitMiddleName(record['Name House'].trim()).firstName;
            this.user.LastName = splitMiddleName_1.splitMiddleName(record['Name House'].trim()).lastName;
            if (!!record['Campaign Treasurer']) {
                this.treasurer.TrFirstName = splitMiddleName_1.splitMiddleName(record['Campaign Treasurer']).firstName;
                this.treasurer.TrLastName = splitMiddleName_1.splitMiddleName(record['Campaign Treasurer']).lastName;
            }
            this.user.Email = record['Contact info House'];
        }
        else {
            if (!record['First Name'])
                return;
            this.user.FirstName = record['First Name'];
            this.user.LastName = record['Last Name'];
            this.user.Phone = record.Phone;
            if (record.Email) {
                this.user.Email = record.Email;
            }
            if (wsName == 'Maryland') {
                this.treasurer.Address = record['Campaign Address'];
                const splitAddress = record.__EMPTY.split(' ');
                if (splitAddress.length == 3) {
                    this.user.City = splitAddress[0];
                    this.treasurer.Zipcode = splitAddress[2];
                }
                else {
                    this.user.City = splitAddress[0] + ' ' + splitAddress[1];
                    this.treasurer.Zipcode = splitAddress[3];
                }
                this.treasurer.Zipcode;
            }
        }
        if (wsName == 'Utah') {
            if (record.Address) {
                this.splitAddress(record.Address, false, wsName, this.projectName);
            }
        }
        this.user.State = wsName;
        this.user.OrganizationTypeID = 70;
        this.treasurer.StateName = wsName;
        if (this.user.FirstName && this.user.LastName) {
            this.newData.push(Object.assign(Object.assign({}, this.user), this.treasurer));
        }
    }
}
exports.StateHouseRes = StateHouseRes;
