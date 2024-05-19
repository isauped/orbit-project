import { parseCSV, readCSVFile, parseCSVContent, convertLinesToJSONString } from '../src/csv-converter';
import fs from 'fs';

describe('CSV to JSON Converter', () => {
  const exampleCSV = `name,age\nJohn,30\nJane,25`;
  const exampleJSON = `[
  {
    "name": "John",
    "age": "30"
  },
  {
    "name": "Jane",
    "age": "25"
  }
]`;

  test('readCSVFile should read the content of a CSV file', () => {
    // Mock the fs.readFileSync method
    jest.spyOn(fs, 'readFileSync').mockReturnValue(exampleCSV);
    const content = readCSVFile('path/to/example.csv');
    expect(content).toBe(exampleCSV);
  });

  test('parseCSVContent should split CSV content into lines', () => {
    const lines = parseCSVContent(exampleCSV);
    expect(lines).toEqual(['name,age', 'John,30', 'Jane,25']);
  });

  test('convertLinesToJSONString should convert lines to JSON string', () => {
    const lines = ['name,age', 'John,30', 'Jane,25'];
    const jsonString = convertLinesToJSONString(lines);
    expect(jsonString).toBe(exampleJSON);
  });

  test('parseCSV should parse CSV file and return JSON string', () => {
    // Mock the readCSVFile function
    jest.spyOn(fs, 'readFileSync').mockReturnValue(exampleCSV);
    const jsonResult = parseCSV('path/to/example.csv');
    expect(jsonResult).toBe(exampleJSON);
  });
});
