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
var stateHouse = xlsx.readFile('../../../dist/StateHouseRes-updated.xlsx');
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
var emailMap = {};
var emailCopyCounter = 0;
var newEmailCounter = 0;
var updatedRecord = [];
var afterMattRecords = [];
files.forEach(function (file, index) {
    var mattLocketIndex = +Infinity;
    var ws = file.Sheets['New Data'];
    var wsJson = xlsx.utils.sheet_to_json(ws);
    wsJson.map(function (record, index) {
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
var updatedJSON = JSON.stringify(updatedRecord);
// const updatedJSONAfterMatt = JSON.stringify(afterMattRecords);
//----------WRITE JSON FILE ---------------//
fs.writeFile('./newRecords.json', updatedJSON, function (err) {
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
var newWB = xlsx.utils.book_new();
var newWS = xlsx.utils.json_to_sheet(updatedRecord);
xlsx.utils.book_append_sheet(newWB, newWS, 'New Data');
xlsx.writeFile(newWB, 'DataUpWithEmail.xlsx');
