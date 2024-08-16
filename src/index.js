const { generateMockData } = require("./schemaUtils");

async function generateJsonMockData(schema) {
  return generateMockData(schema, "json");
}

async function generateExcelMockData(schema) {
  return generateMockData(schema, "excel");
}

module.exports = {
  generateJsonMockData,
  generateExcelMockData,
};
