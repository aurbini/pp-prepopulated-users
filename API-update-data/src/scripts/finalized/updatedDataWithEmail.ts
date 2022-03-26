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
const aiList = xlsx.readFile('../../../dist/AlList-updated.xlsx');
const brianRob = xlsx.readFile('../../../dist/BrianRob-updated.xlsx');
const Danyela = xlsx.readFile('../../../dist/Danyela-updated.xlsx');
const frankie = xlsx.readFile('../../../dist/FrankieRes-updated.xlsx');
const stateHouse = xlsx.readFile('../../../dist/StateHouseRes-updated.xlsx');
const candNew = xlsx.readFile('../../../dist/CandNew-updated.xlsx');

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

const emailMap: any = {};
let emailCopyCounter = 0;
let newEmailCounter = 0;

var updatedRecord: any[] = [];
var afterMattRecords: any[] = [];
files.forEach((file, index) => {
  const ws = file.Sheets['New Data'];
  const wsJson = xlsx.utils.sheet_to_json(ws);
  wsJson.map((record: any, index: number) => {
    if (!record.Email && record.TrEmail) {
      record.Email == record.TrEmail;
    }
    if (
      record.FirstName &&
      record.LastName &&
      !record.Email?.includes('http') &&
      !!record.Email
    ) {
      if (record.Email.includes('@')) {
        if (emailMap[record.Email.trim()]) {
          emailCopyCounter++;
        } else {
          updatedRecord.push(record);
        }
      }
      emailMap[record.Email.trim()] = true;
    }
  });
});

console.log({ emailCopyCounter });
console.log({ updated: updatedRecord.length });
// console.log(updatedRecord.slice(0, 20));

//-----------JSON DATA-CREATION---------------//
const updatedJSON = JSON.stringify(updatedRecord);
//----------WRITE JSON FILE ---------------//
fs.writeFile('./newRecords.json', updatedJSON, (err: any) => {
  if (err) {
    console.log('Error writing file', err);
  } else {
    console.log('Successfully wrote file');
  }
});
//-----------EXCEL DATA CREATION--------------//
const newWB = xlsx.utils.book_new();
const newWS = xlsx.utils.json_to_sheet(updatedRecord);

xlsx.utils.book_append_sheet(newWB, newWS, 'New Data');

xlsx.writeFile(newWB, 'newCandidates.xlsx');
