export const uniqueArray = array => {
  const unique = (value, index, self) => self.indexOf(value) === index;
  return array.filter(unique);
};
