"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.splitMiddleName = void 0;
const splitMiddleName = (nameRecord) => {
    const newRecord = {
        firstName: '',
        lastName: '',
    };
    const nameSplit = nameRecord.trim().split(' ');
    newRecord[`firstName`] = nameSplit[0];
    if (nameSplit.length === 3)
        newRecord.lastName = nameSplit[2];
    else
        newRecord.lastName = nameSplit[1];
    return newRecord;
};
exports.splitMiddleName = splitMiddleName;
