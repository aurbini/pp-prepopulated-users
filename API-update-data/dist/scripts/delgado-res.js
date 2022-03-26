"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DelgadoRes = void 0;
const baseFileReader_model_1 = require("../models/baseFileReader.model");
const splitName_1 = require("../util/splitName");
const findStateName_1 = require("../util/findStateName");
class DelgadoRes extends baseFileReader_model_1.BaseFileReader {
    constructor(projectName) {
        super(projectName);
        this.projectName = projectName;
    }
    filterRecords(record, wsName) {
        var _a;
        // console.log(record)
        if (!!record['State Senate']) {
            if (typeof record.Contact == 'number') {
                record.Contact = record.Contact.toString();
            }
            const senatorContactSplit = record.Contact.split(',');
            this.user.FirstName = (0, splitName_1.splitName)(record['State Senate']).firstName;
            this.user.LastName = (0, splitName_1.splitName)(record['State Senate']).lastName;
            this.user.Phone = senatorContactSplit[0];
            this.user.Email = senatorContactSplit[1];
            if (!!record['Committee number'])
                if (!!record['Committee Treasurer info'] && typeof record['Committee Treasurer info'] == 'string') {
                    if (record['Committee Treasurer info'].includes('Himself') ||
                        record['Committee Treasurer info'].includes('himself') ||
                        record['Committee Treasurer info'].includes('Herself') ||
                        record['Committee Treasurer info'].includes('herself')) {
                        this.treasurer.TrFirstName = this.user.FirstName;
                        this.treasurer.TrLastName = this.user.LastName;
                    }
                    this.treasurer.TrFirstName = (0, splitName_1.splitName)(record['Committee Treasurer info']).firstName;
                    this.treasurer.TrLastName = (0, splitName_1.splitName)(record['Committee Treasurer info']).lastName;
                }
                else if ((wsName = 'CA') && typeof record['Committee Treasurer info'] == 'string') {
                    this.treasurer.TrPhone = record['Committee Treasurer info'];
                }
                else if (wsName === 'WI' && typeof record['Committee Treasurer info'] == 'string') {
                    const index = record['Committee Treasurer info'].indexOf('(');
                    const name = record['Committee Treasurer info'].slice(0, index);
                    this.treasurer.TrFirstName = (0, splitName_1.splitName)(name).firstName;
                    this.treasurer.TrLastName = (0, splitName_1.splitName)(name).lastName;
                    this.treasurer.TrPhone = record['Committee Treasurer info'].slice(index);
                    this.treasurer.TrEmail = '';
                }
                else if (wsName == 'MN' && typeof record['Committee Treasurer info'] == 'string') {
                    const phoneIndex = record['Committee Treasurer info'].indexOf('(');
                    const name = record['Committee Treasurer info'].slice(0, phoneIndex);
                    const emailIndex = phoneIndex + 14;
                    this.treasurer.TrFirstName = (0, splitName_1.splitName)(name).firstName;
                    this.treasurer.TrLastName = (0, splitName_1.splitName)(name).lastName;
                    this.treasurer.TrPhone = record['Committee Treasurer info'].slice(phoneIndex, emailIndex);
                    this.treasurer.TrEmail = record['Committee Treasurer info'].slice(emailIndex);
                }
                else if (wsName == 'LA') {
                    if (record['Committee Treasurer info'] != 'NA' && typeof record['Committee Treasurer info'] == 'string') {
                        const treasLength = record['Committee Treasurer info'].length;
                        let indexPhone = 0;
                        for (let index = 0; index < treasLength; index++) {
                            const element = record['Committee Treasurer info'][index];
                            if (parseInt(element)) {
                                indexPhone = parseInt(element);
                            }
                        }
                        const name = record['Committee Treasurer info'].slice(0, indexPhone);
                        this.treasurer.TrFirstName = (0, splitName_1.splitName)(name).firstName;
                        this.treasurer.TrLastName = (0, splitName_1.splitName)(name).lastName;
                        this.treasurer.TrPhone =
                            record['Committee Treasurer info'].slice(indexPhone);
                        this.treasurer.TrEmail = '';
                    }
                }
                else if (wsName == 'AK') {
                    if (record['Committee Treasurer info'] != 'NA') {
                        const treasLength = record['Committee Treasurer info'].length;
                        let indexPhone = 0;
                        for (let index = 0; index < treasLength; index++) {
                            const element = record['Committee Treasurer info'][index];
                            if (parseInt(element)) {
                                indexPhone = index;
                            }
                        }
                        const emailIndex = indexPhone + 12;
                        const name = record['Committee Treasurer info'].slice(0, indexPhone);
                        this.treasurer.TrFirstName = (0, splitName_1.splitName)(name).firstName;
                        this.treasurer.TrLastName = (0, splitName_1.splitName)(name).lastName;
                        this.treasurer.TrPhone = record['Committee Treasurer info'].slice(indexPhone, emailIndex);
                        this.treasurer.TrEmail =
                            record['Committee Treasurer info'].slice(emailIndex);
                    }
                }
        }
        this.user.OrganizationTypeID = 71;
        this.user.State = (0, findStateName_1.findStateName)(wsName);
        this.treasurer.StateName = (0, findStateName_1.findStateName)('wsName');
        if ((_a = this.user.Email) === null || _a === void 0 ? void 0 : _a.includes('/')) {
            this.treasurer.TrEmail = this.user.Email.split('/')[0];
            this.user.Email = this.treasurer.TrEmail;
        }
        if (this.user.FirstName && this.user.LastName) {
            this.newData.push(Object.assign(Object.assign({}, this.user), this.treasurer));
        }
    }
}
exports.DelgadoRes = DelgadoRes;
