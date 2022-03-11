const xlsx = require('xlsx')

import { ProjectNames } from './ProjectNames.enum';
import { User } from './user.model';
import { AyaCalWsInterface } from './wsModels/AyaCal.model';
import { CampaignTreasurer } from './campaignTreasurer.model';
import { AyaResWsModel } from './wsModels/ayaRes.model';
import { CalStateWsInterface } from './wsModels/calState.model';
import { CrisTravisWsInterface } from './wsModels/CrisTravis.model';
import { DelgadoWsInterface } from './wsModels/delgadoStRes';
import { CristinaWsInterface } from './wsModels/Cristina.model';
import { EmilyStateWsInterface } from './wsModels/emilyState.model';
import { JacobResWsInterface } from './wsModels/jacobRes.model';
import { RiResWsInterface } from './wsModels/RiRes.model';
import { StateLegWsInterface } from './wsModels/stateLeg.model';
import { stateLegCOGAWsInterface } from './wsModels/stateLegCOGA';
import { TravisWsInterface } from './wsModels/travis.model';
import { splitName } from '../util/splitName';
import { countCommas, splitAddressMeshed, splitOneCommaAddress, splitTwoCommaAddress, fullAddress, splitThreeCommaAddress } from '../util/splitAddress';
import { findStateName } from '../util/findStateName';
import { StateHouseRes } from '../scripts/stateHouse-res';
import { stateHouseWsInterface } from './wsModels/stateHouse.model';

type wsModels = AyaCalWsInterface | AyaResWsModel | CalStateWsInterface | CrisTravisWsInterface | DelgadoWsInterface | CristinaWsInterface | EmilyStateWsInterface | JacobResWsInterface | RiResWsInterface | StateLegWsInterface | stateLegCOGAWsInterface | TravisWsInterface | stateHouseWsInterface

type nameType = 'treasurer' | 'user'

export class BaseFileReader {
    protected newData: User[] = [];

    workbook: any;
    wsNames: any
    treasurer: CampaignTreasurer = new CampaignTreasurer();
    user: User = new User();
    range: number = 0;

    constructor(public fn: ProjectNames) {
        this.workbook = xlsx.readFile(`../data/${fn}` + '.xlsx');
        this.wsNames = this.workbook.SheetNames;

        this.goThroughWorkSheets();
    }
    goThroughWorkSheets() {
        this.wsNames.forEach((wsName: string) => {
            const ws = this.workbook.Sheets[wsName];
            if (this.fn == ProjectNames.EmilyState || this.fn == ProjectNames.StateLeg || this.fn == ProjectNames.RiRes) {
                this.range = 1;
            }
            if (this.fn == ProjectNames.JacobRes) this.range = 2;
            const wsJson = xlsx.utils.sheet_to_json(ws, { range: this.range })
            this.goThroughWorkSheet(wsJson, wsName)
        })
        this.createNewFile();
    }
    goThroughWorkSheet(wsJson: wsModels[], wsName: string) {
        wsJson.map((record) => {
            this.filterRecords(record, wsName, this.fn)
        })
    }

    filterRecords(record: wsModels, wsName: string, _fn: ProjectNames) {
        // console.log(record)
    }

    pushNewData() {
        this.newData.push({
            ...this.user,
            ...this.treasurer
        })
    }

    createNewFile() {
        const newWB = xlsx.utils.book_new();
        const newWS = xlsx.utils.json_to_sheet(this.newData);

        xlsx.utils.book_append_sheet(newWB, newWS, 'New Data');

        xlsx.writeFile(newWB, `${this.fn}-updated` + '.xlsx');
    }

    splitNames(name: string, nameType: nameType) {
        if (nameType == 'user') {
            this.user.FirstName = splitName(name).firstName
            this.user.LastName = splitName(name).lastName
        } else if (nameType == 'treasurer') {
            this.treasurer.TrFirstName = splitName(name).firstName
            this.treasurer.TrLastName = splitName(name).lastName
        }
    }
    splitAddress(address: string, meshed: boolean, state: string, fn: ProjectNames) {
        // console.log(address)
        let fullState = state;
        let splitAddress: fullAddress = {}
        if (state.length == 2) {
            fullState = findStateName(state)
        }
        if (meshed) {
            return splitAddressMeshed(address, fullState)
        }
        const commaCounter = countCommas(address);
        if (commaCounter == 1) {
            splitAddress = splitOneCommaAddress(address, state, fn)
        } else if (commaCounter == 2) {
            splitAddress = splitTwoCommaAddress(address, state, fn);
        } else if (commaCounter == 3) {
            splitAddress = splitThreeCommaAddress(address, fullState);
        }
        if (!!splitAddress.address) {
            this.treasurer.Address = splitAddress.address;
            this.user.City = splitAddress.city;
            this.treasurer.StateName = splitAddress.state;
            this.treasurer.Zipcode = splitAddress.zipcode;
        }
    }
}
