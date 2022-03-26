"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CalStateRes = void 0;
const baseFileReader_model_1 = require("../models/baseFileReader.model");
const splitName_1 = require("../util/splitName");
const splitPhoneEmail_1 = require("../util/splitPhoneEmail");
const findStateName_1 = require("../util/findStateName");
const splitAddress_1 = require("../util/splitAddress");
class CalStateRes extends baseFileReader_model_1.BaseFileReader {
    constructor(projectName) {
        super(projectName);
        this.projectName = projectName;
    }
    filterRecords(record, wsName) {
        const name = record['State Senate'].trim().split(' ');
        name.pop();
        name.pop();
        const treas = record['Committee Treasurer info'];
        this.user.FirstName = (0, splitName_1.splitName)(name.join(' ')).firstName;
        this.user.LastName = (0, splitName_1.splitName)(name.join(' ')).lastName;
        this.user.State = (0, findStateName_1.findStateName)(wsName.trim());
        this.treasurer.StateName = (0, findStateName_1.findStateName)(wsName.trim());
        // console.log(wsName)
        if (!!record['Contact info'] == false) {
            return;
        }
        const commas = (0, splitAddress_1.countCommas)(record['Contact info']);
        if (wsName == 'MN' && commas > 1 && !record['Contact info'].includes('cell')) {
            const infoToArray = record['Contact info'].split(',');
            // console.log(infoToArray)
            this.user.Email = infoToArray[1].trim();
            this.user.Phone = infoToArray[0].trim();
            if (infoToArray[1].trim().includes('/'))
                this.user.Email = infoToArray[1].trim().split('/')[0];
        }
        else if (wsName !== 'MN') {
            this.user.Email = (0, splitPhoneEmail_1.splitPhoneEmail)(record['Contact info']).email;
            this.user.Phone = (0, splitPhoneEmail_1.splitPhoneEmail)(record['Contact info']).phone;
        }
        // if (wsName == 'MN') console.log(this.user)
        if (wsName == 'CA') {
            this.treasurer.TrFirstName = '';
            this.treasurer.TrLastName = '';
            this.treasurer.TrPhone = treas;
            this.user.Phone = treas;
        }
        if (!!treas && wsName !== 'WI' && wsName !== 'MN') {
            // console.log(wsName)
            if (!!treas.includes('Himself') || !!treas.includes('himself') || !!treas.includes('Herself') || !!treas.includes('herself') || !!treas.includes('C.O.S')) {
                this.treasurer.TrFirstName = this.user.FirstName;
                this.treasurer.TrLastName = this.user.LastName;
            }
        }
        if ((wsName == "WI" || wsName == "MN") && !!treas) {
            const phoneIndex = treas.indexOf('(');
            this.treasurer.TrFirstName = (0, splitName_1.splitName)(treas.slice(0, phoneIndex)).firstName;
            this.treasurer.TrLastName = (0, splitName_1.splitName)(treas.slice(0, phoneIndex)).lastName;
            this.treasurer.TrPhone = treas.slice(phoneIndex, phoneIndex + 15);
            if (wsName !== 'WI')
                this.treasurer.TrEmail = treas.slice(phoneIndex + 15);
        }
        if (wsName == 'AZ') {
            this.treasurer.TrFirstName = (0, splitName_1.splitName)(treas).firstName;
            this.treasurer.TrLastName = (0, splitName_1.splitName)(treas).lastName;
        }
        if ((wsName == 'CA')) {
            this.treasurer.TrPhone = treas;
        }
        else if ((wsName == 'AK' || wsName == 'LA') && !!treas) {
            const phoneIndex = treas.indexOf('-') - 3;
            this.treasurer.TrFirstName = (0, splitName_1.splitName)(treas.slice(0, phoneIndex)).firstName;
            this.treasurer.TrLastName = (0, splitName_1.splitName)(treas.slice(0, phoneIndex)).lastName;
            this.treasurer.TrPhone = treas.slice(phoneIndex, phoneIndex + 15);
            this.treasurer.TrEmail = treas.slice(phoneIndex + 15);
        }
        // console.log(this.treasurer)
        this.user.OrganizationTypeID = 71;
        this.newData.push(Object.assign(Object.assign({}, this.user), this.treasurer));
    }
}
exports.CalStateRes = CalStateRes;
