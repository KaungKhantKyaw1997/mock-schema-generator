const fs = require("fs");
const { generateJsonMockData } = require("./src/index");

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
