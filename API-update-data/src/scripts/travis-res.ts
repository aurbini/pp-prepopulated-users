import { BaseFileReader } from '../models/baseFileReader.model';
import { ProjectNames } from '../models/ProjectNames.enum';
import { splitName } from '../util/splitName';
import { TravisWsInterface } from '../models/wsModels/travis.model';
import { findStateName } from '../util/findStateName';


export class TravisRes extends BaseFileReader {
    constructor(public projectName: ProjectNames) {
        super(projectName)
    }
    filterRecords(record: TravisWsInterface, wsName: string, fn: ProjectNames) {
        if (record.Name.includes(',')) {
            let reverseName: string = '';
            const name = record.Name.split(',');
            for (let i = name.length; i > 0; i--) {
                reverseName += name[i];
            }
            record.Name = reverseName;
        }
        this.user.FirstName = splitName(record.Name).firstName;
        this.user.LastName = splitName(record.Name).lastName;

        if (!!record.Treasurer) {
            this.treasurer.TrFirstName = splitName(record.Treasurer).firstName;
            this.treasurer.TrLastName = splitName(record.Treasurer).lastName;
        }
        if (!!record['T email']) this.treasurer.TrEmail = record['T email'];
        if (!!record['t email']) this.treasurer.TrEmail = record['t email'];

        if (!!record['contact info']) this.user.Phone = record['contact info'];
        if (!!record.Email) this.user.Email = record.Email;
        if (!!record.Phone) this.user.Phone = record.Phone;

        this.user.State = findStateName(wsName);

        if (record.Address) {
            this.splitAddress(record.Address, true, wsName, fn)
        }
        this.user.OrganizationLevelID = 71;

        this.newData.push({ ...this.user, ...this.treasurer });
    }
}