/* eslint-disable no-undef,@typescript-eslint/ban-ts-ignore */
import { NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';
import { DownloadsState } from './downloads/downloads.state';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { environment } from '../../environments/environment';

if (!environment.production) {
  // @ts-ignore
  window.__REDUX_DEVTOOLS_EXTENSION__ = unsafeWindow.__REDUX_DEVTOOLS_EXTENSION__;
}

@NgModule({
  imports: [
    NgxsModule.forRoot([DownloadsState], {
      developmentMode: !environment.production,
    }),
    NgxsReduxDevtoolsPluginModule.forRoot({
      name: 'SoundCloud Downloader',
      disabled: environment.production,
    }),
  ],
})
export class StoreModule {
}
