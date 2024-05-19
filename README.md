# Orbit test: CSV to JSON Converter

This project provides a utility to parse CSV files and convert them to JSON strings using TypeScript and Node.js. It includes a set of functions to read CSV content, parse it, and convert it to JSON format, along with tests written using the Jest framework.

## Prerequisites

- Node.js (version 12 or later)
- npm or yarn

## Installation

1. Clone the repository to your local machine:

    ```sh
    git clone https://github.com/isauped/orbit-project.git
    cd csv-to-json-converter
    ```

2. Install the dependencies:

    ```sh
    npm install
    ```

    or if you are using yarn:

    ```sh
    yarn install
    ```

## Project Structure

- `src/`: Contains the source code.
  - `csv-converter.ts`: The main file containing functions to read, parse, and convert CSV files.
- `test/`: Contains the test files.
  - `csv-converter.test.ts`: The test file for the functions in `csv-converter.ts`.
- `jest.config.js`: Jest configuration file.
- `tsconfig.json`: TypeScript configuration file.

## Usage

To use the CSV to JSON converter, you can call the `parseCSV` function with the path to your CSV file. Here's an example:

```typescript
import { parseCSV } from './src/csv-converter';

const jsonResult = parseCSV('path/to/your/csvfile.csv');
console.log(jsonResult);
```
Alternatively, you can use the main.ts file, which is already set up to consume the sample.csv file provided by Vasily:

```sh
npm start
```

## Running Tests
This project uses Jest for testing. To run the tests, use the following command:

```sh
npm 
```
OR

```sh
npx jest
```