import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PopupComponent } from './popup.component';
import { MatButtonModule } from '@angular/material/button';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';


@NgModule({
  declarations: [PopupComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    FontAwesomeModule,
  ],
  entryComponents: [PopupComponent],
})
export class PopupModule {
}
