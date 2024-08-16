const faker = require("faker");
const ExcelJS = require("exceljs");

function generateMockData(schema, format = "json") {
  if (schema.type === "object") {
    const result = {};
    for (const [key, value] of Object.entries(schema.properties)) {
      if (schema.required.includes(key)) {
        result[key] = generateValue(value);
      }
    }
    return format === "json" ? result : convertToExcel([result]);
  } else if (schema.type === "array") {
    if (schema.items) {
      const length = schema.minItems || 0;
      const result = Array.from({ length }, () => generateValue(schema.items));
      return format === "json" ? result : convertToExcel(result);
    }
    throw new Error("Array schema must define 'items'");
  }
  throw new Error("Unsupported schema type");
}

function generateValue(type) {
  switch (type.type) {
    case "string":
      return faker.lorem.word();
    case "integer":
      return faker.datatype.number();
    case "boolean":
      return faker.datatype.boolean();
    case "date":
      return faker.date.recent();
    case "array":
      if (type.items) {
        const length = type.minItems || 0;
        return Array.from({ length }, () => generateValue(type.items));
      }
      throw new Error("Array schema must define 'items'");
    case "object":
      return generateMockData(type);
    default:
      throw new Error(`Unsupported type ${type.type}`);
  }
}

async function convertToExcel(data) {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet("MockData");

  if (Array.isArray(data)) {
    if (data.length > 0 && typeof data[0] === "object") {
      worksheet.columns = Object.keys(data[0]).map((key) => ({
        header: key.toUpperCase(),
        key,
      }));
      data.forEach((item, index) => {
        worksheet.addRow({ ID: index + 1, ...item });
      });
    } else {
      worksheet.columns = ["ID", "VALUE"].map((header) => ({
        header,
        key: header.toLowerCase(),
      }));
      data.forEach((item, index) => {
        worksheet.addRow({ id: index + 1, value: item });
      });
    }
  } else {
    worksheet.columns = Object.keys(data).map((key) => ({
      header: key.toUpperCase(),
      key,
    }));
    worksheet.addRow({ ID: 1, ...data });
  }

  const buffer = await workbook.xlsx.writeBuffer();
  return buffer;
}

module.exports = {
  generateMockData,
};
