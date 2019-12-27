import { Inject, Injectable, InjectionToken } from '@angular/core';
import { getActionTypeFromInstance, NgxsPlugin, InitState } from '@ngxs/store';
import { map, tap } from 'rxjs/operators';
import GMStorage from '@kawai-scripts/gm-storage';
import { from } from 'rxjs';

export const DEFAULT_CONFIG = {
  key: 'state',
};

export const GM_STORAGE_PLUGIN_CONFIG = new InjectionToken<typeof DEFAULT_CONFIG>('GM_STORAGE_PLUGIN_CONFIG');

@Injectable()
export class GmStoragePlugin implements NgxsPlugin {
  private readonly config = DEFAULT_CONFIG;

  private gmStorage = new GMStorage();

  constructor(
    @Inject(GM_STORAGE_PLUGIN_CONFIG) config,
  ) {
    this.config = { ...this.config, ...config };
  }

  handle(state: any, action: any, next: (state: any, mutation: any) => any) {
    const isInit = getActionTypeFromInstance(action) === InitState.type;

    if(isInit) {
      return from(this.gmStorage.getValue(this.config.key))
        .pipe(map((restored) => {
          if(restored) {
            return next(JSON.parse(restored as string), action);
          }

          return next(state, action);
        }));
    }

    return next(state, action)
      .pipe(
        tap((state: object) => this.gmStorage.setValue(this.config.key, JSON.stringify(state))),
      );
  }
}
