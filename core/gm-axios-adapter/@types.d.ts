export interface GMXMLHttpRequestProgressResponse extends GMXMLHttpRequestResponse {
  lengthComputable: boolean;
  loaded: number;
  total: number;
}

export interface GMXMLHttpRequestResponse {
  readyState: number;
  responseHeaders: string;
  responseText: string;
  status: number;
  response: any,
  statusText: string;
  context: any;
  finalUrl: string;
}

export interface GMXMLHttpRequestOptions {
  url: string;
  method?: string;
  binary?: boolean;
  context?: any;
  data?: string;
  headers?: Object;
  onabort?: (response: GMXMLHttpRequestResponse) => any;
  onerror?: (response: GMXMLHttpRequestResponse) => any;
  onload?: (response: GMXMLHttpRequestResponse) => any;
  onprogress?: (response: GMXMLHttpRequestProgressResponse) => any;
  onreadystatechange?: (response: GMXMLHttpRequestResponse) => any;
  ontimeout?: (response: GMXMLHttpRequestResponse) => any;
  overrideMimeType?: string;
  username?: string;
  password?: string;
  responseType?: string,
  timeout?: number;
}

export interface GMXMLHttpRequestResult {
  abort(): void;
}
