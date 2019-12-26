import { NgModule } from '@angular/core';
import { OptionsPopupComponent } from './options-popup.component';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { CommonModule } from '@angular/common';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { FilterByTerm } from './filter-by-term.pipe';
import { MatTabsModule } from '@angular/material/tabs';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  declarations: [OptionsPopupComponent, FilterByTerm],
  entryComponents: [OptionsPopupComponent],
  imports: [
    MatButtonModule,
    MatListModule,
    CommonModule,
    ScrollingModule,
    MatInputModule,
    FormsModule,
    MatTabsModule,
    FontAwesomeModule,
    MatSlideToggleModule,
    MatCardModule,
  ],
})
export class OptionsPopupModule {

}
