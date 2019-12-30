import { NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';
import { GmStorageModule } from './plugins/gm-storage/gm-storage.module';
import { BlockListState } from './block-list/block-list.state';
import { PreferencesState } from './preferences/preferences.state';

@NgModule({
  imports: [
    NgxsModule.forRoot([
      BlockListState,
      PreferencesState,
    ], {
      developmentMode: process.env.NODE_ENV !== 'production',
    }),
    GmStorageModule.forRoot({ key: 'youtube-blocker-state' }),
  ],
})
export class StoreModule {

}
