import { NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { DownloadsState } from './downloads/downloads.state';
import { environment } from '../../environments/environment';

if (!environment.production) {
  window['__REDUX_DEVTOOLS_EXTENSION__'] = window['unsafeWindow']['__REDUX_DEVTOOLS_EXTENSION__'];
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
