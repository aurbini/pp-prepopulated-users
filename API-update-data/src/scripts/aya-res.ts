import { BaseFileReader } from '../models/baseFileReader.model';
import { ProjectNames } from '../models/ProjectNames.enum';
import { AyaResWsModel } from '../models/wsModels/ayaRes.model';
import { splitName } from '../util/splitName';
import { splitPhoneEmail } from '../util/splitPhoneEmail';

export class AyaRes extends BaseFileReader {
  constructor(public projectName: ProjectNames) {
    super(projectName)
  }
  filterRecords(record: AyaResWsModel, wsName: string) {
    if (!!record['Name'] && !!record['Treasurer']) {
      this.user.FirstName = splitName(record.Name).firstName;
      this.user.LastName = splitName(record.Name).lastName;

      if (!!record.Contact) {
        this.user.Email = splitPhoneEmail(record.Contact).email;
        this.user.Phone = splitPhoneEmail(record.Contact).phone;
      }

      this.treasurer.TrFirstName = splitName(record.Treasurer).firstName;
      this.treasurer.TrLastName = splitName(record.Treasurer).lastName;

      if (
        !!record['Treasurer Contact'] &&
        typeof record['Treasurer Contact'] != 'number' &&
        wsName != 'Montana Upcoming Races'
      ) {
        if (record['Treasurer Contact'].includes('@')) {
          this.treasurer.TrEmail = splitPhoneEmail(
            record['Treasurer Contact']
          ).email;
          this.treasurer.TrPhone = splitPhoneEmail(
            record['Treasurer Contact']
          ).phone;
        } else if (wsName !== 'Nebraska') {
          this.treasurer.TrPhone == record['Treasurer Contact'];
        }
      }

      this.user.State = wsName.split(' ')[0];


      this.newData.push({ ...this.user, ...this.treasurer });
    }
  }
}
