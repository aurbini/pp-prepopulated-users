"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StateLegCOGA = void 0;
const baseFileReader_model_1 = require("../models/baseFileReader.model");
const splitName_1 = require("../util/splitName");
class StateLegCOGA extends baseFileReader_model_1.BaseFileReader {
    constructor(projectName) {
        super(projectName);
        this.projectName = projectName;
    }
    filterRecords(record, wsName, fn) {
        this.user.FirstName = (0, splitName_1.splitName)(record.Name).firstName;
        this.user.LastName = (0, splitName_1.splitName)(record.Name).lastName;
        if (!!record.Treasurer) {
            if (wsName == 'CO') {
                record.Treasurer = record.Treasurer.split('-')[0];
                this.treasurer.TrFirstName = (0, splitName_1.splitName)(record.Treasurer).firstName;
                this.treasurer.TrLastName = (0, splitName_1.splitName)(record.Treasurer).lastName;
            }
            if (record.Treasurer.trim().includes('Candidate') || record.Treasurer.trim().includes('himself')) {
                this.treasurer.TrFirstName = this.user.FirstName;
                this.treasurer.TrLastName = this.user.LastName;
            }
            else if (record.Treasurer.trim().includes('No Committee') || record.Treasurer.trim().includes('N/A') || record.Treasurer.trim().includes('n/a')) {
                this.treasurer.TrFirstName = (0, splitName_1.splitName)(record.Treasurer).firstName;
                this.treasurer.TrLastName = (0, splitName_1.splitName)(record.Treasurer).lastName;
            }
        }
        // console.log(record)
        if (record.Address) {
            this.splitAddress(record.Address, false, wsName, fn);
        }
        this.treasurer.TrEmail = record['Email'];
        this.user.Phone = record['Phone'];
        this.user.OrganizationLevelID = 71;
        this.newData.push(Object.assign(Object.assign({}, this.user), this.treasurer));
    }
}
exports.StateLegCOGA = StateLegCOGA;
