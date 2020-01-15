import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PopupComponent } from './popup.component';
import { MatButtonModule } from '@angular/material/button';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatCardModule } from '@angular/material/card';


@NgModule({
  declarations: [PopupComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    FontAwesomeModule,
    MatCardModule,
  ],
  entryComponents: [PopupComponent],
})
export class PopupModule {
}
