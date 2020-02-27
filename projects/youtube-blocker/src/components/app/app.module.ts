import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatButtonModule, MatTooltipModule, MatDialogModule, MatSnackBarModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AppComponent } from './app.component';
import { PreferencesPopupModule } from '../preferences-popup/preferences-popup.module';
import { BlockerModule } from '../blocker/blocker.module';
import { StoreModule } from '../../store/store.module';


@NgModule({
  declarations: [AppComponent],
  imports: [
    MatDialogModule,
    BrowserAnimationsModule,
    BrowserModule,
    FontAwesomeModule,
    StoreModule,
    PreferencesPopupModule,
    MatButtonModule,
    BlockerModule,
    MatTooltipModule,
    MatSnackBarModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {

}
