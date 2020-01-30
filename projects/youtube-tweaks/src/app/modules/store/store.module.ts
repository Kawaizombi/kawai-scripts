import { environment } from '../../../environments/environment';
import { NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { HotkeysState } from './hotkeys/hotkeys.state';

if(!environment.production) {
  // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
  // @ts-ignore
  // eslint-disable-next-line no-undef
  window.__REDUX_DEVTOOLS_EXTENSION__ = unsafeWindow.__REDUX_DEVTOOLS_EXTENSION__;
}


@NgModule({
  imports: [
    NgxsModule.forRoot([
      HotkeysState,
    ], {
      developmentMode: !environment.production,
    }),
    NgxsReduxDevtoolsPluginModule.forRoot({
      name: 'Youtube tweaks',
      disabled: environment.production,
    }),
  ],
})
export class StoreModule {
}
