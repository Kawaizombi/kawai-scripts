/* eslint-disable @typescript-eslint/camelcase */

type ValueChangeCallback = (name: string, oldValue: any, newValue: any, remote: boolean) => void;

interface GMTab {
  onclose?: () => void;
  closed: boolean;
  close: () => void;
}

interface NotificationConfig {
  text: string;
  title?: string;
  image?: string;

  onclick?(): void;

  ondone?(): void;
}

interface GMXMLHttpRequestProgressResponse extends GMXMLHttpRequestResponse {
  lengthComputable: boolean;
  loaded: number;
  total: number;
}

interface GMXMLHttpRequestResponse {
  readyState: number;
  responseHeaders: string;
  responseText: string;
  status: number;
  response: any;
  statusText: string;
  context: any;
  finalUrl: string;
}

interface GMXMLHttpRequestOptions {
  url: string;
  method?: string;
  binary?: boolean;
  context?: any;
  data?: string;
  headers?: Record<string, any>;
  onabort?: (response: GMXMLHttpRequestResponse) => any;
  onerror?: (response: GMXMLHttpRequestResponse) => any;
  onload?: (response: GMXMLHttpRequestResponse) => any;
  onprogress?: (response: GMXMLHttpRequestProgressResponse) => any;
  onreadystatechange?: (response: GMXMLHttpRequestResponse) => any;
  ontimeout?: (response: GMXMLHttpRequestResponse) => any;
  overrideMimeType?: string;
  username?: string;
  password?: string;
  responseType?: string;
  timeout?: number;
}


interface GMXMLHttpRequestResult {
  abort(): void;
}

interface GMDownloadConfig extends Pick<GMXMLHttpRequestOptions, 'url' | 'onload' | 'headers' | 'timeout' | 'onerror' | 'onprogress' | 'ontimeout'> {
  name?: string;
}

type GM_getValue = (key: string, defaultValue?: any) => void;

type GM_setValue = (key: string, value: any) => void;

type GM_deleteValue = (key: string) => void;

type GM_listValues = () => string[];

type GM_addValueChangeListener = (name: string, cb: ValueChangeCallback) => number;

type GM_removeValueChangeListener = (id: ReturnType<GM_addValueChangeListener>) => void;

type GM_getResourceText = (name: string) => string;

type GM_getResourceURL = (name: string) => string;

type GM_addStyle = (css: string) => void;

type GM_openInTab = (url: string, options: { active: boolean } | boolean) => GMTab;

type GM_registerMenuCommand = (caption: string, onClick: () => void) => void;

type GM_unregisterMenuCommand = (caption: string) => void;

type GM_notification =
  ((config: NotificationConfig) => void) |
  ((text: string, title?: string, image?: string, onclick?: () => void, ondone?: () => void) => void);

type GM_setClipboard = (data: string, type?: string) => void;

type GM_xmlhttpRequest = (config: GMXMLHttpRequestOptions) => GMXMLHttpRequestResult;

type GM_download =
  ((config: GMDownloadConfig) => void) |
  ((url: string, name?: string) => void);
