import { HeadersConfig } from '../types';

function createHeaderPart(key: string, item: string | string[]): string {
  if(typeof item === 'string') {
    return `// @${ key } ${ item }`
  }
  return item.map((headers) => `// @${ key } ${ headers }`).join('\n');
}

export default function createHeader(config: HeadersConfig = {}) {
  const header = Object.entries(config)
    .map(([key, item]) => createHeaderPart(key, item))
    .join('\n');

  return `// ==UserScript==\n${ header }\n// ==/UserScript==`;
}
