/* eslint-disable no-undef,@typescript-eslint/ban-ts-ignore */
import { NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';
import { DownloadsState } from './downloads/downloads.state';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';

if(process.env.NODE_ENV !== 'production') {
  // @ts-ignore
  window.__REDUX_DEVTOOLS_EXTENSION__ = unsafeWindow.__REDUX_DEVTOOLS_EXTENSION__;
}


@NgModule({
  imports: [
    NgxsModule.forRoot([DownloadsState], {
      developmentMode: process.env.NODE_ENV !== 'production',
    }),
    NgxsReduxDevtoolsPluginModule.forRoot({
      name: 'SoundCloud Downloader',
      disabled: process.env.NODE_ENV === 'production',
    }),
  ],
})
export class StoreModule {
}
