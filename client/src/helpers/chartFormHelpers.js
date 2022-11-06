export const uniqueArray = array => {
  const unique = (value, index, self) => self.indexOf(value) === index;
  return array.filter(unique);
};

export const titleCase = string =>
  string
    .replace(/^[-_]*(.)/, (_, c) => c.toUpperCase()) // Initial char (after -/_)
    .replace(/[-_]+(.)/g, (_, c) => " " + c.toUpperCase()); // First char after each -/_

export const capitalizeWord = string =>
  string.charAt(0).toUpperCase() + string.slice(1);
