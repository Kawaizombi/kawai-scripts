import { StorageEngine } from '@ngxs/storage-plugin';
import GMStorage from '@kawai-scripts/gm-storage';

const gmStorage = new GMStorage();

export class GmStorageEngine implements StorageEngine {
  getItem(key: string) {
    const value = gmStorage.getValue(key);

    if(!value) return value;

    return typeof value === 'string' ? JSON.parse(value) : value;
  }

  removeItem(key: string): void {
    gmStorage.deleteValue(key);
  }

  setItem(key: string, val: any): void {
    gmStorage.setValue(key, JSON.stringify(val));
  }

  async clear() {
    const keys = await gmStorage.listValues();

    keys.forEach((key) => gmStorage.deleteValue(key));
  }

  get length() {
    return 0;
  }
}
