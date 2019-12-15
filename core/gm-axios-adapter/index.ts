/* eslint-disable @typescript-eslint/camelcase */
import { AxiosRequestConfig, AxiosResponse } from 'axios';
import { GMXMLHttpRequestOptions, GMXMLHttpRequestResponse, GMXMLHttpRequestResult } from './@types';

interface HeadersObject {
  [key: string]: string;
}

const headerStringToObject = (str: string): HeadersObject => {
  const rows = str.split('\n');
  const pairs = rows.map((s) => s.split(':').map((s) => s.trim()));
  return pairs.reduce((accumulator, [key, value]) => {
    accumulator[key] = value;

    return accumulator;
  }, {});
};

function createHandler(resolve: Function, reject: Function, config: AxiosRequestConfig) {
  const { validateStatus } = config;

  return function(response: GMXMLHttpRequestResponse) {
    const payload: AxiosResponse = {
      config,
      data: response.response,
      headers: headerStringToObject(response.responseHeaders),
      status: response.status,
      statusText: response.statusText,
    };

    if(!validateStatus || validateStatus(response.status)) {
      resolve(payload);
    } else {
      reject(payload);
    }
  };
}

declare function GM_xmlhttpRequest(options: GMXMLHttpRequestOptions): GMXMLHttpRequestResult;

function gmAdapter(config: AxiosRequestConfig): Promise<AxiosResponse> {
  return new Promise((resolve, reject) => {
    const handler = createHandler(resolve, reject, config);

    GM_xmlhttpRequest({
      url: config.url,
      method: config.method,
      headers: config.headers,
      data: config.data,
      timeout: config.timeout,
      responseType: config.responseType,
      username: config?.auth?.username,
      password: config?.auth?.password,
      onload: handler,
      onerror: handler,
      ontimeout: handler,
    });
  });
}

export default gmAdapter;
