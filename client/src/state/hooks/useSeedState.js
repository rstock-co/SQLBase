import { useContext } from "react";
import { GlobalContext } from "../GlobalStateProvider";
import { numRowsDropdown } from "../data_structures/seedState";
import {
  rand,
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
  randProductName,
  randProductDescription,
  randProductCategory,
} from "@ngneat/falso";

// import {
//   SCHEMA_ADD_TABLE,
// } from "../reducers/globalReducer";

// helper functions (can move later)

const uniqueArray = array => {
  const unique = (value, index, self) => self.indexOf(value) === index;
  return array.filter(unique);
};

const useSeedState = () => {
  const [state, dispatch] = useContext(GlobalContext);

  console.log("dropdown: ", numRowsDropdown);

  // Form UI
  // -------
  // (DONE) there should be a 'load progress' button for user to load their schema
  // (DONE) provide list of tables in state to the Seed Form for rendering
  // (DONE) provide list of options (0, 5, 10, 25, 50, etc...) for dropdown
  // (Lawrence?) build SeedForm in UI
  // (4) user will make selections and then click button 'Seed Data' at bottom of form
  // (5) build a click handler function for the 'Seed Data' button which will execute seed process

  // Seed process
  // ------------
  // (DONE) determine a list of columns for each table (as ARRAY of strings)
  // (1) For each table, generate the selected amount of fake data points for each column
  //    (a) build a set of helper functions which take in (colName, numDataPoints)
  //        and return an array of objects (1 per table) containing the seed data
  // (2) Save the seed data into seedState globally (need to determine data structure)
  // (3) Render the seeded data as tables on the screen (so user can verify no errors / make changes to schema)
  // (4) user will finish seed process and then click "Generate Database" when done

  // Database process
  // ----------------
  // (0) create the database
  // (1) use the SQL schema language from App 1 (schemaState) to create tables
  // (2) use the seed data from App 3 to seed tables
  // (3) return the number of entries from each table to verify database is seeded properly

  // Query DB
  // --------
  // Now, a link in the navbar should conditionally render "Execute queries"
  // This is a new page where the user can run the queries from App 2 on their seeded database

  /**
   * FAKE DATA HELPER FUNCTIONS: goals are (1) generate DB seed string to seed database, (2) store in global state?
   * @param {string} colName the column name inside the tables
   * @param {integer} numDataPoints the number of data points to create
   * @returns an array of objects (1 array/table) containing the seed data
   */

  // DB Seed example:
  // INSERT INTO users(first_name, last_name, email, password)
  // VALUES ('Mario', 'Bros', 'mario@nintendo.com', 'test'),
  // ('Luigi', 'Bros', 'luigi@nintendo.com', 'test'),
  // ('Donkey', 'Kong', 'donkey@nintendo.com', 'test');

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
        name: randBrand(),
        CEO: randFullName(),
        num_employees,
        num_products,
        annual_revenue,
        num_countries: randNumber({ min: 1, max: 200 }),
        head_office: `${randCity()}, ${randCountry()}`,
      });
    }
    return companies;
  };

  console.log("Companies: ", companySeed(15));

  /**
   * EMPLOYEES
   */
  // const employee = {
  // address: "1376 Hilma Mills, Opalbury, Congo";
  // age: 45;
  // email: "xiaoping-svoboda715@googlemail.com";
  // first_name: "Xiaoping";
  // job_title: "Customer Security Manager";
  // last_name: "Svoboda";
  // office: "West Everardo, Czech Republic";
  // phone: "+380(33)118 36 68";
  // salary: 280000;
  // years_exp: 25;
  // }

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

  console.log("Employees: ", employeeSeed(15));

  /**
   * PRODUCTS (name, description, price, status, level (subscription plan), product_line, ...[look at falso library])
   */

  const productSeed = numDataPoints => {
    const products = [];
    for (let i = 0; i < numDataPoints; i++) {
      let product = randProduct();
      let sku = product.id;
      let rating = product.rating.rate;
      let rating_count = product.rating.count;
      let retail = Math.round(randNumber({ min: 20, max: 1000 }) / 5) * 5;
      let cost = randFloat({ min: 20, max: retail - 19, fraction: 2 });
      let profit_margin = ((retail - cost) / cost) * 100;

      ["id", "rating"].forEach(i => delete product[i]);

      products.push({
        manufacturer: randBrand(),
        name: "name",
        sku,
        description: randProductDescription(),
        category: randProductCategory(),
        retail,
        cost,
        profit_margin,
        rating,
        rating_count,
      });
    }
    return products;
  };

  console.log("Products: ", productSeed(15));

  return {
    state,
    companySeed,
    employeeSeed,
    productSeed,
  };
};

export default useSeedState;
