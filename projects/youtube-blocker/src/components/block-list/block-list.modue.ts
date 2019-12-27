import { NgModule } from '@angular/core';
import { BlockListComponent } from './block-list.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatListModule } from '@angular/material/list';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { FilterByTerm } from './filter-by-term.pipe';


@NgModule({
  declarations: [BlockListComponent, FilterByTerm],
  imports: [
    MatFormFieldModule,
    MatListModule,
    ScrollingModule,
    FontAwesomeModule,
    CommonModule,
    MatButtonModule,
    MatInputModule,
    FormsModule
  ],
  exports: [
    BlockListComponent
  ]
})
export class BlockListModule {

}
