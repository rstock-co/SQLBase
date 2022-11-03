// PART I: Data

export const numRowsDropdown = [
  0, 5, 10, 25, 50, 75, 100, 150, 200, 300, 400, 500,
].map(num => ({
  value: num,
  label: num,
}));

export const sampleCompanies = [
  {
    CEO: "Anton Ortiz",
    annual_revenue: 24887000,
    head_office: "Connfurt, Somalia",
    name: "Cartier",
    num_countries: 141,
    num_employees: 34275,
    num_products: 451,
  },
  {
    CEO: "Ahmad Chebet",
    annual_revenue: 34664000,
    head_office: "West Estaton, Cyprus",
    name: "Louis Vuitton",
    num_countries: 198,
    num_employees: 33762,
    num_products: 828,
  },
];

export const sampleEmployees = [
  {
    address:
      "1207 Buckridge Drives, Langborough, Lao Peoples Democratic Republic",
    age: 51,
    department: "Integration",
    email: "katsumi.yin@bluewin.org",
    fav_drink: "Amaretto Sour",
    first_name: "Katsumi",
    job_title: "Forward Operations Architect",
    last_name: "Yin",
    office: "Glen Burnie, Mauritius",
    phone: "+249 47 675 3454",
    salary: 102000,
    strength: "Work ethic",
    years_exp: 8,
  },
  {
    address: "616 Joshuah Fork, Wehnerfort, Cyprus",
    age: 60,
    department: "Division",
    email: "william_abdi@gmail.com",
    fav_drink: "Bloody Mary",
    first_name: "William",
    job_title: "Investor Configuration Specialist",
    last_name: "Abdi",
    office: "Lake Zackton, France",
    phone: "+1(345)245 7165",
    salary: 279000,
    strength: "Accounting or bookkeeping",
    years_exp: 26,
  },
];

export const sampleProducts = [
  {
    category: "Sportswear",
    cost: 190.17,
    description:
      "Bostons most advanced compression wear technology increases muscle oxygenation, stabilizes active muscles",
    manufacturer: "Under Armour",
    name: "Enhanced Base Layer Tech Shirt",
    profit_margin: 352.2269548298891,
    rating: 2.5,
    rating_count: 3963,
    retail: 860,
    sku: "ec57c579-7813-457a-8a88-59a337dc0dca",
  },
  {
    category: "Books",
    cost: 5.69,
    description:
      "The beautiful range of Apple Naturalé that has an exciting mix of natural ingredients. With the Goodness of 100% Natural Ingredients",
    manufacturer: "IBM",
    name: "name",
    profit_margin: 11411.423550087871,
    rating: 2.2,
    rating_count: 143,
    retail: 655,
    sku: "c67627f2-d8d4-4dfd-a53c-4b37731290f0",
  },
];

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
