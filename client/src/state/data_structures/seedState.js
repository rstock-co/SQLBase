// PART I: Data

export const numRowsDropdown = [
  0, 5, 10, 25, 50, 75, 100, 150, 200, 300, 400, 500,
].map(num => ({
  value: num,
  label: num,
}));

// simulate form inputs (delete later)
export const seedFormData = [
  ["companies", 25],
  ["employees", 100],
  ["products", 200],
];

// PART II: Data Structures

export const initialSeedState = {
  tables: [],
};
