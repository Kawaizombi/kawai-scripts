import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PreferencesPopupModule } from './modules/preferences-popup/preferences-popup.module';
import { OverlayFixModule } from './modules/overlay-fix/overlay-fix.module';

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
    OverlayFixModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
