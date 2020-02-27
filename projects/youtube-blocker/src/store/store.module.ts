import { NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';
import { NgxsAsyncStoragePluginModule } from '@ngxs-labs/async-storage-plugin';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { environment } from '../environments/environment';
import { GMStorageEngine } from './storage.engine';
import { BlockListState } from './block-list/block-list.state';
import { PreferencesState } from './preferences/preferences.state';

if(!environment.production) {
  // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
  // @ts-ignore
  // eslint-disable-next-line no-undef
  window.__REDUX_DEVTOOLS_EXTENSION__ = unsafeWindow.__REDUX_DEVTOOLS_EXTENSION__;
}

@NgModule({
  imports: [
    NgxsModule.forRoot([
      BlockListState,
      PreferencesState,
    ], {
      developmentMode: !environment.production,
    }),
    NgxsAsyncStoragePluginModule.forRoot(GMStorageEngine),
    NgxsReduxDevtoolsPluginModule.forRoot({
      name: 'Youtube blocker',
      disabled: environment.production,
    }),
  ],
})
export class StoreModule {

}
