/* eslint-disable @typescript-eslint/camelcase */
type StorageTypes = boolean | number | string;

type GM_getValue = (key: string, defaultValue?: any) => StorageTypes | Promise<StorageTypes>;
type GM_setValue = (key: string, value: StorageTypes) => void | Promise<void>;
type GM_deleteValue = (key: string) => void | Promise<void>;
type GM_listValues = () => string[] | Promise<string[]>;

interface GM {
  getValue: GM_getValue;
  setValue: GM_setValue;
  deleteValue: GM_deleteValue;
  listValues: GM_listValues;
}

declare global {
  interface Window {
    GM: GM;
    GM_getValue: GM_getValue;
    GM_setValue: GM_setValue;
    GM_deleteValue: GM_deleteValue;
    GM_listValues: GM_listValues;
  }
}

class GMStorage {
  getValue(key: string, defaultValue?: any) {
    return Promise.resolve((window.GM_getValue || window.GM.getValue)(key, defaultValue));
  }

  setValue(key: string, value: StorageTypes) {
    return Promise.resolve((window.GM_setValue || window.GM.setValue)(key, value));
  }

  deleteValue(key: string) {
    return Promise.resolve((window.GM_deleteValue || window.GM.deleteValue)(key));
  }

  listValues() {
    return Promise.resolve((window.GM_listValues || window.GM.listValues)())
  }
}

export default GMStorage;
