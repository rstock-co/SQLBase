import { useContext } from "react";
import { GlobalContext } from "../GlobalStateProvider";

import {
  randNumber,
  randFloat,
  randUser,
  randJobTitle,
  randJobArea,
  randSkill,
  randDrinks,
  randCity,
  randCountry,
  randBrand,
  randFullName,
  randProduct,
} from "@ngneat/falso";

import { SEED_ALL_FAKE_DATA, SEED_FAKE_DATA } from "../reducers/globalReducer";

const useSeedState = () => {
  const [state, dispatch] = useContext(GlobalContext);

  /** Form UI
    -------
      (✓) there should be a 'load progress' button for user to load their schema
      (✓) provide list of tables in state to the Seed Form for rendering
      (✓) provide list of options (0, 5, 10, 25, 50, etc...) for dropdown
      (✓) build SeedForm in UI
      (✓) user will select # of fields from a dropdown box and code block will adjust in real time

    Seed process
    ------------
      (✓) determine a list of columns for each table (as ARRAY of strings)
      (✓) For each table, generate the selected amount of fake data points for each column.
          - Build a set of helper functions which take in (colName, numDataPoints)
            and return an array of objects (1 per table) containing the seed data
      (✓) Save the seed data into seedState globally (need to determine data structure)
      (✓) Convert seedState object to SQL language for seeding tables
      (✓) Render the seeded data as tables on a modal (so user can verify no errors / make changes to schema)
      (✓) user will finish seed process and then click "Generate Database" when done

    Database process
    ----------------
      (✓) create the database
      (✓) use the SQL schema language from App 1 (schemaState) to create tables
      (✓) use the seed data from App 3 to seed tables

    Execute Queries
    ---------------
      (✓) a button on each query form will allow the user to run the queries from App 2 on their seeded database
*/

  /**
   * FAKE DATA HELPER FUNCTIONS: goals are (1) generate DB seed string to seed database, (2) store in global state?
   * @param {string} colName the column name inside the tables
   * @param {integer} numDataPoints the number of data points to create
   * @returns an array of objects (1 array/table) containing the seed data
   */

  /**
   * COMPANIES (name, # of employees, # of products, # of countries, CEO, head office location)
   */

  const companySeed = numDataPoints => {
    const companies = [];
    for (let i = 0; i < numDataPoints; i++) {
      let num_employees = randNumber({ min: 20, max: 100000 });
      let num_products = randNumber({ min: 1, max: 1000 });
      let annual_revenue =
        Math.round(
          (num_employees *
            num_products *
            randFloat({ min: 1, max: 2, fraction: 2 })) /
            1000
        ) * 1000;

      companies.push({
        id: i + 1,
        name: randBrand(),
        ceo: randFullName(),
        num_employees,
        num_products,
        annual_revenue,
        num_countries: randNumber({ min: 1, max: 200 }),
        head_office: `${randCity()}, ${randCountry()}`,
      });
    }
    return companies;
  };

  /**
   * EMPLOYEES
   */

  const getNumCompanies = () => state.seedState[0].companies.length;

  const employeeSeed = numDataPoints => {
    const employees = [];
    for (let i = 0; i < numDataPoints; i++) {
      let employee = randUser();
      let age = randNumber({ min: 20, max: 70 });
      let years_exp = randNumber({ min: 0, max: age - 20 });
      let salary =
        Math.round(
          (30000 +
            years_exp * 5000 * randFloat({ min: 1, max: 2, fraction: 2 })) /
            1000
        ) * 1000;
      let address = `${employee.address.street}, ${employee.address.city}, ${employee.address.country}`;
      let first_name = employee.firstName;
      let last_name = employee.lastName;
      ["address", "img", "id", "username", "firstName", "lastName"].forEach(
        i => delete employee[i]
      );

      employees.push({
        ...employee,
        company_id: randNumber({
          min: 1,
          max: getNumCompanies(),
        }),
        first_name,
        last_name,
        address,
        job_title: randJobTitle(),
        department: randJobArea(),
        age,
        years_exp,
        salary,
        office: `${randCity()}, ${randCountry()}`,
        strength: randSkill(),
        fav_drink: randDrinks(),
      });
    }
    return employees;
  };

  /**
   * PRODUCTS (name, description, price, status, level (subscription plan), product_line, ...[look at falso library])
   */

  const productSeed = numDataPoints => {
    const products = [];
    for (let i = 0; i < numDataPoints; i++) {
      let product = randProduct();
      let name = product.title;
      let sku = product.id;
      let rating = Number(product.rating.rate);
      let rating_count = Number(product.rating.count);
      let msrp = Math.round(randNumber({ min: 20, max: 1000 }) / 5) * 5;
      let cost = randFloat({ min: 5, max: msrp - msrp * 0.1, fraction: 2 });
      let profit_margin = ((msrp - cost) / cost) * 100;

      ["id", "title", "price", "image", "rating"].forEach(
        i => delete product[i]
      );

      products.push({
        ...product,
        manufacturer: randBrand(),
        name,
        sku,
        msrp,
        cost,
        profit_margin,
        rating,
        rating_count,
      });
    }
    return products;
  };

  const generateAllSeedState = seedFormData => {
    const tableToSeedFn = {
      companies: companySeed,
      employees: employeeSeed,
      products: productSeed,
    };
    const seedState = {};
    seedFormData.forEach(table => {
      seedState[table[0]] = tableToSeedFn[table[0]](table[1]);
    });
    dispatch({ type: SEED_ALL_FAKE_DATA, seedState });
  };

  const generateSeedState = (tableName, numDataPoints) => {
    const tableToSeedFn = {
      companies: companySeed,
      employees: employeeSeed,
      products: productSeed,
    };
    let seedData = {};
    seedData = tableToSeedFn[tableName](numDataPoints);
    console.log("SEED DATA FOR DISPATCH: ", seedData);

    dispatch({ type: SEED_FAKE_DATA, seedData, tableName });
  };

  return {
    state,
    companySeed,
    employeeSeed,
    productSeed,
    generateAllSeedState,
    generateSeedState,
  };
};

export default useSeedState;
