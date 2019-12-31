type Item = boolean | string | string[];

interface Config {
  [key: string]: Item;
}

function createHeaderPart(key: string, item: Item): string {
  if(typeof item === 'string') {
    return `// @${ key } ${ item }`
  } else if(typeof item === 'boolean') {
    return item ? `// @${ key }` : '';
  } else {
    return item.map((i) => `// @${ key } ${ i }`).join('\n');
  }
}

export default function createHeader(config: Config) {
  const header = Object.entries(config)
    .map(([key, item]) => createHeaderPart(key, item))
    .join('\n');

  return `// ==UserScript==\n${ header }\n// ==/UserScript==`;
}
