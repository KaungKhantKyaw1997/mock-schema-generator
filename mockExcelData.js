const fs = require("fs");
const { generateExcelMockData } = require("./src/index");

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
