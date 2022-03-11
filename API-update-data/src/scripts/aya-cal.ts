import { BaseFileReader } from '../models/baseFileReader.model';
import { ProjectNames } from '../models/ProjectNames.enum';
import { splitName } from '../util/splitName';
import { splitPhoneEmail } from '../util/splitPhoneEmail';
import { AyaCalWsInterface } from '../models/wsModels/AyaCal.model';
import { findStateName } from '../util/findStateName';
import { reverseName } from '../util/reverseName';

export class AyaCalRes extends BaseFileReader {
    constructor(public projectName: ProjectNames) {
        super(projectName)
    }
    filterRecords(record: AyaCalWsInterface, wsName: string) {
        if (!!record['Senators'] && !!record['Treasurer']) {
            this.user.FirstName = splitName(record.Senators).firstName;
            this.user.LastName = splitName(record.Senators).lastName;

            if (!!record.Contact) {
                this.user.Email = splitPhoneEmail(record.Contact).email;
                this.user.Phone = splitPhoneEmail(record.Contact).phone;
            }

            if (record.Treasurer.includes(',')) {
                record.Treasurer = reverseName(record.Treasurer);
            }
            this.treasurer.TrFirstName = splitName(record.Treasurer).firstName;
            this.treasurer.TrLastName = splitName(record.Treasurer).lastName;

            if (!!record['Treasurer info']) {
                this.user.Email = splitPhoneEmail(record['Treasurer info']).email;
                this.user.Phone = splitPhoneEmail(record['Treasurer info']).phone;
            }

            this.user.State = findStateName(wsName);
            this.treasurer.StateName = findStateName(wsName);
            this.user.OrganizationTypeID = 71;
            this.newData.push({ ...this.user, ...this.treasurer });
        }
    }
}
