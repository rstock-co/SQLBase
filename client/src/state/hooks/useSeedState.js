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
