"use strict";
const xlsx = require('xlsx');
const converter = require('json-2-csv');
const fs = require('fs');
const ayaCal = xlsx.readFile('../../../dist/AyaAndCal-updated.xlsx');
const aya = xlsx.readFile('../../../dist/AyaRes-updated.xlsx');
const calState = xlsx.readFile('../../../dist/CalStateRes-updated.xlsx');
const cristinaStLeg = xlsx.readFile('../../../dist/CristinaStLeg-updated.xlsx');
const crisTravis = xlsx.readFile('../../../dist/FedCrisTravis-updated.xlsx');
const delgado = xlsx.readFile('../../../dist/DelgadoStRes-updated.xlsx');
const emilySt = xlsx.readFile('../../../dist/EmilyState-updated.xlsx');
const jacobSt = xlsx.readFile('../../../dist/JacobRes-updated.xlsx');
const ri = xlsx.readFile('../../../dist/RiRes-updated.xlsx');
const stateLeg = xlsx.readFile('../../../dist/StateLeg-updated.xlsx');
const coLeg = xlsx.readFile('../../../dist/StateLegCOGA-updated.xlsx');
const travis = xlsx.readFile('../../../dist/TravisRes-updated.xlsx');
const stateHouse = xlsx.readFile('../../../dist/StateHouseRes-updated.xlsx');
var files = [
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
const emailMap = {};
let emailCopyCounter = 0;
let newEmailCounter = 0;
var updatedRecord = [];
var afterMattRecords = [];
files.forEach((file, index) => {
    let mattLocketIndex = +Infinity;
    const ws = file.Sheets['New Data'];
    const wsJson = xlsx.utils.sheet_to_json(ws);
    wsJson.map((record, index) => {
        if (record.FirstName && record.LastName) {
            if (!record.Email && record.TrEmail) {
                record.Email == record.TrEmail;
            }
            if (!!record.Email) {
                console.log(emailMap[record.Email]);
                if (emailMap[record.Email]) {
                    emailCopyCounter++;
                    console.log('return false');
                }
                else {
                    newEmailCounter++;
                    // if (record.FirstName.trim() == "Matt" && record.LastName == "Lockett") {
                    //     mattLocketIndex = index;
                    // }
                    if (index > mattLocketIndex)
                        afterMattRecords.push(record);
                    updatedRecord.push(record);
                }
            }
            emailMap[record.Email] = true;
        }
    });
});
// console.log(emailMap)
console.log(emailCopyCounter);
console.log(newEmailCounter);
// console.log(updatedRecord.slice(0, 20));
//-----------JSON DATA-CREATION---------------//
const updatedJSON = JSON.stringify(updatedRecord);
// const updatedJSONAfterMatt = JSON.stringify(afterMattRecords);
//----------WRITE JSON FILE ---------------//
fs.writeFile('./newRecords.json', updatedJSON, (err) => {
    if (err) {
        console.log('Error writing file', err);
    }
    else {
        console.log('Successfully wrote file');
    }
});
// fs.writeFile('./newRecordsAfterMatt.json', updatedJSON, (err: any) => {
//     if (err) {
//         console.log('Error writing file', err);
//     } else {
//         console.log('Successfully wrote file');
//     }
// });
// const newWBAfterMatt = xlsx.utils.book_new();
// const newWSAfterMatt = xlsx.utils.json_to_sheet(afterMattRecords);
// xlsx.utils.book_append_sheet(newWBAfterMatt, newWSAfterMatt, 'New Data');
// xlsx.writeFile(newWBAfterMatt, 'DataUpAfterMatt.xlsx');
//---------------CSV FILE CREATION----------//
// const createCsvWriter = require('csv-writer').createObjectCsvWriter;
// const csvWriter = createCsvWriter({
//   path: './updatedRecord.csv',
//   header: [
//     'candFirstName',
//     'candLastName',
//     'candPhone',
//     'candEmail',
//     'CandAddress',
//     'tFirstName',
//     'tLastName',
//     'tEmail',
//     'tPhone',
//     'tAddress',
//     'commNumber',
//   ].map((item) => ({ id: item, title: item })),
// });
// async function main() {
//   try {
//     await csvWriter.writeRecords(updatedRecord);
//   } catch (err) {
//     console.log(err);
//   }
// }
// main();
//-----------EXCEL DATA CREATION--------------//
const newWB = xlsx.utils.book_new();
const newWS = xlsx.utils.json_to_sheet(updatedRecord);
xlsx.utils.book_append_sheet(newWB, newWS, 'New Data');
xlsx.writeFile(newWB, 'DataUpWithEmail.xlsx');
