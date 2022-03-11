import { BaseFileReader } from '../models/baseFileReader.model';
import { ProjectNames } from '../models/ProjectNames.enum';
import { splitTwoCommaAddress, splitOneCommaAddress } from '../util/splitAddress';
import { EmilyStateWsInterface } from '../models/wsModels/emilyState.model';
import { splitMiddleName } from '../util/splitMiddleName';
import { JacobResWsInterface } from '../models/wsModels/jacobRes.model';
import { splitName } from '../util/splitName';

export class JacobRes extends BaseFileReader {
    constructor(public projectName: ProjectNames) {
        super(projectName)
    }

    filterRecords(record: JacobResWsInterface, wsName: string, projectName: ProjectNames) {
        if (!!record.NAME) {
            this.user.FirstName = splitName(record.NAME).firstName;
            this.user.LastName = splitName(record.NAME).lastName;

            if (!!record.TREASURER) {
                this.treasurer.TrFirstName = splitName(record.TREASURER).firstName;
                this.treasurer.TrLastName = splitName(record.TREASURER).lastName;
            }
            if (!!record.ADDRESS) {
                const address = splitOneCommaAddress(record.ADDRESS, wsName);
                this.treasurer.Address = address.address;
                this.treasurer.Zipcode = address.zipcode;
                this.treasurer.StateName = address.state;

            }
            if (!!record['PHONE & EMAIL']) {
                const contactSplit = record['PHONE & EMAIL'].split(';');
                contactSplit.map((record: string) => {
                    if (record.includes('@')) {
                        this.user.Email = record;
                    } else {
                        this.user.Phone = record;
                    }
                });
            }

            if (record.ADDRESS) {
                this.splitAddress(record.ADDRESS, false, wsName, projectName);
            }
            this.user.OrganizationTypeID = 71;
            this.user.OrganizationLevelID = 2;
            this.newData.push({ ...this.user, ...this.treasurer });
        }
    }
}