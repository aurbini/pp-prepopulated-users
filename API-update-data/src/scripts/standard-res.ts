import { BaseFileReader } from '../models/baseFileReader.model';
import { ProjectNames } from '../models/ProjectNames.enum';
import { AyaResWsModel } from '../models/wsModels/ayaRes.model';
import { splitName } from '../util/splitName';
import { splitPhoneEmail } from '../util/splitPhoneEmail';
import { StandardInterface } from '../models/wsModels/standard.model';
import { findStateName } from '../util/findStateName';

export class StandardRes extends BaseFileReader {
    constructor(public projectName: ProjectNames) {
        super(projectName)
    }
    filterRecords(record: StandardInterface, wsName: string) {

        this.user.FirstName = record.Salutation;
        this.user.LastName = record.Last;
        this.user.City = record.City;
        this.user.Email = record.Email;
        this.user.Phone = record['Work Phone'];
        this.user.State = findStateName(record.STATE.trim())
        this.treasurer.Address = record['Address 1'] + record['Address 2'];
        this.treasurer.StateName = findStateName(record.STATE.trim())
        this.treasurer.Zipcode = record.ZIPCODE;
        this.newData.push({ ...this.user, ...this.treasurer });
        // console.log(this.user.State)
    }
}