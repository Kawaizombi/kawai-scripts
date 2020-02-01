import { AsyncStorageEngine } from '@ngxs-labs/async-storage-plugin';
import GMStorage from '@kawai-scripts/gm-storage';
import { from } from 'rxjs';
import { map } from 'rxjs/operators';

export class GMStorageEngine implements AsyncStorageEngine {
  private storage = new GMStorage();

  getItem(key) {
    return from(this.storage.getValue(key));
  }

  setItem(key, val) {
    this.storage.setValue(key, val);
  }

  removeItem(key: string) {
    this.storage.deleteValue(key);
  }

  clear() {
    // noop
  }

  length() {
    return from(this.storage.listValues()).pipe(map((keys) => keys.length));
  }

  key(val: number) {
    return from(this.storage.listValues()).pipe(map(({ [val]: key }) => key));
  }
}
