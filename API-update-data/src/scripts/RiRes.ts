import { BaseFileReader } from '../models/baseFileReader.model';
import { ProjectNames } from '../models/ProjectNames.enum';
import { splitName } from '../util/splitName';
import { RiResWsInterface } from '../models/wsModels/RiRes.model';
import { findStateName } from '../util/findStateName';

export class RiRes extends BaseFileReader {
    constructor(public projectName: ProjectNames) {
        super(projectName)
    }

    filterRecords(record: RiResWsInterface, wsName: string) {
        if (!!record.Senators && !!record['Contact']) {

            const candContactSplit = [record['Contact'].slice(0, 14), record['Contact'].slice(14)];

            this.user.FirstName = splitName(record.Senators).firstName;
            this.user.LastName = splitName(record.Senators).lastName;

            this.user.Phone = candContactSplit[0].trim();
            this.user.Email = candContactSplit[1].trim();

            this.treasurer.TrFirstName = this.user.FirstName;
            this.treasurer.TrLastName = this.user.LastName;

            this.treasurer.TrEmail = this.user.Email;
            this.treasurer.TrPhone = this.user.Phone;

            this.treasurer.StateName = findStateName(wsName);
            this.user.OrganizationLevelID = 71;
            // console.log(this.user, this.treasurer)
            this.newData.push({ ...this.user, ...this.treasurer });
        }
    }
}