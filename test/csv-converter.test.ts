import { parseCSV, readCSVFile, parseCSVContent, convertLinesToJSONString } from '../src/csv-converter';
import * as fs from 'fs';

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
    jest.spyOn(fs, 'readFileSync').mockReturnValue(exampleCSV);
    const jsonResult = parseCSV('path/to/example.csv');
    expect(jsonResult).toBe(exampleJSON);
  });

  test('should handle empty CSV file', () => {
    const emptyCSV = '';
    jest.spyOn(fs, 'readFileSync').mockReturnValue(emptyCSV);
    const jsonResult = parseCSV('path/to/empty.csv');
    expect(jsonResult).toBe('[]');
  });

  test('should handle CSV file with only headers', () => {
    const headersOnlyCSV = 'name,age';
    const expectedJSON = '[]';
    jest.spyOn(fs, 'readFileSync').mockReturnValue(headersOnlyCSV);
    const jsonResult = parseCSV('path/to/headersOnly.csv');
    expect(jsonResult).toBe(expectedJSON);
  });

  test('should handle CSV file with extra commas', () => {
    const extraCommasCSV = 'name,age\nJohn,30,\nJane,25,';
    const expectedJSON = `[
  {
    "name": "John",
    "age": "30"
  },
  {
    "name": "Jane",
    "age": "25"
  }
]`;
    jest.spyOn(fs, 'readFileSync').mockReturnValue(extraCommasCSV);
    const jsonResult = parseCSV('path/to/extraCommas.csv');
    expect(jsonResult).toBe(expectedJSON);
  });

  test('should handle CSV file with missing values', () => {
    const missingValuesCSV = 'name,age\nJohn,\nJane,25';
    const expectedJSON = `[
  {
    "name": "John",
    "age": ""
  },
  {
    "name": "Jane",
    "age": "25"
  }
]`;
    jest.spyOn(fs, 'readFileSync').mockReturnValue(missingValuesCSV);
    const jsonResult = parseCSV('path/to/missingValues.csv');
    expect(jsonResult).toBe(expectedJSON);
  });

  test('should handle CSV file with different line endings', () => {
    const differentLineEndingsCSV = 'name,age\r\nJohn,30\r\nJane,25';
    const expectedJSON = `[
  {
    "name": "John",
    "age": "30"
  },
  {
    "name": "Jane",
    "age": "25"
  }
]`;
    jest.spyOn(fs, 'readFileSync').mockReturnValue(differentLineEndingsCSV);
    const jsonResult = parseCSV('path/to/differentLineEndings.csv');
    expect(jsonResult).toBe(expectedJSON);
  });

  test('should handle non-existent file', () => {
    jest.spyOn(fs, 'readFileSync').mockImplementation(() => {
      throw new Error('File not found');
    });
    expect(() => parseCSV('path/to/nonexistent.csv')).toThrow('File not found');
  });
});
