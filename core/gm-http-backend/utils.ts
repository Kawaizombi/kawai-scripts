export const headerStringToObject = (str: string) => {
  const rows = str.split('\n');
  const pairs = rows.map((s) => s.split(':').map((s) => s.trim()));
  return pairs.reduce((accumulator, [key, value]) => {
    accumulator[key] = value;

    return accumulator;
  }, {});
};
