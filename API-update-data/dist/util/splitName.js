"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.splitName = void 0;
const splitName = (nameRecord) => {
    const newRecord = {
        firstName: '',
        lastName: '',
    };
    const nameSplit = nameRecord.trim().split(' ');
    newRecord[`firstName`] = nameSplit[0];
    if (nameSplit.length == 2)
        newRecord.lastName = nameSplit[1];
    else if (nameSplit.length == 3)
        newRecord.lastName = nameSplit[2];
    else if (nameSplit.length === 4)
        newRecord.lastName = nameSplit[1];
    else if (nameSplit.length === 5)
        newRecord.lastName = nameSplit[2];
    else
        newRecord.lastName = nameSplit[1];
    return newRecord;
};
exports.splitName = splitName;
