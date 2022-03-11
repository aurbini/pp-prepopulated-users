import { BaseFileReader } from './baseFileReader.model';
import { ProjectNames } from './ProjectNames.enum';

namespace App {

    export class FileReader extends BaseFileReader {
        constructor(public name: ProjectNames) {
            super(name)

        }


    }
}