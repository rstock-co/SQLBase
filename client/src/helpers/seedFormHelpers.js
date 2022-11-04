import {
  sampleCompanies,
  sampleProducts,
  sampleEmployees,
} from "../state/data_structures/seedState";

const sampleSeedState = {
  companies: sampleCompanies,
  employees: sampleEmployees,
  products: sampleProducts,
};

export const generateSeedSQL = seedState => {
  let seedStrings = [];
  let firstLine = [];
  let values = [];

  Object.entries(seedState[0]).forEach(([table, seedData], i) => {
    firstLine[i] = `INSERT INTO ${table}(`;
    values[i] = `VALUES`;
    seedData.forEach((dataset, j) => {
      Object.entries(dataset).forEach(([field, value], k) => {
        if (j === 0) {
          k === Object.keys(dataset).length - 1
            ? (firstLine[i] += `"${field}")`)
            : (firstLine[i] += `"${field}", `);
        }
        if (k === 0) {
          values[i] += ` (${typeof value === "number" ? value : "'" + value + "'"
            }, `;
        } else if (k === Object.keys(dataset).length - 1) {
          j === seedData.length - 1
            ? (values[i] += `${typeof value === "number" ? value : "'" + value + "'"
              })`)
            : (values[i] += `${typeof value === "number" ? value : "'" + value + "'"
              }),\n                  `);
        } else {
          values[i] += `${typeof value === "number" ? value : "'" + value + "'"
            }, `;
        }
      });
    });
    seedStrings[i] = `${firstLine[i]}
    ${values[i]};`.replace(/'/g, "\'");
  });

  let seedStringLinebreak = seedStrings.join("\r\n\n");

  return seedStringLinebreak;
};
