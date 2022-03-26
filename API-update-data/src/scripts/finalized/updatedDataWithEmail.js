var xlsx = require('xlsx');
var converter = require('json-2-csv');
var fs = require('fs');
var ayaCal = xlsx.readFile('../../../dist/AyaAndCal-updated.xlsx');
var aya = xlsx.readFile('../../../dist/AyaRes-updated.xlsx');
var calState = xlsx.readFile('../../../dist/CalStateRes-updated.xlsx');
var cristinaStLeg = xlsx.readFile('../../../dist/CristinaStLeg-updated.xlsx');
var crisTravis = xlsx.readFile('../../../dist/FedCrisTravis-updated.xlsx');
var delgado = xlsx.readFile('../../../dist/DelgadoStRes-updated.xlsx');
var emilySt = xlsx.readFile('../../../dist/EmilyState-updated.xlsx');
var jacobSt = xlsx.readFile('../../../dist/JacobRes-updated.xlsx');
var ri = xlsx.readFile('../../../dist/RiRes-updated.xlsx');
var stateLeg = xlsx.readFile('../../../dist/StateLeg-updated.xlsx');
var coLeg = xlsx.readFile('../../../dist/StateLegCOGA-updated.xlsx');
var travis = xlsx.readFile('../../../dist/TravisRes-updated.xlsx');
var aiList = xlsx.readFile('../../../dist/AlList-updated.xlsx');
var brianRob = xlsx.readFile('../../../dist/BrianRob-updated.xlsx');
var Danyela = xlsx.readFile('../../../dist/Danyela-updated.xlsx');
var frankie = xlsx.readFile('../../../dist/FrankieRes-updated.xlsx');
var stateHouse = xlsx.readFile('../../../dist/StateHouseRes-updated.xlsx');
var candNew = xlsx.readFile('../../../dist/CandNew-updated.xlsx');
var files = [
    candNew,
    aiList,
    brianRob,
    Danyela,
    frankie,
    aya,
    ayaCal,
    calState,
    stateHouse,
    cristinaStLeg,
    crisTravis,
    delgado,
    emilySt,
    jacobSt,
    ri,
    stateLeg,
    coLeg,
    travis,
];
var emailMap = {};
var emailCopyCounter = 0;
var newEmailCounter = 0;
var updatedRecord = [];
var afterMattRecords = [];
files.forEach(function (file, index) {
    var ws = file.Sheets['New Data'];
    var wsJson = xlsx.utils.sheet_to_json(ws);
    wsJson.map(function (record, index) {
        var _a;
        if (!record.Email && record.TrEmail) {
            record.Email == record.TrEmail;
        }
        if (record.FirstName &&
            record.LastName &&
            !((_a = record.Email) === null || _a === void 0 ? void 0 : _a.includes('http')) &&
            !!record.Email) {
            if (record.Email.includes('@')) {
                if (emailMap[record.Email.trim()]) {
                    emailCopyCounter++;
                }
                else {
                    updatedRecord.push(record);
                }
            }
            emailMap[record.Email.trim()] = true;
        }
    });
});
console.log({ emailCopyCounter: emailCopyCounter });
console.log({ updated: updatedRecord.length });
// console.log(updatedRecord.slice(0, 20));
//-----------JSON DATA-CREATION---------------//
var updatedJSON = JSON.stringify(updatedRecord);
//----------WRITE JSON FILE ---------------//
fs.writeFile('./newRecords.json', updatedJSON, function (err) {
    if (err) {
        console.log('Error writing file', err);
    }
    else {
        console.log('Successfully wrote file');
    }
});
//-----------EXCEL DATA CREATION--------------//
var newWB = xlsx.utils.book_new();
var newWS = xlsx.utils.json_to_sheet(updatedRecord);
xlsx.utils.book_append_sheet(newWB, newWS, 'New Data');
xlsx.writeFile(newWB, 'newCandidates.xlsx');
