import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatButtonModule } from '@angular/material/button';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AppComponent } from './app.component';
import { PreferencesPopupModule } from '../preferences-popup/preferences-popup.module';
import { BlockerModule } from '../blocker/blocker.module';
import { StoreModule } from '../../store/store.module';
import { MatTooltipModule } from '@angular/material/tooltip';


@NgModule({
  declarations: [AppComponent],
  imports: [
    MatBottomSheetModule,
    BrowserAnimationsModule,
    BrowserModule,
    FontAwesomeModule,
    StoreModule,
    PreferencesPopupModule,
    MatButtonModule,
    BlockerModule,
    MatTooltipModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {

}
