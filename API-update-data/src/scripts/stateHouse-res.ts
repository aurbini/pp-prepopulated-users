import { BaseFileReader } from '../models/baseFileReader.model';
import { ProjectNames } from '../models/ProjectNames.enum';
import { splitTwoCommaAddress } from '../util/splitAddress';
import { EmilyStateWsInterface } from '../models/wsModels/emilyState.model';
import { splitMiddleName } from '../util/splitMiddleName';
import { stateHouseWsInterface } from '../models/wsModels/stateHouse.model';

export class StateHouseRes extends BaseFileReader {
    constructor(public projectName: ProjectNames) {
        super(projectName)
    }

    filterRecords(record: stateHouseWsInterface, wsName: string, fn: ProjectNames) {
        if (wsName.trim() == 'Florida') return;
        if (wsName !== 'Missouri' && wsName !== 'Maryland' && wsName !== 'Virginia') {
            if (!record['Name House']) return
            this.user.FirstName = splitMiddleName(
                record['Name House'].trim()
            ).firstName;
            this.user.LastName = splitMiddleName(
                record['Name House'].trim()
            ).lastName;
            if (!!record['Campaign Treasurer']) {
                this.treasurer.TrFirstName = splitMiddleName(
                    record['Campaign Treasurer']
                ).firstName;
                this.treasurer.TrLastName = splitMiddleName(
                    record['Campaign Treasurer']
                ).lastName;
            }
            this.user.Email = record['Contact info House'];

        }
        else {
            if (!record['First Name']) return;
            this.user.FirstName = record['First Name'];
            this.user.LastName = record['Last Name'];
            this.user.Phone = record.Phone
            if (record.Email) {
                this.user.Email = record.Email
            }
            if (wsName == 'Maryland') {
                this.treasurer.Address = record['Campaign Address']
                const splitAddress = record.__EMPTY.split(' ')
                if (splitAddress.length == 3) {
                    this.user.City = splitAddress[0];
                    this.treasurer.Zipcode = splitAddress[2]
                } else {
                    this.user.City = splitAddress[0] + ' ' + splitAddress[1]
                    this.treasurer.Zipcode = splitAddress[3]
                }
                this.treasurer.Zipcode
            }
        }
        if (wsName == 'Utah') {
            if (record.Address) {
                this.splitAddress(record.Address, false, wsName, this.projectName);
            }
        }
        this.user.State = wsName;
        this.user.OrganizationTypeID = 70;
        this.treasurer.StateName = wsName;
        if (this.user.FirstName && this.user.LastName) {
            this.newData.push({ ...this.user, ...this.treasurer });
        }
    }
}