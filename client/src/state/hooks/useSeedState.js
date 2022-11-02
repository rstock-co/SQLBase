import { useContext } from "react";
import { GlobalContext } from "../GlobalStateProvider";
import {
  rand,
  randFirstName,
  randLastName,
  randEmail,
  randPassword,
  randPhoneNumber,
  randUserName,
  randBrand,
  randProductName,
  randProductDescription,
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

  // Form UI
  // -------
  // (0) there should be a 'load progress' button for user to load their schema
  // (1) provide list of tables in state to the Seed Form for rendering
  // (2) provide list of options (0, 5, 10, 25, 50, etc...) for dropdown
  // (3) user will make selections and then click button 'Seed Data' at bottom of form

  // Seed process
  // ------------
  // (0) determine a list of columns for each table
  // (1) For each table, generate the selected amount of fake data points for each column
  // (2) Save into seedState globally (need to determine data structure)
  // (3) Render the tables on the screen (so user can verify no errors / make changes to schema)
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
   * USERS
   */

  const userList = numUsers => {
    let userList = [];
    for (let i = 0; i < numUsers; i++) {
      let firstName = randFirstName();
      // let lastName =
    }
    let user = {
      firstName: randFirstName(),
    };
  };

  const fullName = (length = null) => {
    if (length) return randBrand({ length });
    return randBrand();
  };

  console.log(uniqueArray(fullName(10)));

  const emailList = (length = null) => {
    const set1 = Math.floor(length / 2);
    const set2 = length - set1;

    if (length) {
      const emails1 = randEmail({ length: set1, nameSeparator: "." });
      const emails2 = randEmail({ length: set2, nameSeparator: "_" });
      return emails1.concat(emails2).sort();
    }
    return randEmail();
  };

  const email = (firstName, lastName) => {
    return randEmail({
      firstName: firstName,
      lastName: lastName,
      nameSeparator: rand([".", "_"]),
    });
  };

  console.log(randFirstName());
  console.log(randLastName());
  console.log(email(randFirstName(), randLastName()));

  // company & products

  const companyName = (length = null) => {
    if (length) return randBrand({ length });
    return randBrand();
  };

  const productName = (count, length = null) => {
    if (length) return randProductName({ length });
    return randProductName();
  };

  const productDesc = (count, product, length = null) => {
    if (length) return `The ${product} ${randProductDescription({ length })}`;
    return `The ${product} ${randProductDescription()}`;
  };

  return {
    state,
    companyName,
    productName,
    productDesc,
  };
};

export default useSeedState;
