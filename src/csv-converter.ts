import { readFileSync } from 'fs';
import { resolve } from 'path';

interface CSVRecord {
  [key: string]: string;
}

export function readFileContent(filePath: string): string {
  const absolutePath = resolve(filePath);
  return readFileSync(absolutePath, 'utf8');
}

export function parseCSVContent(data: string): string[][] {
  const lines = data.split('\n').filter(line => line.trim() !== '');
  return lines.map(line => line.split(','));
}

export function convertLinesToJSONString(lines: string[][]): string {
  const [headerLine, ...contentLines] = lines;
  const headers = headerLine;

  const jsonArray = contentLines.map(line => {
    return headers.reduce((obj, header, index) => {
      obj[header] = line[index] || '';
      return obj;
    }, {} as CSVRecord);
  });

  return JSON.stringify(jsonArray, null, 2);
}

export function parseCSV(filePath: string): string {
  const fileContent = readFileContent(filePath);
  const lines = parseCSVContent(fileContent);
  return convertLinesToJSONString(lines);
}
