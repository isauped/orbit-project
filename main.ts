import { parseCSV } from './src/csv-converter';
const jsonResult = parseCSV('sample.csv');
console.log(jsonResult);