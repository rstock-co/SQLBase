import {
  sampleCompanies,
  sampleProducts,
  sampleEmployees,
} from "../state/data_structures/seedState";

// DB Seed example:
// INSERT INTO users(first_name, last_name, email, password)
// VALUES ('Mario', 'Bros', 'mario@nintendo.com', 'test'),
// ('Luigi', 'Bros', 'luigi@nintendo.com', 'test'),
// ('Donkey', 'Kong', 'donkey@nintendo.com', 'test');

const sampleSeedState = {
  companies: sampleCompanies,
  employees: sampleEmployees,
  products: sampleProducts,
};

export const generateSeedSQL = seedState => {
  let seedStrings = [];
  let firstLine = [];
  let values = [];

  Object.entries(seedState).forEach(([table, seedData], i) => {
    // console.log("I: ", i);
    firstLine[i] = `INSERT INTO ${table}(`;
    values[i] = `VALUES`;

    seedData.forEach((dataset, j) => {
      // console.log("J: ", j);

      Object.entries(dataset).forEach(([field, value], k) => {

        if (j === 0) {
          k === Object.keys(dataset).length - 1
            ? (firstLine[i] += `"${field}")`)
            : (firstLine[i] += `"${field}", `);
        }
        if (k === 0) {
          // console.log("CURRENT VALUE (k === 0): ", value);
          values[i] += ` (${typeof value === 'number' ? value : '"' + value + '"'}, `;
        } else if (k === Object.keys(dataset).length - 1) {
          // console.log("CURRENT VALUE (k === end of object): ", value);
          j === seedData.length - 1
            ? (values[i] += `${typeof value === 'number' ? value : '"' + value + '"'})`)
            : (values[i] += `${typeof value === 'number' ? value : '"' + value + '"'}),\n                  `);
        } else {
          // console.log("CURRENT VALUE (normal): ", value);
          values[i] += `${typeof value === 'number' ? value : '"' + value + '"'}, `;
        }
      });
    });
    seedStrings[i] = `${firstLine[i]} 
    ${values[i]};`.replace(/'/g, '');
  });

  console.log('seedStrings', seedStrings);
  let seedStringLinebreak = seedStrings.join('\r\n\n')

  return seedStringLinebreak;
};

generateSeedSQL(sampleSeedState);