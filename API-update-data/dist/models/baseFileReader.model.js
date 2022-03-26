"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseFileReader = void 0;
const xlsx = require('xlsx');
const ProjectNames_enum_1 = require("./ProjectNames.enum");
const user_model_1 = require("./user.model");
const campaignTreasurer_model_1 = require("./campaignTreasurer.model");
const splitName_1 = require("../util/splitName");
const splitAddress_1 = require("../util/splitAddress");
const findStateName_1 = require("../util/findStateName");
class BaseFileReader {
    constructor(fn) {
        this.fn = fn;
        this.newData = [];
        this.treasurer = new campaignTreasurer_model_1.CampaignTreasurer();
        this.user = new user_model_1.User();
        this.range = 0;
        this.workbook = xlsx.readFile(`../data/${fn}` + '.xlsx');
        this.wsNames = this.workbook.SheetNames;
        this.goThroughWorkSheets();
    }
    goThroughWorkSheets() {
        this.wsNames.forEach((wsName) => {
            const ws = this.workbook.Sheets[wsName];
            if (this.fn == ProjectNames_enum_1.ProjectNames.EmilyState ||
                this.fn == ProjectNames_enum_1.ProjectNames.StateLeg ||
                this.fn == ProjectNames_enum_1.ProjectNames.RiRes) {
                this.range = 1;
            }
            if (this.fn == ProjectNames_enum_1.ProjectNames.JacobRes)
                this.range = 2;
            const wsJson = xlsx.utils.sheet_to_json(ws, { range: this.range });
            this.goThroughWorkSheet(wsJson, wsName);
        });
        this.createNewFile();
    }
    goThroughWorkSheet(wsJson, wsName) {
        wsJson.map((record) => {
            this.filterRecords(record, wsName, this.fn);
        });
    }
    filterRecords(record, wsName, _fn) {
        // console.log(record)
    }
    pushNewData() {
        this.newData.push(Object.assign(Object.assign({}, this.user), this.treasurer));
    }
    createNewFile() {
        const newWB = xlsx.utils.book_new();
        const newWS = xlsx.utils.json_to_sheet(this.newData);
        xlsx.utils.book_append_sheet(newWB, newWS, 'New Data');
        xlsx.writeFile(newWB, `${this.fn}-updated` + '.xlsx');
    }
    splitNames(name, nameType) {
        if (nameType == 'user') {
            this.user.FirstName = (0, splitName_1.splitName)(name).firstName;
            this.user.LastName = (0, splitName_1.splitName)(name).lastName;
        }
        else if (nameType == 'treasurer') {
            this.treasurer.TrFirstName = (0, splitName_1.splitName)(name).firstName;
            this.treasurer.TrLastName = (0, splitName_1.splitName)(name).lastName;
        }
    }
    splitAddress(address, meshed, state, fn) {
        // console.log(address)
        let fullState = state;
        let splitAddress = {};
        if (state.length == 2) {
            fullState = (0, findStateName_1.findStateName)(state);
        }
        if (meshed) {
            return (0, splitAddress_1.splitAddressMeshed)(address, fullState);
        }
        const commaCounter = (0, splitAddress_1.countCommas)(address);
        if (commaCounter == 1) {
            splitAddress = (0, splitAddress_1.splitOneCommaAddress)(address, state, fn);
        }
        else if (commaCounter == 2) {
            splitAddress = (0, splitAddress_1.splitTwoCommaAddress)(address, state, fn);
        }
        else if (commaCounter == 3) {
            splitAddress = (0, splitAddress_1.splitThreeCommaAddress)(address, fullState);
        }
        if (!!splitAddress.address) {
            this.treasurer.Address = splitAddress.address;
            this.user.City = splitAddress.city;
            this.treasurer.StateName = splitAddress.state;
            this.treasurer.Zipcode = splitAddress.zipcode;
        }
    }
}
exports.BaseFileReader = BaseFileReader;
