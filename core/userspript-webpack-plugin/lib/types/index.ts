export interface HeadersConfig {
  [key: string]: string | string[];
}

export interface Config {
  headers?: HeadersConfig;
}
