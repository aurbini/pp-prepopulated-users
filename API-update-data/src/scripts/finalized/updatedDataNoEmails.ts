"use strict";
var xlsx = require("xlsx");

var aya = xlsx.readFile('../dist/newData/AyaRes-updated.xlsx');
var ayaAndCal = xlsx.readFile('../dist/newData/AyaAndCal-updated.xlsx');
const calvinState = xlsx.readFile('../dist/newData/CalStateRes-updated.xlsx');
var cristinaStLeg = xlsx.readFile('../dist/newData/CristinaStLeg-updated.xlsx');
var crisTravis = xlsx.readFile('../dist/newData/FedCrisTravis-updated.xlsx');
var delgado = xlsx.readFile('../dist/newData/DelgadoStRes-updated.xlsx');
var emilySt = xlsx.readFile('../dist/newData/EmilyState-updated.xlsx');
// var gopFed = xlsx.readFile('.xlsx');
var jacobSt = xlsx.readFile('../dist/newData/JacobRes-updated.xlsx');
var ri = xlsx.readFile('../dist/newData/RiRes-updated.xlsx');
var stateLeg = xlsx.readFile('../dist/newData/StateLeg-updated.xlsx');
var coLeg = xlsx.readFile('../dist/newData/StateLegCOGA-updated.xlsx');
var travis = xlsx.readFile('../dist/newData/TravisRes-updated.xlsx');

var files = [
    aya,
    ayaAndCal,
    // calvinState,
    cristinaStLeg,
    crisTravis,
    delgado,
    emilySt,
    // gopFed,
    jacobSt,
    ri,
    stateLeg,
    coLeg,
    travis,
];
export function updatedDataNoEmail() {
    var updatedRecord: any[] = [];
    files.forEach(function (file: any) {
        var ws = file.Sheets['New Data'];
        var wsJson = xlsx.utils.sheet_to_json(ws);
        wsJson.map(function (record: any) {
            console.log(record);
            if (
                !!record.candFirstName ||
                !!record.tfirstName ||
                !!record.candLastName
            ) {
                if (!!record.candEmail == false && !!record.tEmail == false) {
                    updatedRecord.push(record);
                }
            }
        });
    });
    console.log(updatedRecord.slice(0, 20));
    const newWB = xlsx.utils.book_new();
    const newWS = xlsx.utils.json_to_sheet(updatedRecord);
    xlsx.utils.book_append_sheet(newWB, newWS, 'New Data');
    xlsx.writeFile(newWB, 'DataUpNoEmail2.xlsx');

}
