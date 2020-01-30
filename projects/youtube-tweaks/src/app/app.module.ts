import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PreferencesPopupModule } from './modules/preferences-popup/preferences-popup.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HotkeyListenerModule } from './modules/hotkey-listener/hotkey-listener.module';
import { StoreModule } from './modules/store/store.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    MatButtonModule,
    MatDialogModule,
    BrowserAnimationsModule,
    PreferencesPopupModule,
    FontAwesomeModule,
    HotkeyListenerModule,
    StoreModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
