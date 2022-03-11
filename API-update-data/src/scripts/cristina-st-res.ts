
import { BaseFileReader } from '../models/baseFileReader.model';
import { ProjectNames } from '../models/ProjectNames.enum';
import { splitName } from '../util/splitName';
import { DelgadoWsInterface } from '../models/wsModels/delgadoStRes';
import { CristinaWsInterface } from '../models/wsModels/Cristina.model';
import { findStateName } from '../util/findStateName';

export class CristinaStRes extends BaseFileReader {
    constructor(public projectName: ProjectNames) {
        super(projectName)
    }

    filterRecords(record: CristinaWsInterface, wsName: string, fn: ProjectNames) {
        if (!record.Name.includes(',')) {
            this.user.FirstName = splitName(record.Name).firstName;
            this.user.LastName = splitName(record.Name).lastName;
        } else {
            this.user.FirstName = record.Name.split(' ')[1];
            this.user.LastName = record.Name.split(' ')[0];
        }
        if (wsName == 'GA' && record.Phone)
            this.user.Phone = record.Phone.slice(0, 13);
        else this.user.Phone = record.Phone;

        this.user.Email = record.Email;

        if (!!record.Address && wsName == 'OK' || wsName == 'AR') {
            this.splitAddress(record.Address, false, wsName, fn)
        } else {
            this.user.State = findStateName(wsName);
            this.treasurer.StateName = findStateName(wsName);
        }
        if (!!record.Treasurer) {
            if (wsName == 'CO') {
                const treas = record.Treasurer.split('-');
                this.treasurer.TrFirstName = treas[0];
                this.treasurer.TrLastName = treas[1];
            }
            if (record.Treasurer.includes('Candidate')) {
                this.treasurer.TrFirstName = this.user.FirstName;
                this.treasurer.TrLastName = this.user.LastName;
            } else {
                this.treasurer.TrFirstName = splitName(record.Treasurer).firstName;
                this.treasurer.TrLastName = splitName(record.Treasurer).lastName;
            }
        }
        this.user.OrganizationTypeID = 71;
        this.newData.push({ ...this.user, ...this.treasurer });
    }
}
