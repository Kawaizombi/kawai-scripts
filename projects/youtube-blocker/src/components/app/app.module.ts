import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatButtonModule } from '@angular/material/button';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AppComponent } from './app.component';
import { OptionsPopupModule } from '../options-popup/options-popup.module';
import { BlockerModule } from '../blocker/blocker.module';
import { StoreModule } from '../../store/store.module';


@NgModule({
  declarations: [AppComponent],
  imports: [
    MatBottomSheetModule,
    BrowserAnimationsModule,
    BrowserModule,
    FontAwesomeModule,
    StoreModule,
    OptionsPopupModule,
    MatButtonModule,
    BlockerModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {

}
