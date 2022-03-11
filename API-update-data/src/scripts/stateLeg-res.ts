import { BaseFileReader } from '../models/baseFileReader.model';
import { ProjectNames } from '../models/ProjectNames.enum';
import { splitName } from '../util/splitName';
import { RiResWsInterface } from '../models/wsModels/RiRes.model';
import { StateLegWsInterface } from '../models/wsModels/stateLeg.model';
import { splitTwoCommaAddress, countCommas, splitOneCommaAddress } from '../util/splitAddress';
import { User } from '../models/user.model';
import { CampaignTreasurer } from '../models/campaignTreasurer.model';

export class StateLegRes extends BaseFileReader {
    constructor(public projectName: ProjectNames) {
        super(projectName)
    }

    filterRecords(record: StateLegWsInterface, wsName: string, fn: ProjectNames) {
        if (!!record.Name || !!record['Name ']) {

            if (wsName == 'Florida') {
                if (!!record['Campaign Treasurer']) this.splitNames(record['Campaign Treasurer'], 'treasurer')
                this.treasurer.TrPhone = record['Contact info House']
                this.splitNames(record['Name '], 'user')
            }
            else {
                this.user.Email = record['Contact info'];
                this.user.FirstName = splitName(record['Name']).firstName
                this.user.LastName = splitName(record['Name']).lastName
            }
            if (wsName == 'Utah') {
                this.splitAddress(record.Address, false, wsName, fn)
            }
            this.treasurer.TrEmail = record['Contact info House'];
            this.user.State = wsName;
            this.user.OrganizationLevelID = 71;
            if (!!this.user.FirstName && !!this.user.LastName && this.user.FirstName !== 'No')
                this.newData.push({ ...this.user, ...this.treasurer })
        }

    }
}




  // if (!!record.Name && record.Name.trim() !== 'No R incumbent') {
        //     // console.log('first split');
        //     this.user.FirstName = splitName(record.Name).firstName;
        //     this.user.LastName = splitName(record.Name).lastName;
        //     if (wsName == 'Florida' && !!record['Campaign Treasurer']) {
        //         this.treasurer.TrLastName = splitName(record['Campaign Treasurer']).firstName;
        //         this.treasurer.TrLastName = splitName(record['Campaign Treasurer']).lastName;
        //         this.user.Phone = record['Contact info'];
        //     } else if (wsName == 'Utah') {
        //         this.user.Email = record['Contact info'];
        //     } else {
        //         this.user.Email = record['Contact info'];
        //         this.user.Email = record['Contact info'];
        //     }
        // }
        // if (!!record['Name House'] && !!record.Name !== true) {
        //     // console.log('name house split');
        //     if (record['Name House'].trim() !== 'No R incumbent') {
        //         this.user.FirstName = splitName(
        //             record['Name House'].trim()
        //         ).firstName;
        //         this.user.LastName = splitName(
        //             record['Name House'].trim()
        //         ).lastName;
        //         if (!!record['Campaign Treasurer H']) {
        //             this.treasurer.TrLastName = splitName(
        //                 record['Campaign Treasurer H']
        //             ).firstName;
        //             this.treasurer.TrLastName = splitName(
        //                 record['Campaign Treasurer H']
        //             ).lastName;
        //         }
        //         if (wsName.trim() == 'Florida')
        //             this.user.Phone = record['Contact info House'];
        //         else this.user.Email = record['Contact info House'];
        //         if (wsName.trim() == 'Utah') {
        //             const commas = countCommas(record.Address_1);
        //             let address: any
        //             // if(commas == 1) address = splitOneCommaAddress(record.Address_1, wsName)
        //             if (commas == 2) {
        //                 address = splitTwoCommaAddress(record.Address_1)
        //                 this.treasurer.Address = address.address;
        //                 this.treasurer.Zipcode = address.zipcode;
        //                 this.treasurer.StateName = address.state;
        //                 this.user.City = address.city;
        //             }
        //         }
        //     }
        // }