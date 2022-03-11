import { BaseFileReader } from '../models/baseFileReader.model';
import { ProjectNames } from '../models/ProjectNames.enum';
import { splitName } from '../util/splitName';
import { CrisTravisWsInterface } from '../models/wsModels/CrisTravis.model';

export class CrisTravis extends BaseFileReader {
    constructor(public projectName: ProjectNames) {
        super(projectName)
    }

    filterRecords(record: CrisTravisWsInterface, wsName: string, fn: ProjectNames) {
        if (!record.Politician || wsName == 'MA') return;
        this.user.FirstName = splitName(record.Politician).firstName;
        this.user.LastName = splitName(record.Politician).lastName;

        if (wsName != 'WI') {

            this.treasurer.TrFirstName = splitName(record.Treasurer).firstName;
            this.treasurer.TrLastName = splitName(record.Treasurer).lastName;
        } else {

            this.treasurer.TrFirstName = splitName(record['Treasurer ']).firstName;
            this.treasurer.TrLastName = splitName(record['Treasurer ']).lastName;
        }
        this.user.Phone = record.Phone;
        this.user.Email = record.Email;


        if (record.Email) this.user.Email;
        if (!!record.Treasurer) {
            this.treasurer.TrFirstName = splitName(record.Treasurer).firstName;
            this.treasurer.TrLastName = splitName(record.Treasurer).lastName;
        }

        if (record.Address) {
            this.splitAddress(record.Address, false, wsName, fn)
        }
        this.user.OrganizationTypeID = 1;

        this.newData.push({
            ...this.user,
            ...this.treasurer,
        });
    }
}


    // campaignDetails.State = address.state;
            // campaignDetails.OrganizationLevelID = '2';
            // campaignDetails.State = address.state;
            // campaignInfo.OfficeTypeId = 71;
            // contactInfo.CampAddress = address.address;
            // contactInfo.CampEmail = address.address;
            // contactInfo.CampZipcode = address.zipcode;
            // contactInfo.StateName = address.state;