import { NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';
import { GmStorageModule } from './plugins/gm-storage/gm-storage.module';
import { BlockListState } from './block-list/block-list.state';
import { PreferencesState } from './preferences/preferences.state';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { environment } from '../environments/environment';

if (!environment.production) {
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
    NgxsReduxDevtoolsPluginModule.forRoot({
      name: 'Youtube blocker',
      disabled: environment.production,
    }),
    GmStorageModule.forRoot({ key: 'youtube-blocker-state' }),
  ],
})
export class StoreModule {

}
