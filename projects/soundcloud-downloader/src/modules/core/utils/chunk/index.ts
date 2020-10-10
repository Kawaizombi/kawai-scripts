export function chunk(array: any[], size: number) {
  const chunks = array.map((elem, i) => i % size ? [] : [array.slice(i, i + size)]);

  return [].concat(...chunks);
}
