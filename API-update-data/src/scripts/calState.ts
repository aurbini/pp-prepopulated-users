import { BaseFileReader } from '../models/baseFileReader.model';
import { ProjectNames } from '../models/ProjectNames.enum';
import { splitName } from '../util/splitName';
import { splitPhoneEmail } from '../util/splitPhoneEmail';
import { CalStateWsInterface } from '../models/wsModels/calState.model';
import { findStateName } from '../util/findStateName';
import { countCommas } from '../util/splitAddress';

export class CalStateRes extends BaseFileReader {
    constructor(public projectName: ProjectNames) {
        super(projectName)
    }

    filterRecords(record: CalStateWsInterface, wsName: string) {
        const name = record['State Senate'].trim().split(' ');
        name.pop();
        name.pop();

        const treas: string = record['Committee Treasurer info']

        this.user.FirstName = splitName(name.join(' ')).firstName;
        this.user.LastName = splitName(name.join(' ')).lastName;
        this.user.State = findStateName(wsName.trim());
        this.treasurer.StateName = findStateName(wsName.trim());
        // console.log(wsName)

        if (!!record['Contact info'] == false) {
            return;
        }
        const commas = countCommas(record['Contact info'])
        if (wsName == 'MN' && commas > 1 && !record['Contact info'].includes('cell')) {

            const infoToArray = record['Contact info'].split(',')
            // console.log(infoToArray)
            this.user.Email = infoToArray[1].trim();
            this.user.Phone = infoToArray[0].trim();

            if (infoToArray[1].trim().includes('/')) this.user.Email = infoToArray[1].trim().split('/')[0]
        } else if (wsName !== 'MN') {

            this.user.Email = splitPhoneEmail(record['Contact info']).email;
            this.user.Phone = splitPhoneEmail(record['Contact info']).phone;
        }

        // if (wsName == 'MN') console.log(this.user)

        if (wsName == 'CA') {
            this.treasurer.TrFirstName = '';
            this.treasurer.TrLastName = '';
            this.treasurer.TrPhone = treas;
            this.user.Phone = treas;
        }
        if (!!treas && wsName !== 'WI' && wsName !== 'MN') {
            // console.log(wsName)
            if (!!treas.includes('Himself') || !!treas.includes('himself') || !!treas.includes('Herself') || !!treas.includes('herself') || !!treas.includes('C.O.S')) {
                this.treasurer.TrFirstName = this.user.FirstName;
                this.treasurer.TrLastName = this.user.LastName;
            }
        }
        if ((wsName == "WI" || wsName == "MN") && !!treas) {


            const phoneIndex = treas.indexOf('(');

            this.treasurer.TrFirstName = splitName(treas.slice(0, phoneIndex)).firstName;
            this.treasurer.TrLastName = splitName(treas.slice(0, phoneIndex)).lastName;

            this.treasurer.TrPhone = treas.slice(phoneIndex, phoneIndex + 15);
            if (wsName !== 'WI') this.treasurer.TrEmail = treas.slice(phoneIndex + 15);

        }
        if (wsName == 'AZ') {
            this.treasurer.TrFirstName = splitName(treas).firstName;
            this.treasurer.TrLastName = splitName(treas).lastName;
        }
        if ((wsName == 'CA')) {
            this.treasurer.TrPhone = treas;
        }
        else if ((wsName == 'AK' || wsName == 'LA') && !!treas) {
            const phoneIndex = treas.indexOf('-') - 3;
            this.treasurer.TrFirstName = splitName(treas.slice(0, phoneIndex)).firstName;
            this.treasurer.TrLastName = splitName(treas.slice(0, phoneIndex)).lastName;

            this.treasurer.TrPhone = treas.slice(phoneIndex, phoneIndex + 15);
            this.treasurer.TrEmail = treas.slice(phoneIndex + 15);
        }
        // console.log(this.treasurer)
        this.user.OrganizationTypeID = 71;
        this.newData.push({ ...this.user, ...this.treasurer });
    }
}