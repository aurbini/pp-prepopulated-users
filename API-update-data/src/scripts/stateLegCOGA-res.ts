import { BaseFileReader } from '../models/baseFileReader.model';
import { ProjectNames } from '../models/ProjectNames.enum';
import { splitName } from '../util/splitName';
import { splitOneCommaAddress, fullAddress, splitTwoCommaAddress } from '../util/splitAddress';
import { stateLegCOGAWsInterface } from '../models/wsModels/stateLegCOGA';
import { findStateName } from '../util/findStateName';



export class StateLegCOGA extends BaseFileReader {
    constructor(public projectName: ProjectNames) {
        super(projectName)
    }
    filterRecords(record: stateLegCOGAWsInterface, wsName: string, fn: ProjectNames) {
        this.user.FirstName = splitName(record.Name).firstName;
        this.user.LastName = splitName(record.Name).lastName;

        if (!!record.Treasurer) {
            if (wsName == 'CO') {
                record.Treasurer = record.Treasurer.split('-')[0];
                this.treasurer.TrFirstName = splitName(record.Treasurer).firstName;
                this.treasurer.TrLastName = splitName(record.Treasurer).lastName;
            }
            if (record.Treasurer.trim().includes('Candidate') || record.Treasurer.trim().includes('himself')) {
                this.treasurer.TrFirstName = this.user.FirstName;
                this.treasurer.TrLastName = this.user.LastName;
            } else if (record.Treasurer.trim().includes('No Committee') || record.Treasurer.trim().includes('N/A') || record.Treasurer.trim().includes('n/a')) {
                this.treasurer.TrFirstName = splitName(record.Treasurer).firstName;
                this.treasurer.TrLastName = splitName(record.Treasurer).lastName;
            }
        }
        // console.log(record)
        if (record.Address) {
            this.splitAddress(record.Address, false, wsName, fn)
        }
        this.treasurer.TrEmail = record['Email'];
        this.user.Phone = record['Phone'];
        this.user.OrganizationLevelID = 71;
        this.newData.push({ ...this.user, ...this.treasurer });
    }
}