import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxsModule } from '@ngxs/store';
import { AppComponent } from './app.component';
import { BlockListState } from '../../store/block-list/block-list.state';
import { MatButtonModule } from '@angular/material/button';
import { OptionsPopupModule } from '../options-popup/options-popup.module';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  declarations: [AppComponent],
  imports: [
    MatBottomSheetModule,
    BrowserAnimationsModule,
    BrowserModule,
    NgxsModule.forRoot([BlockListState]),
    OptionsPopupModule,
    MatButtonModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {

}
