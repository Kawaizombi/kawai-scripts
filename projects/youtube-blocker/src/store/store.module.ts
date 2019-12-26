import { NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';
import { BlockListState } from './block-list/block-list.state';
import { PreferencesState } from './preferences/preferences.state';

@NgModule({
  imports: [
    NgxsModule.forRoot([
      BlockListState,
      PreferencesState,
    ]),
  ],
})
export class StoreModule {

}
