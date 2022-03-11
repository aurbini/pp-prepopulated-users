interface nameObject {
    firstName: string;
    lastName: string;
}

export const splitMiddleName = (nameRecord: string): nameObject => {
    const newRecord: nameObject = {
        firstName: '',
        lastName: '',
    };
    const nameSplit = nameRecord.trim().split(' ');

    newRecord[`firstName`] = nameSplit[0];
    if (nameSplit.length === 3) newRecord.lastName = nameSplit[2];
    else newRecord.lastName = nameSplit[1];

    return newRecord;
};
