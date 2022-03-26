"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CrisTravis = void 0;
const baseFileReader_model_1 = require("../models/baseFileReader.model");
const splitName_1 = require("../util/splitName");
class CrisTravis extends baseFileReader_model_1.BaseFileReader {
    constructor(projectName) {
        super(projectName);
        this.projectName = projectName;
    }
    filterRecords(record, wsName, fn) {
        if (!record.Politician || wsName == 'MA')
            return;
        this.user.FirstName = (0, splitName_1.splitName)(record.Politician).firstName;
        this.user.LastName = (0, splitName_1.splitName)(record.Politician).lastName;
        if (wsName != 'WI') {
            this.treasurer.TrFirstName = (0, splitName_1.splitName)(record.Treasurer).firstName;
            this.treasurer.TrLastName = (0, splitName_1.splitName)(record.Treasurer).lastName;
        }
        else {
            this.treasurer.TrFirstName = (0, splitName_1.splitName)(record['Treasurer ']).firstName;
            this.treasurer.TrLastName = (0, splitName_1.splitName)(record['Treasurer ']).lastName;
        }
        this.user.Phone = record.Phone;
        this.user.Email = record.Email;
        if (record.Email)
            this.user.Email;
        if (!!record.Treasurer) {
            this.treasurer.TrFirstName = (0, splitName_1.splitName)(record.Treasurer).firstName;
            this.treasurer.TrLastName = (0, splitName_1.splitName)(record.Treasurer).lastName;
        }
        if (record.Address) {
            this.splitAddress(record.Address, false, wsName, fn);
        }
        this.user.OrganizationTypeID = 1;
        this.newData.push(Object.assign(Object.assign({}, this.user), this.treasurer));
    }
}
exports.CrisTravis = CrisTravis;
// campaignDetails.State = address.state;
// campaignDetails.OrganizationLevelID = '2';
// campaignDetails.State = address.state;
// campaignInfo.OfficeTypeId = 71;
// contactInfo.CampAddress = address.address;
// contactInfo.CampEmail = address.address;
// contactInfo.CampZipcode = address.zipcode;
// contactInfo.StateName = address.state;
