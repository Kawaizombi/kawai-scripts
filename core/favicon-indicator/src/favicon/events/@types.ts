export interface Params {
  size: number;
}

export interface FaviconProvider {
  getUrl(params: Params): string;
}
