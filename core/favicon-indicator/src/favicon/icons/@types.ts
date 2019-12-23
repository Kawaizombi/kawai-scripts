export interface Params {
  size: number;
}

export interface Provider {
  getUrl(params: Params): string;
}
