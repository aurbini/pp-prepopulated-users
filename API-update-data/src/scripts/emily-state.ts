import { BaseFileReader } from '../models/baseFileReader.model';
import { ProjectNames } from '../models/ProjectNames.enum';
import { splitTwoCommaAddress } from '../util/splitAddress';
import { EmilyStateWsInterface } from '../models/wsModels/emilyState.model';
import { splitMiddleName } from '../util/splitMiddleName';

export class EmilyStRes extends BaseFileReader {
    constructor(public projectName: ProjectNames) {
        super(projectName)
    }

    filterRecords(record: EmilyStateWsInterface, wsName: string, fn: ProjectNames) {
        if (!record.Name && wsName !== 'Texas') return;
        else if (wsName == "Texas" && !record.Name) return;
        if (wsName == "Missouri") return;
        if (!!record.Name && record.Name.trim() !== 'No R incumbent') {
            this.user.FirstName = splitMiddleName(record.Name).firstName;
            this.user.LastName = splitMiddleName(record.Name).lastName;
            if (wsName == 'Florida' && !!record['Campaign Treasurer']) {
                this.treasurer.TrFirstName = splitMiddleName(
                    record['Campaign Treasurer']
                ).firstName;
                this.treasurer.TrLastName = splitMiddleName(
                    record['Campaign Treasurer']
                ).lastName;
                this.user.Phone = record['Contact info'];
            } else if (wsName == 'Utah') {
                this.user.Email = record['Contact info'];
            } else {
                this.user.Email = record['Contact info'];
            }
        }

        if (wsName == 'Utah') {
            if (record.Address) {
                this.splitAddress(record.Address, false, wsName, this.projectName);
            }
        }
        if (record['Name House']) {
            this.user.OrganizationTypeID = 70;
        } else {
            this.user.OrganizationTypeID = 71;
        }
        this.user.State = wsName.trim();
        this.treasurer.StateName = wsName.trim()
        if (this.user.FirstName && this.user.LastName) {
            this.newData.push({ ...this.user, ...this.treasurer });
        }
    }
}