import { BaseFileReader } from '../models/baseFileReader.model';
import { ProjectNames } from '../models/ProjectNames.enum';
import { candNewInterface } from '../models/wsModels/candNew.model';

export class candNewRes extends BaseFileReader {
  constructor(public projectName: ProjectNames) {
    super(projectName);
  }
  filterRecords(record: candNewInterface, wsName: string) {
    console.log(record);
    this.user.FirstName = record['First Name'];
    this.user.LastName = record['Last Name'];

    this.user.Email = record.Email;
    this.user.Phone = record.Phone;

    this.newData.push({ ...this.user, ...this.treasurer });
  }
}
