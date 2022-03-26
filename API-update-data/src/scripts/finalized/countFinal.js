var xlsx = require('xlsx');

var candNew = xlsx.readFile('newCandidates.xlsx');

var copyCounter = 0;
var newEmailCounter = 0;
var badEmail = 0;
const emailMap = {};

var ws = candNew.Sheets['New Data'];
var wsJson = xlsx.utils.sheet_to_json(ws);
wsJson.map(function (record, index) {
  //   console.log(record);
  //   console.log(record);
  if (
    record.Email.length < 3 ||
    !record.Email.includes('@') ||
    !record.FirstName ||
    !record.LastName
  ) {
    badEmail++;
  }
  if (emailMap[record.Email]) {
    copyCounter++;
  } else {
    newEmailCounter++;
    emailMap[record.Email] = true;
  }
});

console.log({ copyCounter });
console.log({ newEmailCounter });
console.log({ badEmail });
