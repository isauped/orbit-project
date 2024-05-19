import * as fs from 'fs';

/**
 * Reads a CSV file from the given path.
 * @param filePath - The path to the CSV file.
 * @returns The content of the CSV file as a string.
 */
export const readCSVFile = (filePath: string): string => {
  return fs.readFileSync(filePath, "utf8");
};

/**
 * Parses the content of a CSV file into an array of lines.
 * @param csvContent - The content of the CSV file.
 * @returns An array where each element is a line from the CSV file.
 */
export const parseCSVContent = (csvContent: string): string[] => {
  return csvContent.split("\n").filter((line) => line.trim() !== "");
};

/**
 * Converts the parsed CSV lines into a JSON string.
 * @param lines - An array of lines from the CSV file.
 * @returns A JSON string representing the CSV content.
 */
export const convertLinesToJSONString = (lines: string[]): string => {
  // Check if array is empty
  if (lines.length === 0) {
    return "[]"; // Return an empty array if there are no lines
  }
  // Split the first line to get headers
  const headers = lines[0].split(",");
  // Map over the rest of the lines to create an array of objects
  const result = lines.slice(1).map((line) => {
    const values = line.split(",");
    // Create an object for each line
    const obj: { [key: string]: string } = {};
    headers.forEach((header, index) => {
      obj[header.trim()] = values[index].trim() || "";
    });
    return obj;
  });
  // Convert the array of objects to a JSON string
  return JSON.stringify(result, null, 2);
};

/**
 * Parses a CSV file and converts it to a JSON string.
 * @param filePath - The path to the CSV file.
 * @returns A JSON string representing the CSV content.
 */
export const parseCSV = (filePath: string): string => {
  // Read the CSV file content
  const csvContent = readCSVFile(filePath);
  // Parse the CSV content into lines
  const lines = parseCSVContent(csvContent);
  // Convert the lines to a JSON string
  return convertLinesToJSONString(lines);
};
