# Mock Schema Generator

A tool for generating mock data based on schema definitions. Ideal for testing and development, it helps streamline your workflows by providing realistic mock data.

## Installation

Install the `mock-schema-generator` package using npm:

```sh
npm install mock-schema-generator
```

## Usage

### Generating JSON Mock Data

Create a file named `mockJsonData.js` with the following content:

```js
const fs = require("fs");
const { generateJsonMockData } = require("mock-schema-generator");

// Define the schema for mock data generation
const schema = {
  type: "object",
  properties: {
    name: { type: "string" },
    age: { type: "integer" },
    isActive: { type: "boolean" },
    createdAt: { type: "date" },
    tags: {
      type: "array",
      items: {
        type: "object",
        properties: {
          subName: { type: "string" },
          subAge: { type: "integer" },
        },
        required: ["subName", "subAge"],
      },
      minItems: 3,
    },
    nested: {
      type: "object",
      properties: {
        subName: { type: "string" },
        subAge: { type: "integer" },
      },
      required: ["subName", "subAge"],
    },
  },
  required: ["name", "age", "isActive", "createdAt", "tags", "nested"],
};

// Function to generate and save mock JSON data
async function generateAndSaveMockData() {
  try {
    const mockData = await generateJsonMockData(schema);
    const jsonFilePath = "mockData.json";
    fs.writeFileSync(jsonFilePath, JSON.stringify(mockData, null, 2), "utf-8");
    console.log(`Mock Data (JSON) saved to ${jsonFilePath}`);
  } catch (error) {
    console.error("Error generating JSON mock data:", error);
  }
}

generateAndSaveMockData();
```

### Generating Excel Mock Data

Create a file named `mockExcelData.js` with the following content:

```js
const fs = require("fs");
const { generateExcelMockData } = require("mock-schema-generator");

// Define the schema for mock data generation
const schema = {
  type: "array",
  items: {
    type: "object",
    properties: {
      name: { type: "string" },
      age: { type: "integer" },
    },
    required: ["name", "age"],
  },
  minItems: 10,
};

// Function to generate and save mock Excel data
async function generateAndSaveMockData() {
  try {
    const mockExcelBuffer = await generateExcelMockData(schema);
    const excelFilePath = "mockData.xlsx";
    fs.writeFileSync(excelFilePath, mockExcelBuffer);
    console.log(`Mock Data (Excel) saved to ${excelFilePath}`);
  } catch (error) {
    console.error("Error generating Excel mock data:", error);
  }
}

generateAndSaveMockData();
```

### Run the Server

To run the server and generate mock data, use the following commands:

- **Generate JSON Data**:

```sh
node mockJsonData.js
```

- **Generate Excel Data**:

```sh
node mockExcelData.js
```

## Summary of Variables

- `type`: Specifies the data type of the property or structure. Key types include:
  - `object`: Represents a structure with key-value pairs.
  - `array`: Represents a list of items.
  - `string`: A textual value.
  - `integer`: A numerical value.
  - `boolean`: A true/false value.
  - `date`: A date value.
- `properties`: Defines the structure and data types for the properties within an `object`. Each property is defined by its `type`, which can be `string`, `integer`, `boolean`, `date`, `object`, or `array`.
- `required`: Lists the mandatory properties within an `object`. These are the properties that must be included in the generated mock data.
- `items`: Defines the schema for each item within an `array`. The `items` schema must specify the `type` of the array elements, which can be `object`, `string`, `integer`, `boolean`, or `date`.
- `minItems`: Specifies the minimum number of items required in an `array`.
