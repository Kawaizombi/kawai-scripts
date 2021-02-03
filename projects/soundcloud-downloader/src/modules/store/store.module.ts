import { NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { environment } from '../../environments/environment';
import { DownloadsState } from './downloads/downloads.state';
import { SettingsState } from './settings/settings.state';
import { NgxsStoragePluginModule } from '@ngxs/storage-plugin';

if (!environment.production) {
  window['__REDUX_DEVTOOLS_EXTENSION__'] = window['unsafeWindow']['__REDUX_DEVTOOLS_EXTENSION__'];
}

@NgModule({
  imports: [
    NgxsModule.forRoot([DownloadsState, SettingsState], {
      developmentMode: !environment.production,
    }),
    NgxsStoragePluginModule.forRoot({
      key: [SettingsState],
    }),
    NgxsReduxDevtoolsPluginModule.forRoot({
      name: 'SoundCloud Downloader',
      disabled: environment.production,
    }),
  ],
})
export class StoreModule {
}
