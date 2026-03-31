const XLSX = require('xlsx');
const fs = require('fs');

const workbook = XLSX.readFile('docs/pertanyaan_interview_isa.xlsx');
const result = {};

workbook.SheetNames.forEach(sheetName => {
  result[sheetName] = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
});

fs.writeFileSync('docs/interview_all_sheets.json', JSON.stringify(result, null, 2));
console.log('Sheets extracted:', workbook.SheetNames);
