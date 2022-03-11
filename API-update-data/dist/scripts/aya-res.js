"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AyaRes = void 0;
const baseFileReader_model_1 = require("../models/baseFileReader.model");
const splitName_1 = require("../util/splitName");
const splitPhoneEmail_1 = require("../util/splitPhoneEmail");
class AyaRes extends baseFileReader_model_1.BaseFileReader {
    constructor(projectName) {
        super(projectName);
        this.projectName = projectName;
    }
    filterRecords(record, wsName) {
        if (!!record['Name'] && !!record['Treasurer']) {
            this.user.FirstName = splitName_1.splitName(record.Name).firstName;
            this.user.LastName = splitName_1.splitName(record.Name).lastName;
            if (!!record.Contact) {
                this.user.Email = splitPhoneEmail_1.splitPhoneEmail(record.Contact).email;
                this.user.Phone = splitPhoneEmail_1.splitPhoneEmail(record.Contact).phone;
            }
            this.treasurer.TrFirstName = splitName_1.splitName(record.Treasurer).firstName;
            this.treasurer.TrLastName = splitName_1.splitName(record.Treasurer).lastName;
            if (!!record['Treasurer Contact'] &&
                typeof record['Treasurer Contact'] != 'number' &&
                wsName != 'Montana Upcoming Races') {
                if (record['Treasurer Contact'].includes('@')) {
                    this.treasurer.TrEmail = splitPhoneEmail_1.splitPhoneEmail(record['Treasurer Contact']).email;
                    this.treasurer.TrPhone = splitPhoneEmail_1.splitPhoneEmail(record['Treasurer Contact']).phone;
                }
                else if (wsName !== 'Nebraska') {
                    this.treasurer.TrPhone == record['Treasurer Contact'];
                }
            }
            this.user.State = wsName.split(' ')[0];
            this.newData.push(Object.assign(Object.assign({}, this.user), this.treasurer));
        }
    }
}
exports.AyaRes = AyaRes;
